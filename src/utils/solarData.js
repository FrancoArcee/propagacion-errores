/**
 * Obtiene datos solares (irradiancia y HSP) basados en coordenadas geográficas
 * Usa la API de PVGIS (Photovoltaic Geographical Information System)
 * @param {number} lat - Latitud
 * @param {number} lng - Longitud
 * @returns {Promise<{irradiancia: number, hspAnual: number}>}
 */
export async function obtenerDatosSolares(lat, lng) {
  try {
    // PVGIS API endpoint para obtener datos mensuales de irradiancia global horizontal
    // Usamos el endpoint monthly que devuelve datos mensuales promedio
    const url = `https://re.jrc.ec.europa.eu/api/v5_2/monthly?lat=${lat}&lon=${lng}&raddatabase=PVGIS-SARAH2&startyear=2020&endyear=2020&horirrad=1`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Error al obtener datos de PVGIS');
    }
    
    const data = await response.json();
    
    // PVGIS devuelve datos mensuales en la estructura: data.outputs.monthly
    if (data.outputs && data.outputs.monthly && Array.isArray(data.outputs.monthly)) {
      const monthlyData = data.outputs.monthly;
      
      // Calcular promedio anual de irradiancia global horizontal (GHI)
      // PVGIS devuelve H(i)_m en kWh/m²/día (irradiancia global horizontal mensual promedio diaria)
      let totalIrradianceDaily = 0; // kWh/m²/día promedio
      let totalHSP = 0; // Horas de sol pico anuales
      
      monthlyData.forEach(month => {
        // Irradiancia global horizontal mensual promedio diaria en kWh/m²/día
        const ghiDaily = month['H(i)_m'] || 0;
        totalIrradianceDaily += ghiDaily;
        
        // HSP diario es aproximadamente igual a la irradiancia en kWh/m²/día
        // (ya que 1 kWh/m² = 1 hora de sol pico a 1000 W/m²)
        const hspDaily = ghiDaily;
        // Multiplicar por días del mes
        const daysInMonth = month.month === 2 ? 28 : (month.month === 4 || month.month === 6 || month.month === 9 || month.month === 11 ? 30 : 31);
        totalHSP += hspDaily * daysInMonth;
      });
      
      // Promedio anual de irradiancia diaria en kWh/m²/día
      const avgIrradianceDaily = totalIrradianceDaily / 12;
      
      // Convertir a W/m² promedio para usar en la fórmula
      // La irradiancia promedio durante las horas de sol activo se calcula así:
      // Si tenemos X kWh/m²/día y el sol está activo ~12 horas/día en promedio,
      // entonces la irradiancia promedio = (X kWh/m²/día * 1000 W/kW) / 12 horas
      // Esto nos da W/m² promedio durante las horas de sol
      const irradianciaPromedio = (avgIrradianceDaily * 1000) / 12;
      
      return {
        irradiancia: Math.round(irradianciaPromedio),
        hspAnual: Math.round(totalHSP)
      };
    }
    
    // Si no hay datos mensuales, usar valores por defecto
    throw new Error('No se pudieron obtener datos mensuales');
    
  } catch (error) {
    console.warn('Error al obtener datos de PVGIS, usando valores por defecto:', error);
    
    // Valores por defecto basados en la latitud
    const defaultIrradiance = calcularIrradianciaPorLatitud(lat);
    const defaultHSP = calcularHSPPorLatitud(lat);
    
    return {
      irradiancia: defaultIrradiance,
      hspAnual: defaultHSP
    };
  }
}

/**
 * Calcula irradiancia aproximada basada en la latitud
 * @param {number} lat - Latitud
 * @returns {number} Irradiancia en W/m²
 */
function calcularIrradianciaPorLatitud(lat) {
  // Argentina está aproximadamente entre -22° y -55° de latitud
  // Fórmula aproximada: mayor latitud (más negativo) = menor irradiancia
  // Rango típico en Argentina: 600-900 W/m²
  if (lat >= -22 && lat <= -35) {
    // Norte de Argentina: mayor irradiancia
    return 850;
  } else if (lat > -35 && lat <= -45) {
    // Centro de Argentina
    return 750;
  } else {
    // Sur de Argentina: menor irradiancia
    return 650;
  }
}

/**
 * Calcula HSP anual aproximado basado en la latitud
 * @param {number} lat - Latitud
 * @returns {number} HSP anual en horas
 */
function calcularHSPPorLatitud(lat) {
  // HSP anual en Argentina varía entre 1500-2000 horas
  if (lat >= -22 && lat <= -35) {
    // Norte de Argentina: mayor HSP
    return 1900;
  } else if (lat > -35 && lat <= -45) {
    // Centro de Argentina
    return 1700;
  } else {
    // Sur de Argentina: menor HSP
    return 1500;
  }
}

