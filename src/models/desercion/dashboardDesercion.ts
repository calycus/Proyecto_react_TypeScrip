
/* LineDesercionPormalla */
export interface LineDesercionPormalla {
    categories: string[],
    series: seriesLineDesercion[]
}

export interface seriesLineDesercion {
    name: string,
    data: seriesDataLineDesercion[]
}

export interface seriesDataLineDesercion {
    name: string,
    label: string,
    y: number
}

/* Card Total De Inscritos y Desertores */

export interface CardTotInscritosTotDesertores {
    TotEstudiantes: number,
    TotNoDesertores: number,
    TotDesertores: number,
}

/* array_indices_tasa_desertores_por_periodo_bd_sga */
export interface ArrayIndiceTasaDesertoresSGA {
    id_periodo: number,
    abreviatura_periodo: string,
    tot_inscritos_por_periodo: number,
    tot_inscritos_desertores_por_periodo: number,
    indice_tasa_desertores_por_periodo: number
}

/* array_indices_tasa_desertores_por_periodo_formula  */
export interface ArrayIndiceTasaDesertoresFormula {
    id_periodo: number,
    abreviatura_periodo: string,
    indice_tasa_desertores_por_periodo: number
}

/* Total De estudiantes */
export interface totEstudiantes {
    TotInscritos: number,
    TotDesertores: number
}

/* PieDesercionPorMaternidad */
export interface PieDesercionPorMaternidad {
    categories: string[],
    series: seriesPieDesercionPorMaternidad[]
}

export interface seriesPieDesercionPorMaternidad {
    name: string,
    colorByPoint: boolean,
    data: seriesDataPieDesercionPorMaternidad[]
}

export interface seriesDataPieDesercionPorMaternidad {
    name: string,
    y: number,
    sliced: boolean,
    selected: boolean,
}

export interface seriesDataPieDesercionPorMaternidad2 {
    name: string,
    y: number,
}

/* ColumnDesercionPorEdad */
export interface ColumnDesercionPorEdad {
    series: seriesColumnDesercionPorEdad[]
}

export interface seriesColumnDesercionPorEdad {
    name: string,
    colorByPoint: boolean,
    data: seriesDataColumnDesercionPorEdad[]
}

export interface seriesDataColumnDesercionPorEdad {
    name: string,
    y: number,
}

/* ColumnDesercionPorGenero */
export interface ColumnDesercionPorGenero {
    series: seriesColumnDesercionPorEdad[]
}

export interface seriesColumnDesercionPorGenero {
    name: string,
    colorByPoint: boolean,
    data: seriesDataColumnDesercionPorGenero[]
}

export interface seriesDataColumnDesercionPorGenero {
    name: string,
    y: number,
}