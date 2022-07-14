export interface graficoDependienteAndIndependiente{
    categories: string[],
    series: seriesDataDependienteAndIndependiente[]

}

export interface seriesDataDependienteAndIndependiente{
    name:string,
    data: dataGraphicDependienteAndIndependiente[]
}

export interface dataGraphicDependienteAndIndependiente{
    y:number
}

/*  */
export interface graficoMultiMalla{
    id_escuela:number,
    escuela:string,
    indice_repitencia:number,
    indice_retencion:number,
    indice_desercion:number,
}

export interface graphicMultiMalla{
    series:dataSeriesGraphigMultiMalla[]
}

export interface dataSeriesGraphigMultiMalla{
    name:string,
    colorByPoint:boolean,
    data:dataGraphicMultiMalla[],
}

export interface dataGraphicMultiMalla{
    name:string,
    y:number,
    porcentaje:number,
}

