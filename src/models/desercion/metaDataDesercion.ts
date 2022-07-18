/* PieFactorEconomico */
export interface PieFactorEconomico {
    TotAlumnosEconomico: number,
    series: seriesPieFactorEconomico[]
}

export interface seriesPieFactorEconomico {
    name: string,
    colorByPoint: boolean,
    data: seriesDataPieFactorEconomico[]
}

export interface seriesDataPieFactorEconomico {
    name: string,
    y: number,
    cantidad: number,
    sliced: boolean,
    selected: boolean,
}
/* json_clase_salariales */
export interface json_clase_salariales {
    contador_clase_salario_basico: number,
    contador_clase_salario_media: number,
    contador_clase_salario_alta: number,
    contador_clase_salario_rico: number,
    contador_clase_no_definida: number
}


/* ColumnFactorEdnico */
export interface ColumnFactorEdnico {
    TotAlumnosEdnicos: number,
    categories: string[]
    series: seriesColumnFactorEdnico[]
}

export interface seriesColumnFactorEdnico {
    name: string,
    colorByPoint: boolean,
    data: seriesDataColumnFactorEdnico[]
}

export interface seriesDataColumnFactorEdnico {
    name: string,
    label: string,
    y: number,
    cantidad: number,
}
/* array_cantidades_desercion_estadisticas_por_etnia_desertores_PROCESADO */
export interface arrayDesercionPorEtnia {
    id: number,
    cantidad: number,
    etnia: string,
    porcentaje: number
}

/* ColumnFactorGeografico */
export interface ColumnFactorGeografico {
    TotAlumnosGeografico: number,
    categories: string[]
    series: seriesColumnFactorGeografico[]
}

export interface seriesColumnFactorGeografico {
    name: string,
    colorByPoint: boolean,
    data: seriesDataColumnFactorGeografico[]
}

export interface seriesDataColumnFactorGeografico {
    name: string,
    label: string,
    y: number,
    cantidad: number,
}
/* array_cantidades_desercion_estadisticas_por_geografia_desertores_PROCESADO */
export interface arrayDesercionPorGeografia {
    id: number,
    cantidad: number,
    canton: string,
    porcentaje: number
}