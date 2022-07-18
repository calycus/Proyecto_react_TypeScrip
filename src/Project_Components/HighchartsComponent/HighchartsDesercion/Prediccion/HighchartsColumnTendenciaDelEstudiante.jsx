import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectArrayDataEstudiantesEnRiesgo } from '../../../../store/HighchartStore/DashboardDesercion/Prediccion/ListTableStorePosiblesDesertores'
import { selectArrayInfoEstudiante } from '../../../../store/HighchartStore/DashboardDesercion/Prediccion/HighchartStoreInfoPrediccionDesercion'
//dependencia
import { useSelector } from 'react-redux'

let viewRowsTable = []
let arrayInfoEstudiante = []


export default function ColumnDesercionPorEdad() {

    viewRowsTable = useSelector(selectArrayDataEstudiantesEnRiesgo)
    arrayInfoEstudiante = useSelector(selectArrayInfoEstudiante)

    let newData = {
        chart: {
            type: "column",
        },

        title: {
            text: "",
        },
        credits: { enabled: false },
        xAxis: {
            categories: ["Tendencia a Desertar"],
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: "",
            },
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: "<b>{point.name}</b> <br/>",
        },

        plotOptions: {
            column: {
                stacking: "normal",
            },
        },

        series: [],
    };

    if (viewRowsTable.lenght != 0 && arrayInfoEstudiante.lenght != 0) {
        viewRowsTable.map((elementoFuturo) => {
            if (elementoFuturo.cedula == arrayInfoEstudiante.cedula) {
                let ObjetoTendenciaFutura = {};
                if (
                    elementoFuturo.porc_desertar >= elementoFuturo.porc_continuar &&
                    elementoFuturo.porc_desertar >= elementoFuturo.porc_medio
                ) {
                    ObjetoTendenciaFutura = {
                        name: "Tendencia Alta",
                        data: [
                            {
                                name: "A Desertar",
                                y: parseFloat(elementoFuturo.porc_desertar),
                            },
                        ],
                        sliced: true,
                    };

                    newData.series.push(ObjetoTendenciaFutura);

                    if (elementoFuturo.porc_continuar >= elementoFuturo.porc_medio) {
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Media",
                            data: [
                                {
                                    name: "A Continuar",
                                    y: parseFloat(elementoFuturo.porc_continuar),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Baja",
                            data: [
                                {
                                    name: "Neutral",
                                    y: parseFloat(elementoFuturo.porc_medio),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        newData.colors = [
                            "#d05851",
                            "#63b463",
                            "#FF9655",
                        ];
                    } else {
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Media",
                            data: [
                                {
                                    name: "Neutral",
                                    y: parseFloat(elementoFuturo.porc_medio),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Baja",
                            data: [
                                {
                                    name: "A Continuar",
                                    y: parseFloat(elementoFuturo.porc_continuar),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        newData.colors = [
                            "#d05851",
                            "#FF9655",
                            "#63b463",
                        ];
                    }
                } else if (
                    elementoFuturo.porc_continuar >= elementoFuturo.porc_medio &&
                    elementoFuturo.porc_continuar >= elementoFuturo.porc_desertar
                ) {
                    ObjetoTendenciaFutura = {
                        name: "Tendencia Alta",
                        data: [
                            {
                                name: "A Continuar",
                                y: parseFloat(elementoFuturo.porc_continuar),
                            },
                        ],
                        sliced: true,
                    };

                    newData.series.push(ObjetoTendenciaFutura);
                    if (elementoFuturo.porc_desertar >= elementoFuturo.porc_medio) {
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Media",
                            data: [
                                {
                                    name: "A Desertar",
                                    y: parseFloat(elementoFuturo.porc_desertar),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Baja",
                            data: [
                                {
                                    name: "Neutral",
                                    y: parseFloat(elementoFuturo.porc_medio),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        newData.colors = [
                            "#63b463",
                            "#d05851",
                            "#FF9655",
                        ];
                    } else {
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Media",
                            data: [
                                {
                                    name: "Neutral",
                                    y: parseFloat(elementoFuturo.porc_medio),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Baja",
                            data: [
                                {
                                    name: "A Desertar",
                                    y: parseFloat(elementoFuturo.porc_desertar),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        newData.colors = [
                            "#63b463",
                            "#FF9655",
                            "#d05851",
                        ];
                    }
                } else {
                    ObjetoTendenciaFutura = {
                        name: "Tendencia Alta",
                        data: [
                            { name: "Neutral", y: parseFloat(elementoFuturo.porc_medio) },
                        ],
                        sliced: true,
                    };

                    newData.series.push(ObjetoTendenciaFutura);
                    if (
                        elementoFuturo.porc_desertar >= elementoFuturo.porc_continuar
                    ) {
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Media",
                            data: [
                                {
                                    name: "A Desertar",
                                    y: parseFloat(elementoFuturo.porc_desertar),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Baja",
                            data: [
                                {
                                    name: "A Continuar",
                                    y: parseFloat(elementoFuturo.porc_continuar),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        newData.colors = [
                            "#FF9655",
                            "#d05851",
                            "#63b463",
                        ];
                    } else {
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Media",
                            data: [
                                {
                                    name: "A Continuar",
                                    y: parseFloat(elementoFuturo.porc_continuar),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        ///////////////////////////////////
                        ObjetoTendenciaFutura = {
                            name: "Tendencia Baja",
                            data: [
                                {
                                    name: "A Desertar",
                                    y: parseFloat(elementoFuturo.porc_desertar),
                                },
                            ],
                            sliced: true,
                        };

                        newData.series.push(ObjetoTendenciaFutura);
                        newData.colors = [
                            "#FF9655",
                            "#63b463",
                            "#d05851",
                        ];
                    }
                }
            }
        });
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={newData}
                containerProps = {{ className: 'HighchartsColumnTendenciaDelEstudiante' }}
            />
        )
    }


}