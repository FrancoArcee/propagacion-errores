import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Plot from "react-plotly.js";
import { Button, ButtonGroup } from "react-bootstrap";
import { useMemo } from "react";

const Resolucion = () => {
  const [data, setData] = useState([]);
  const [fitType, setFitType] = useState("exponencial");
  const [useClusters, setUseClusters] = useState(false);
  const [results, setResults] = useState(null);
  const [bestFit, setBestFit] = useState(null);


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (data.length > 0) calculateRegression();
  }, [data, fitType, useClusters]);

  const loadData = async () => {
    try {
      const response = await fetch("/data.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const parsed = jsonData
        .map((row) => ({
          irradiance: parseFloat(
            String(row.irradiance_Wm2 || row["irradiance_Wm2"]).replace(",", ".")
          ),
          power: parseFloat(
            String(row.pv_power_kW || row["pv_power_kW"]).replace(",", ".")
          ),
          skyState: row.sky_state || row["sky_state"],
        }))
        .filter((d) => !isNaN(d.irradiance) && !isNaN(d.power));

      setData(parsed);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  
  const calculateRegression = () => {
    if (!useClusters) {
      const result = performRegression(data, fitType);
      setResults({ overall: result });
    } else {
      const clearData = data.filter((d) => d.skyState === "clear");
      const cloudyData = data.filter((d) => d.skyState === "cloudy");

      const clearResult = performRegression(clearData, fitType);
      const cloudyResult = performRegression(cloudyData, fitType);

      setResults({ clear: clearResult, cloudy: cloudyResult });
    }
  };

  const findBestRegression = () => {
    if (!results || !results.overall) return;

    const r2Map = {
      lineal: performRegression(data, "lineal")?.r2 ?? 0,
      exponencial: performRegression(data, "exponencial")?.r2 ?? 0,
      potencial: performRegression(data, "potencial")?.r2 ?? 0,
      polinomico: performRegression(data, "polinomico")?.r2 ?? 0,
    };

    console.log("R² values:", r2Map);
  
    const bestType = Object.keys(r2Map).reduce((a, b) =>
      r2Map[a] >= r2Map[b] ? a : b
    );

    const best = performRegression(data, bestType);
    setBestFit({ ...best, type: bestType });
  };


  const performRegression = (dataset, type) => {
    const n = dataset.length;
    if (n === 0) return null;

    const x = dataset.map((d) => d.irradiance);
    const y = dataset.map((d) => d.power);

    let coeffs = [];
    let predictFunc = null;
    let numParams = 0;

    if (type === "lineal") {
      const result = linearRegression(x, y);
      coeffs = [result.a, result.b];
      predictFunc = (xi) => result.a * xi + result.b;
      numParams = 2;
    } else if (type === "exponencial") {
      const result = exponentialRegression(x, y);
      coeffs = [result.a, result.b];
      predictFunc = (xi) => result.a * Math.exp(result.b * xi);
      numParams = 2;
    } else if (type === "potencial") {
      const result = powerRegression(x, y);
      coeffs = [result.a, result.b];
      predictFunc = (xi) => result.a * Math.pow(xi, result.b);
      numParams = 2;
    } else if (type === "polinomico") {
      const result = polynomialRegression(x, y, 2);
      coeffs = result;
      predictFunc = (xi) => result[0] + result[1] * xi + result[2] * xi * xi;
      numParams = 3;
    }

    const predictions = x.map(predictFunc);
    const rSquared = calculateR2(y, predictions);
    const adjustedR2 = isNaN(rSquared)
      ? 0
      : 1 - ((1 - rSquared) * (n - 1)) / (n - numParams - 1);

    const minX = Math.min(...x);
    const maxX = Math.max(...x);
    const curvePoints = [];
    for (let i = 0; i <= 100; i++) {
      const xi = minX + ((maxX - minX) * i) / 100;
      curvePoints.push({ x: xi, y: predictFunc(xi) });
    }

    return {
      coefficients: coeffs,
      r2: rSquared,
      adjustedR2: adjustedR2,
      curvePoints: curvePoints,
      scatterData: dataset.map((d) => ({
        x: d.irradiance,
        y: d.power,
        skyState: d.skyState,
      })),
    };
  };

  const linearRegression = (x, y) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

    const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - a * sumX) / n;
    return { a, b };
  };

  const exponentialRegression = (x, y) => {
    // Solo usar puntos positivos
    const filtered = x.map((xi, i) => ({ xi, yi: y[i] })).filter(p => p.yi > 0);
    if (filtered.length < 3) return { a: 1, b: 0 }; // Evita crash

    const lnY = filtered.map((p) => Math.log(p.yi));
    const xVals = filtered.map((p) => p.xi);
    const result = linearRegression(xVals, lnY);

    return { a: Math.exp(result.b), b: result.a };
  };


  const powerRegression = (x, y) => {
    const lnX = x.map((xi) => Math.log(Math.max(xi, 0.001)));
    const lnY = y.map((yi) => Math.log(Math.max(yi, 0.001)));
    const result = linearRegression(lnX, lnY);
    return { a: Math.exp(result.b), b: result.a };
  };

  const polynomialRegression = (x, y, degree) => {
    const n = x.length;
    const matrix = [];
    const vector = [];

    for (let i = 0; i <= degree; i++) {
      const row = [];
      for (let j = 0; j <= degree; j++) {
        let sum = 0;
        for (let k = 0; k < n; k++) sum += Math.pow(x[k], i + j);
        row.push(sum);
      }
      matrix.push(row);
      let sum = 0;
      for (let k = 0; k < n; k++) sum += y[k] * Math.pow(x[k], i);
      vector.push(sum);
    }

    return gaussianElimination(matrix, vector);
  };

  const gaussianElimination = (A, b) => {
    const n = b.length;
    const Ab = A.map((row, i) => [...row, b[i]]);
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(Ab[k][i]) > Math.abs(Ab[maxRow][i])) maxRow = k;
      }
      [Ab[i], Ab[maxRow]] = [Ab[maxRow], Ab[i]];
      for (let k = i + 1; k < n; k++) {
        const factor = Ab[k][i] / Ab[i][i];
        for (let j = i; j <= n; j++) Ab[k][j] -= factor * Ab[i][j];
      }
    }
    const x = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      x[i] = Ab[i][n];
      for (let j = i + 1; j < n; j++) x[i] -= Ab[i][j] * x[j];
      x[i] /= Ab[i][i];
    }
    return x;
  };

  const calculateR2 = (actual, predicted) => {
    if (actual.length === 0) return 0;
    const mean = actual.reduce((a, b) => a + b, 0) / actual.length;
    const ssTotal = actual.reduce((sum, yi) => sum + Math.pow(yi - mean, 2), 0);
    const ssResidual = actual.reduce(
      (sum, yi, i) => sum + Math.pow(yi - predicted[i], 2),
      0
    );
    return ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;
  };

  const formatR2 = (r2) => r2.toFixed(4);

  const getR2Color = (r2) => {
    // Colorea de rojo (malo) a verde (bueno) según el valor de R²
    const red = Math.round(255 * (1 - r2 + 0.5));
    const green = Math.round(255 * r2);
    return { backgroundColor: `rgb(${red},${green},0)` };
  };

  const getPlotData = () => {
    if (!results) return [];

    if (useClusters) {
      const traces = [];

      if (results.clear) {
        traces.push({
          x: results.clear.scatterData.map((p) => p.x),
          y: results.clear.scatterData.map((p) => p.y),
          mode: "markers",
          name: "Despejado",
          marker: { color: "orange", size: 4, opacity: 0.6 },
          type: "scattergl",
        });
        traces.push({
          x: results.clear.curvePoints.map((p) => p.x),
          y: results.clear.curvePoints.map((p) => p.y),
          mode: "lines",
          name: "Ajuste Despejado",
          line: { color: "red", width: 2 },
        });
      }

      if (results.cloudy) {
        traces.push({
          x: results.cloudy.scatterData.map((p) => p.x),
          y: results.cloudy.scatterData.map((p) => p.y),
          mode: "markers",
          name: "Nublado",
          marker: { color: "skyblue", size: 4, opacity: 0.6 },
          type: "scattergl",
        });
        traces.push({
          x: results.cloudy.curvePoints.map((p) => p.x),
          y: results.cloudy.curvePoints.map((p) => p.y),
          mode: "lines",
          name: "Ajuste Nublado",
          line: { color: "blue", width: 2 },
        });
      }

      return traces;
    } else {
      if (!results?.overall?.scatterData) return [];
      return [
        {
          x: results.overall.scatterData.map((p) => p.x),
          y: results.overall.scatterData.map((p) => p.y),
          mode: "markers",
          name: "Datos",
          marker: { color: "#FFA500", size: 4, opacity: 0.6 },
          type: "scattergl",
        },
        {
          x: results.overall.curvePoints.map((p) => p.x),
          y: results.overall.curvePoints.map((p) => p.y),
          mode: "lines",
          name: "Ajuste",
          line: { color: "#FF3333", width: 2 },
        },
      ];
    }
  };
  const plotData = useMemo(() => getPlotData(), [results, useClusters]);
  
  return (
    <div className="min-h-screen bg-dark text-white p-4">
      <h1 className="text-center mb-4">🔆 Análisis de Regresión Solar</h1>

      <div className="text-center mb-3">
        <ButtonGroup>
          {["lineal", "exponencial", "polinomico", "potencial"].map((type) => (
            <Button
              key={type}
              variant={fitType === type ? "primary" : "secondary"}
              onClick={() => setFitType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="text-center mb-3">
        <Button variant="success" onClick={findBestRegression}>
          Calcular mejor regresión
        </Button>
      </div>

      {results?.overall && !useClusters && (
        <div className="text-center mt-3">
          <h5>
            R² ajustado:{" "}
            <span className="badge" style={getR2Color(results.overall.adjustedR2)}>
              {formatR2(results.overall.adjustedR2)}
            </span>
          </h5>
        </div>
      )}
      {results?.clear && results?.cloudy && useClusters && (
        <div className="text-center mt-3">
          <h5>
            R² ajustado Despejado:{" "}
            <span className="badge" style={getR2Color(results.clear.adjustedR2)}>
              {formatR2(results.clear.adjustedR2)}
            </span>{" "}
            | R² ajustado Nublado:{" "}
            <span className="badge" style={getR2Color(results.cloudy.adjustedR2)}>
              {formatR2(results.cloudy.adjustedR2)}
            </span>
          </h5>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center mb-4 form-switch">
        <input
          className="form-check-input d-inline me-2"
          type="checkbox"
          id="clusters"
          checked={useClusters}
          onChange={(e) => setUseClusters(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="clusters">
          {useClusters ? "Clusters activados" : "Clusters desactivados"}
        </label>
      </div>

      {/* === GRÁFICO PLOTLY === */}
      <Plot
        data={plotData}
        layout={{
          paper_bgcolor: "#222",
          plot_bgcolor: "#222",
          font: { color: "#fff" },
          xaxis: { title: { text: "Irradiancia (W/m²)", font: { size: 18 } } },
          yaxis: { title: {text: "Potencia (kW)", font: { size: 18 } }},
          legend: { orientation: "h", y: -0.2 },
          margin: { t: 40, l: 60, r: 30, b: 60 },
          height: 500,
        }}
        config={{ responsive: true, displaylogo: false }}
        style={{ width: "100%", height: "500px" }}
      />
      {bestFit && (
  <div className="mt-4 text-center">
    <h4>🏆 Mejor regresión: {bestFit.type.toUpperCase()}</h4>
    <p>
      <strong>R² ajustado:</strong> {formatR2(bestFit.adjustedR2)}
    </p>
    <p>
      <strong>Función:</strong>{" "}
      {bestFit.type === "lineal"
        ? `y = ${bestFit.coefficients[0].toFixed(4)}·x + ${bestFit.coefficients[1].toFixed(4)}`
        : bestFit.type === "exponencial"
        ? `y = ${bestFit.coefficients[0].toFixed(4)}·e^(${bestFit.coefficients[1].toFixed(4)}·x)`
        : bestFit.type === "potencial"
        ? `y = ${bestFit.coefficients[0].toFixed(4)}·x^(${bestFit.coefficients[1].toFixed(4)})`
        : `y = ${bestFit.coefficients[0].toFixed(4)} + ${bestFit.coefficients[1].toFixed(4)}·x + ${bestFit.coefficients[2].toFixed(6)}·x²`}
    </p>
    <p>
      <strong>Coeficientes:</strong> [
          {
              [
                  bestFit.coefficients[0].toFixed(4), 
                  bestFit.coefficients[1].toFixed(4), 
                  bestFit.coefficients[2].toFixed(6)
              ].join(", ")
          }
      ]
    </p>
  </div>
)}
    </div>
  );
};

export default Resolucion;
