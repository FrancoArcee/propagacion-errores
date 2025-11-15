// Definición de categorías de paneles
const PANEL_CATEGORIES = [
  {
    potencia: 250, // W
    ancho: 1.7, // m
    alto: 1.0, // m
    eficiencia: 0.147, // 14.7%
    precio: 150000, // $
    nombre: '250W'
  },
  {
    potencia: 340, // W
    ancho: 2.0, // m
    alto: 1.0, // m
    eficiencia: 0.17, // 17%
    precio: 210000, // $
    nombre: '340W'
  },
  {
    potencia: 450, // W
    ancho: 2.1, // m
    alto: 1.0, // m
    eficiencia: 0.22, // 22%
    precio: 250000, // $
    nombre: '450W'
  }
];

/**
 * Calcula la potencia basada en la irradiancia (PDF)
 * Potencia(G) = 34.4836*G + 100.3536
 */
function calcularPotencia(G) {
  return 34.4836 * G + 100.3536;
}

/**
 * Calcula la generación basada en la potencia (PDF)
 * Generación(P) = 2.9067*P + 16866.3897
 */
function calcularGeneracion(potenciaG) {
  return 2.9067 * potenciaG + 16866.3897;
}

/**
 * Eficiencia total = generación(P) / P
 */
function calcularEficienciaTotal(potenciaG) {
  const generacion = calcularGeneracion(potenciaG);
  return generacion / potenciaG;
}

/**
 * Área para paneles
 */
function calcularAreaRequerida(numeroPaneles, ancho, alto) {
  return numeroPaneles * ancho * alto;
}

/**
 * Función final corregida según el PDF
 */
export function calcularFinal(parametros) {
  const {
    irradiancia,            // G en W/m²
    hspAnual,               // horas
    superficieDisponible,   // m²
    costoEnergeticoMensual, // $
    consumoEnergeticoMensual // kWh
  } = parametros;

  // VALIDACIÓN CORREGIDA (antes usaba !valor → error si valor = 0)
  if (
    irradiancia == null ||
    hspAnual == null ||
    superficieDisponible == null ||
    costoEnergeticoMensual == null ||
    consumoEnergeticoMensual == null
  ) {
    console.error('Faltan parámetros requeridos');
    return null;
  }

  // Calcular Potencia(G) y eficiencia total
  const potenciaG = calcularPotencia(irradiancia);
  const eficienciaTotal = calcularEficienciaTotal(potenciaG);

  const categoriasAceptadas = [];

  // Evaluación de categorías
  for (const categoria of PANEL_CATEGORIES) {
    const areaPanel = categoria.ancho * categoria.alto;

    // POTENCIA POR PANEL según PDF:
    // potenciaPorPanel = Potencia(G) / (eficienciaCategoría * áreaPanel)
    const potenciaPorPanel = potenciaG / (categoria.eficiencia * areaPanel);

    // Energía generada anual por panel (kWh)
    const energiaGeneradaPorPanel =
      (potenciaPorPanel / 1000) * hspAnual * eficienciaTotal;

    // Consumo anual
    const consumoAnual = consumoEnergeticoMensual * 12;

    // Número de paneles
    const numeroPaneles = Math.ceil(consumoAnual / energiaGeneradaPorPanel);

    // Área requerida
    const areaRequerida = calcularAreaRequerida(
      numeroPaneles,
      categoria.ancho,
      categoria.alto
    );

    // Verificación de espacio disponible
    if (areaRequerida <= superficieDisponible) {
      const costoTotal = numeroPaneles * categoria.precio;

      categoriasAceptadas.push({
        categoria: categoria.nombre,
        potencia: categoria.potencia,
        precio: categoria.precio,
        eficiencia: categoria.eficiencia,
        tamaño: `${categoria.ancho}m x ${categoria.alto}m`,
        numeroPaneles,
        areaRequerida,
        costoTotal,
        potenciaPorPanel,
        energiaGeneradaPorPanel
      });
    }
  }

  // Si no hay categorías que entren en la superficie
  if (categoriasAceptadas.length === 0) {
    console.warn('No hay categorías aceptadas para la superficie disponible');
    return null;
  }

  // Elegir la categoría más económica
  const mejorCategoria = categoriasAceptadas.reduce((min, actual) =>
    actual.costoTotal < min.costoTotal ? actual : min
  );

  // Tiempo de recuperación (meses)
  const tiempoRecuperacionMeses =
    mejorCategoria.costoTotal / costoEnergeticoMensual;

  // Energía anual
  const energiaProducidaAnual =
    mejorCategoria.numeroPaneles * mejorCategoria.energiaGeneradaPorPanel;

  // Costo por kWh (simplificado, igual al PDF)
  const costoPorKwh =
    costoEnergeticoMensual / consumoEnergeticoMensual;

  const ahorroAnual = energiaProducidaAnual * costoPorKwh;

  return {
    categoria: {
      nombre: mejorCategoria.categoria,
      potencia: mejorCategoria.potencia,
      precio: mejorCategoria.precio,
      eficiencia: mejorCategoria.eficiencia,
      tamaño: mejorCategoria.tamaño
    },
    numeroPaneles: mejorCategoria.numeroPaneles,
    costoTotal: mejorCategoria.costoTotal,
    tiempoRecuperacionMeses,
    energiaProducidaAnual,
    ahorroAnual,
    areaRequerida: mejorCategoria.areaRequerida
  };
}
