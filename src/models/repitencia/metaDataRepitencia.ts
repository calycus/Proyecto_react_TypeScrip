/* PieFactorEconomico */
export interface PieRepitenciaFactorEconomico {
    TotAlumnosEconomico: number,
    series: seriesPieRepitenciaFactorEconomico[]
}

export interface seriesPieRepitenciaFactorEconomico {
    name: string,
    colorByPoint: boolean,
    data: seriesDataPieRepitenciaFactorEconomico[]
}

export interface seriesDataPieRepitenciaFactorEconomico {
    name: string,
    y: number,
    cantidad: number,
    sliced: boolean,
    selected: boolean,
}
/* json_clase_salariales */
export interface json_clase_salariales_Repitencia {
    contador_clase_salario_basico: number,
    contador_clase_salario_media: number,
    contador_clase_salario_alta: number,
    contador_clase_salario_rico: number,
    contador_clase_no_definida: number
}


/* ColumnFactorEdnico */
export interface ColumnRepitenciaFactorEdnico {
    TotAlumnosEdnicos: number,
    categories: string[]
    series: seriesColumnRepitenciaFactorEdnico[]
}

export interface seriesColumnRepitenciaFactorEdnico {
    name: string,
    colorByPoint: boolean,
    data: seriesDataColumnRepitenciaFactorEdnico[]
}

export interface seriesDataColumnRepitenciaFactorEdnico {
    name: string,
    label: string,
    y: number,
    cantidad: number,
}
/* array_cantidades_repeticion_estadisticas_por_etnia_repetidores */
export interface arrayRepitenciaPorEtnia {
    id: number,
    cantidad: number,
    etnia: string,
    porcentaje: number
}


/* ColumnFactorGeografico */
export interface ColumnRepitenciaFactorGeografico {
    TotAlumnosGeografico: number,
    categories: string[]
    series: seriesColumnRepitenciaFactorGeografico[]
}

export interface seriesColumnRepitenciaFactorGeografico {
    name: string,
    colorByPoint: boolean,
    data: seriesDataColumnRepitenciaFactorGeografico[]
}

export interface seriesDataColumnRepitenciaFactorGeografico {
    name: string,
    label: string,
    y: number,
    cantidad: number,
}
/* array_cantidades_repeticion_estadisticas_por_geografia_repetidores */
export interface arrayRepitenciaPorGeografia {
    id: number,
    cantidad: number,
    canton: string,
    porcentaje: number
}