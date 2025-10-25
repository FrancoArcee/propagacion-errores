import React, { useState } from 'react';
import { Calculator, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  InputGroup,
  FormControl,
  Stack,
  Badge,
  // los exporto al final si hacía falta
} from 'react-bootstrap';

// Small helpers for consistent formatting with Bootstrap UI
const formatCurrency = (value) =>
  Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatNumber = (value, digits = 4) => Number(value || 0).toFixed(digits);

export {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  InputGroup,
  FormControl,
  Stack,
  Badge,
  formatCurrency,
  formatNumber,
};

export default function Aplicacion() {
  const [capitalInicial, setCapitalInicial] = useState(10000);
  const [tasaAnual, setTasaAnual] = useState(5);
  const [tiempo, setTiempo] = useState(10);
  const [pasos, setPasos] = useState(5);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);

  // Cálculos
  const r = tasaAnual / 100;
  const h = pasos ? tiempo / pasos : 0; // Tamaño del paso

  // Método de Taylor de segundo orden
  const resolverTaylor = () => {
    const resultados = [];
    let t = 0;
    let C = capitalInicial;

    resultados.push({ t: t.toFixed(2), C: C.toFixed(2), paso: 0 });

    for (let i = 0; i < pasos; i++) {
      // f(t,C) = r*C
      const f = r * C;

      // f'(t,C) = r * f(t,C) = r * r * C = r²*C
      const fPrima = r * f;

      // Taylor de segundo orden: C_{n+1} = C_n + h*f + (h²/2)*f'
      const CNuevo = C + h * f + (h * h / 2) * fPrima;

      t += h;
      C = CNuevo;

      resultados.push({
        t: t.toFixed(2),
        C: C.toFixed(2),
        paso: i + 1,
        f: f.toFixed(4),
        fPrima: fPrima.toFixed(4)
      });
    }

    return resultados;
  };

  const resultadosTaylor = resolverTaylor();
  const capitalFinalTaylor = parseFloat(resultadosTaylor[resultadosTaylor.length - 1].C);
  const capitalFinalExacto = capitalInicial * Math.exp(r * tiempo);
  const error = Math.abs(capitalFinalExacto - capitalFinalTaylor);
  const errorRelativo = (error / capitalFinalExacto) * 100;
  const ganancia = capitalFinalTaylor - capitalInicial;

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={10}>
          {/* Header */}
          <Card className="shadow-sm border-0 bg-light mb-4">
            <Card.Body>
              <div className="d-flex align-items-center gap-3 mb-2">
                <TrendingUp className="text-primary" />
                <Card.Title className="mb-0">Interés Compuesto Continuo</Card.Title>
              </div>
              <Card.Text className="text-muted">
                Resolución mediante el Método de Taylor de Segundo Orden
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Explicación teórica */}
          <Card className="shadow-sm border-0 bg-light mb-4">
            <Card.Body>
              <div className="d-flex align-items-center gap-2 mb-3">
                <BookOpen className="text-primary" />
                <h5 className="mb-0">¿Qué es el interés compuesto continuo?</h5>
              </div>

              <Card.Text>
                El <strong>interés compuesto continuo</strong> es un modelo matemático donde el capital
                crece de forma instantánea en cada momento del tiempo. A diferencia del interés compuesto
                tradicional que se calcula en períodos discretos (mensual, trimestral, anual), aquí la
                capitalización ocurre continuamente.
              </Card.Text>

              <Card className="mb-3">
                <Card.Body>
                  <h6 className="mb-2">Ecuación Diferencial Ordinaria (EDO):</h6>
                  <div className="text-center font-monospace my-2">dC/dt = r·C</div>
                  <Card.Text className="small mb-0">
                    Donde <strong>C(t)</strong> es el capital en el tiempo t, y <strong>r</strong> es
                    la tasa de interés anual expresada en forma decimal.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-0">
                <Card.Body>
                  <h6 className="mb-2">Método de Taylor de Segundo Orden:</h6>
                  <Card.Text className="small mb-2">
                    Este método numérico aproxima la solución usando la expansión de Taylor hasta el segundo término:
                  </Card.Text>
                  <div className="text-center font-monospace my-2">
                    C<sub>n+1</sub> = C<sub>n</sub> + h·f(t<sub>n</sub>, C<sub>n</sub>) + (h²/2)·f'(t<sub>n</sub>, C<sub>n</sub>)
                  </div>
                  <Card.Text className="small mb-0">
                    Donde <strong>h</strong> es el tamaño del paso temporal, <strong>C' = f(t,C) = r·C</strong> es
                    nuestra función derivada, y <strong>C''= f'(t,C)</strong> es la derivada de f con respecto a t.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>

          {/* Calculadora */}
          <Card className="shadow-sm border-0 bg-light mb-4">
            <Card.Body>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Calculator className="text-primary" />
                <h5 className="mb-0">Caso Práctico</h5>
              </div>

              <Form>
                <Row className="gy-3">
                  <Col md={3}>
                    <Form.Group controlId="capitalInicial">
                      <Form.Label>Capital Inicial ($)</Form.Label>
                      <Form.Control
                        type="number"
                        value={capitalInicial}
                        onChange={(e) => setCapitalInicial(Number(e.target.value))}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId="tasaAnual">
                      <Form.Label>Tasa Anual (%)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        value={tasaAnual}
                        onChange={(e) => setTasaAnual(Number(e.target.value))}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId="tiempo">
                      <Form.Label>Tiempo (años)</Form.Label>
                      <Form.Control
                        type="number"
                        value={tiempo}
                        onChange={(e) => setTiempo(Number(e.target.value))}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId="pasos">
                      <Form.Label>Número de Pasos</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="20"
                        value={pasos}
                        onChange={(e) => { setPasos(Number(e.target.value)) }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-3">
                  <Button
                    onClick={() => setMostrarSolucion(!mostrarSolucion)}
                    variant="primary"
                    className="w-100"
                  >
                    {mostrarSolucion ? 'Ocultar Solución' : 'Resolver Problema'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Solución paso a paso */}
          {mostrarSolucion && pasos && (
            <>
              <Card className="shadow-sm border-0 bg-light mb-4">
                <Card.Body>
                  <h5>Resolución Paso a Paso - Método de Taylor de Segundo Orden</h5>

                  <Stack gap={3} className="mt-3">
                    {/* Paso 1 */}
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <CheckCircle className="text-success" />
                          <h6 className="mb-0">Paso 1: Plantear el PVI</h6>
                        </div>
                        <Card.Text className="mb-1">Ecuación diferencial:</Card.Text>
                        <div className="font-monospace text-center mb-2">dC/dt = {r.toFixed(4)}·C</div>
                        <Card.Text className="mb-1">Condición inicial:</Card.Text>
                        <div className="font-monospace text-center mb-2">C(0) = ${capitalInicial.toLocaleString()}</div>
                        <Card.Text className="mb-1">Intervalo de integración:</Card.Text>
                        <div className="font-monospace text-center">t ∈ [0, {tiempo}]</div>
                      </Card.Body>
                    </Card>

                    {/* Paso 2 */}
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <CheckCircle className="text-purple" />
                          <h6 className="mb-0">Paso 2: Establecer h</h6>
                        </div>
                        <Card.Text>Número de pasos: <span className="font-monospace fw-bold">n = {pasos}</span></Card.Text>
                        <Card.Text>Tamaño del paso: <span className="font-monospace fw-bold">h = {tiempo}/{pasos} = {h.toFixed(4)} años</span></Card.Text>
                        <div className="mt-2 font-monospace text-center bg-light p-2 rounded">
                          C<sub>n+1</sub> = C<sub>n</sub> + h·f(t<sub>n</sub>, C<sub>n</sub>) + (h²/2)·f'(t<sub>n</sub>, C<sub>n</sub>)
                        </div>
                      </Card.Body>
                    </Card>


                    {/* Paso 3 */}
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <CheckCircle className="text-primary" />
                          <h6 className="mb-0">Paso 3: Definir la función f y su derivada</h6>
                        </div>
                        <Card.Text>Para nuestra EDO: <span className="font-monospace">dC/dt = r·C</span></Card.Text>
                        <div className="font-monospace mt-2">C' = f(t, C) = r·C = {r.toFixed(4)}·C</div>
                        <Card.Text className="mt-3">Para calcular C'', derivamos f con respecto a t:</Card.Text>
                        <div className="font-monospace">C'' = ∂f/∂t + ∂f/∂C · dC/dt</div>
                        <div className="font-monospace">C'' = 0 + r · (r·C) = r²·C</div>
                        <div className="font-monospace">C'' = {(r * r).toFixed(6)}·C</div>
                      </Card.Body>
                    </Card>

                    {/* Paso 4 */}
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <CheckCircle className="text-danger" />
                          <h6 className="mb-0">Paso 4: Ejemplo de cálculo (primer paso)</h6>
                        </div>
                        <Card.Text className="fw-bold mb-2">Valores iniciales:</Card.Text>
                        <div className="font-monospace">C₀ = {capitalInicial}</div>
                        <div className="font-monospace">t₀ = 0</div>

                        <Card.Text className="fw-bold mt-3 mb-2">Cálculo de f y f':</Card.Text>
                        <div className="font-monospace">f(t₀, C₀) = {r.toFixed(4)} × {capitalInicial} = {(r * capitalInicial).toFixed(4)}</div>
                        <div className="font-monospace">f'(t₀, C₀) = {(r * r).toFixed(6)} × {capitalInicial} = {(r * r * capitalInicial).toFixed(4)}</div>

                        <Card.Text className="fw-bold mt-3 mb-2">Aplicando la fórmula de Taylor:</Card.Text>
                        <div className="font-monospace">C₁ = C₀ + h·f + (h²/2)·f'</div>
                        <div className="font-monospace">
                          C₁ = {capitalInicial} + {h.toFixed(4)}×{(r * capitalInicial).toFixed(4)} + ({h.toFixed(4)}²/2)×{(r * r * capitalInicial).toFixed(4)}
                        </div>
                        <div className="font-monospace fw-bold fs-5 mt-2">C₁ = {resultadosTaylor[1].C}</div>
                      </Card.Body>
                    </Card>

                    {/* Paso 5 */}

                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <CheckCircle className="text-warning" />
                          <h6 className="mb-0">Paso 5: Iteraciones numéricas</h6>
                        </div>

                        <Table responsive size="sm" hover>
                          <thead className="table-light">
                            <tr>
                              <th>Paso</th>
                              <th className="text-end">t (años)</th>
                              <th className="text-end">C(t) ($)</th>
                              <th className="text-end"> C' = f(t,C)</th>
                              <th className="text-end">C'' = f'(t,C)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultadosTaylor.map((res, idx) => (
                              <tr key={idx}>
                                <td className="font-monospace">{res.paso}</td>
                                <td className="text-end font-monospace">{res.t}</td>
                                <td className="text-end font-monospace fw-bold text-success">
                                  {parseFloat(res.C).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="text-end font-monospace text-primary">{res.f || '-'}</td>
                                <td className="text-end font-monospace text-secondary">{res.fPrima || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>

                    {/* Paso 6 */}
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <CheckCircle className="text-indigo" />
                          <h6 className="mb-0">Paso 6: Comparación con solución exacta</h6>
                        </div>

                        <Card.Text>La solución analítica de la EDO es:</Card.Text>
                        <div className="font-monospace text-center">C(t) = C₀ · e^(rt)</div>

                        <Card.Text className="mt-3">Evaluando en t = {tiempo}:</Card.Text>
                        <div className="font-monospace">C({tiempo}) = {capitalInicial} × e^({r.toFixed(4)} × {tiempo})</div>
                        <div className="font-monospace">C({tiempo}) = {capitalInicial} × {Math.exp(r * tiempo).toFixed(6)}</div>
                        <div className="font-monospace fw-bold text-primary fs-5">C_exacta({tiempo}) = ${capitalFinalExacto.toFixed(2)}</div>

                        <div className="mt-3 p-2 bg-white border rounded">
                          <div className="fw-bold mb-1">Análisis del error:</div>
                          <div className="font-monospace">C_Taylor = ${capitalFinalTaylor.toFixed(2)}</div>
                          <div className="font-monospace">C_exacta = ${capitalFinalExacto.toFixed(2)}</div>
                          <div className="font-monospace">Error absoluto = ${error.toFixed(2)}</div>
                          <div className="font-monospace text-danger fw-bold">Error relativo = {errorRelativo.toFixed(4)}%</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Stack>
                </Card.Body>
              </Card>

              {/* Interpretación */}
              <Card className="shadow-sm border-0 bg-light mb-4 border-success">
                <Card.Body>
                  <h5>Interpretación del Resultado</h5>

                  <Row className="mt-3">
                    <Col md={4}>
                      <Card className="mb-2">
                        <Card.Body className="text-center">
                          <div className="text-muted small">Capital Inicial</div>
                          <div className="fs-4 fw-bold text-primary">${capitalInicial.toLocaleString()}</div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card className="mb-2">
                        <Card.Body className="text-center">
                          <div className="text-muted small">Capital Final (Taylor)</div>
                          <div className="fs-4 fw-bold text-success">${capitalFinalTaylor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card className="mb-2">
                        <Card.Body className="text-center">
                          <div className="text-muted small">Ganancia</div>
                          <div className="fs-4 fw-bold text-success-dark">${ganancia.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Card className="mt-3">
                    <Card.Body>
                      <h6>Análisis Financiero:</h6>
                      <ul>
                        <li>
                          Con una inversión inicial de <strong>${capitalInicial.toLocaleString()}</strong> y
                          una tasa de interés continuo del <strong>{tasaAnual}%</strong> anual, después
                          de <strong>{tiempo} años</strong> el capital alcanza aproximadamente
                          <strong> ${capitalFinalTaylor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>.
                        </li>
                        <li className="mt-2">
                          Las ganancias totales son de <strong>${ganancia.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>,
                          lo que representa un rendimiento del <strong>{((ganancia / capitalInicial) * 100).toFixed(2)}%</strong>.
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
