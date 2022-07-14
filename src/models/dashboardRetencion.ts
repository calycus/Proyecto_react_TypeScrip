
/* LineRetencionPormalla */
export interface LineRetencionPormalla {
    categories: string[],
    series: seriesLineRetencion[]
}

export interface seriesLineRetencion {
    name: string,
    data: seriesDataLineRetencion[]
}

export interface seriesDataLineRetencion {
    name: string,
    label: string,
    y: number
}

/* ColumnGraduadosPorGenero */
export interface ColumnGraduadosPorGenero {
    promedioGeneral: number,
    totalDeEstudiantesInscritos: number,
    totalDeEstudiantesGradudados: number,
    totalDeEstudiantesRetenidos: number,
    porcentajeDeEstudiantesGradudados: number,
    porcentajeDeEstudiantesRetenidos: number,
    graduadosTotales: number,
    retenidosTotales: number,
    totalDeEstudiantesGradudadosHombres: number,
    totalDeEstudiantesGradudadosMujeres: number,
    series: seriesColumnGraduadosPorGenero[]
}

export interface seriesColumnGraduadosPorGenero {
    name: string,
    colorByPoint: boolean,
    data: dataseriesColumnGraduadosPorGenero[],
}

export interface dataseriesColumnGraduadosPorGenero {
    name: string,
    y: number,
    cantidad: number
}

/* ColumnRetencionPorRangoDeEdad */
export interface ColumnRetencionPorRangoDeEdad {
    total_edad_rango: number,
    total_edad_rango_1: number,
    total_edad_rango_2: number,
    total_edad_rango_3: number,
    total_edad_rango_4: number,
    series: seriesColumnRetencionPorRangoDeEdad[]
}

export interface seriesColumnRetencionPorRangoDeEdad {
    name: string,
    colorByPoint: boolean,
    data: dataSeriesColumnRetencionPorRangoDeEdad[],
}

export interface dataSeriesColumnRetencionPorRangoDeEdad {
    name: string,
    y: number,
}