// Definición de categorías de paneles
export const PANEL_CATEGORIES = [
  {
    potencia: 250, // W
    ancho: 1.7, // m
    alto: 1.0, // m
    eficiencia: 0.147, // 14.7%
    precio: 150000, // $
    nombre: '250W',
    imagen: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQXdfotcyOcrGhjt41IT5BrsgKYZLfD6MzrGL-EiGbVjX0lANG6THS43FNuafUTUDIRCUXTefhzjxTQj_Bk8RhM4nS3FcJz5rWDYvPtbTswbJpl33-mPrAp-JA' // URL de la imagen del panel
  },
  {
    potencia: 340, // W
    ancho: 2.0, // m
    alto: 1.0, // m
    eficiencia: 0.17, // 17%
    precio: 210000, // $
    nombre: '340W',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpjrL4V_h929GLnwNvdsUP2RWgFgNOGnl9uA&s' // URL de la imagen del panel
  },
  {
    potencia: 450, // W
    ancho: 2.1, // m
    alto: 1.0, // m
    eficiencia: 0.22, // 22%
    precio: 250000, // $
    nombre: '450W',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEkkE60Y1ElNR32vaWSPmcIi0RawVwZ4CH5w&s' // URL de la imagen del panel
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

  // Calcular Potencia(G) y generación
  const potenciaG = calcularPotencia(irradiancia);
  const generacionG = calcularGeneracion(potenciaG);
  
  // Calcular eficiencia total según la fórmula: η = Energía Útil Generada / Energía Total Disponible
  // Para convertir potencia a energía, necesitamos un tiempo de referencia
  // Usamos HSP anual como referencia para calcular la energía
  // Energía Total Disponible = Potencia(G) * HSP (en kWh, considerando conversión)
  // Energía Útil Generada = Generación(G) * HSP (en kWh, considerando conversión)
  
  // Convertir potencia a energía anual (asumiendo que las fórmulas dan valores en W)
  // Energía = Potencia (W) * tiempo (h) / 1000 para convertir a kWh
  const energiaTotalDisponible = (potenciaG / 1000) * hspAnual; // kWh
  const energiaUtilGenerada = (generacionG / 1000) * hspAnual; // kWh
  
  // Eficiencia total = Energía Útil Generada / Energía Total Disponible
  let eficienciaTotal = energiaUtilGenerada / energiaTotalDisponible;
  
  // La eficiencia no puede ser mayor que 1 (100%)
  if (eficienciaTotal > 1.0) {
    console.warn('Eficiencia total calculada > 1.0, limitando a 1.0. Valor calculado:', eficienciaTotal);
    eficienciaTotal = 1.0;
  }
  
  // También no puede ser negativa
  if (eficienciaTotal < 0) {
    console.warn('Eficiencia total calculada < 0, limitando a 0.01. Valor calculado:', eficienciaTotal);
    eficienciaTotal = 0.01;
  }

  const categoriasAceptadas = [];

  // Log de parámetros de entrada para depuración
  console.log('=== PARÁMETROS DE ENTRADA ===');
  console.log('Irradiancia (G):', irradiancia, 'W/m²');
  console.log('HSP anual:', hspAnual, 'horas');
  console.log('Superficie disponible:', superficieDisponible, 'm²');
  console.log('Costo energético mensual:', costoEnergeticoMensual, '$');
  console.log('Consumo energético mensual:', consumoEnergeticoMensual, 'kWh');
  console.log('Potencia(G):', potenciaG.toFixed(2), 'W');
  console.log('Generación(G):', generacionG.toFixed(2), 'W');
  console.log('Energía Total Disponible:', energiaTotalDisponible.toFixed(2), 'kWh/año');
  console.log('Energía Útil Generada:', energiaUtilGenerada.toFixed(2), 'kWh/año');
  console.log('Eficiencia total (η):', eficienciaTotal.toFixed(4), '=', (eficienciaTotal * 100).toFixed(2) + '%');

  // Evaluación de categorías
  for (const categoria of PANEL_CATEGORIES) {
    const areaPanel = categoria.ancho * categoria.alto;

    // POTENCIA POR PANEL según PDF:
    // La fórmula del PDF dice: "potencia por panel = Potencia(G)/(eficiencia de la categoría* área del panel)"
    // Pero esta fórmula da valores absurdos (90kW para un panel de 250W)
    // 
    // REINTERPRETACIÓN: La fórmula parece estar mal interpretada. 
    // Lo que realmente necesitamos es:
    // - Usar la potencia NOMINAL del panel (250W, 340W, 450W) según su categoría
    // - La energía generada = Potencia nominal * HSP * eficiencia_total
    
    // Calculamos la potencia "teórica" según la fórmula del PDF (solo para referencia)
    const potenciaPorPanelFormula = potenciaG / (categoria.eficiencia * areaPanel);
    
    // PERO usamos la potencia NOMINAL del panel (la real del panel)
    const potenciaPorPanel = categoria.potencia; // En W (250, 340, o 450)

    // Energía generada anual por panel (kWh)
    // Fórmula: Energía = Potencia (kW) * HSP * eficiencia_total
    // Donde eficiencia_total ya incluye las pérdidas del sistema
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

    console.log(`\n=== CATEGORÍA ${categoria.nombre} ===`);
    console.log('Potencia nominal del panel:', categoria.potencia, 'W');
    console.log('Potencia según fórmula PDF (referencia):', potenciaPorPanelFormula.toFixed(2), 'W');
    console.log('Potencia usada en cálculo:', potenciaPorPanel, 'W');
    console.log('Energía generada por panel:', energiaGeneradaPorPanel.toFixed(2), 'kWh/año');
    console.log('Consumo anual:', consumoAnual, 'kWh/año');
    console.log('Número de paneles necesarios:', numeroPaneles);
    console.log('Área requerida:', areaRequerida.toFixed(2), 'm²');
    console.log('Superficie disponible:', superficieDisponible, 'm²');
    console.log('¿Cabe?', areaRequerida <= superficieDisponible);

    // Verificación de espacio disponible
    if (areaRequerida <= superficieDisponible) {
      const costoTotal = numeroPaneles * categoria.precio;

      console.log('Costo total:', costoTotal, '$');

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

  console.log('\n=== CATEGORÍA SELECCIONADA ===');
  console.log('Categoría:', mejorCategoria.categoria);
  console.log('Número de paneles:', mejorCategoria.numeroPaneles);
  console.log('Costo total:', mejorCategoria.costoTotal, '$');

  // Buscar la categoría completa en PANEL_CATEGORIES para obtener la imagen
  const categoriaCompleta = PANEL_CATEGORIES.find(
    cat => cat.nombre === mejorCategoria.categoria
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

  console.log('Energía producida anual:', energiaProducidaAnual.toFixed(2), 'kWh');
  console.log('Costo por kWh:', costoPorKwh.toFixed(2), '$/kWh');
  console.log('Ahorro anual:', ahorroAnual.toFixed(2), '$');
  console.log('Tiempo de recuperación:', tiempoRecuperacionMeses.toFixed(2), 'meses');

  return {
    categoria: {
      nombre: mejorCategoria.categoria,
      potencia: mejorCategoria.potencia,
      precio: mejorCategoria.precio,
      eficiencia: mejorCategoria.eficiencia,
      tamaño: mejorCategoria.tamaño,
      imagen: categoriaCompleta?.imagen || ''
    },
    numeroPaneles: mejorCategoria.numeroPaneles,
    costoTotal: mejorCategoria.costoTotal,
    tiempoRecuperacionMeses,
    energiaProducidaAnual,
    ahorroAnual,
    areaRequerida: mejorCategoria.areaRequerida
  };
}
