import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
    selectArrayAbreviaturaIncidenciaDeMateriaRepitencia,
    selectArrayIndiceDeIncidenciaDeMateriaRepitencia
} from '../../../../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/HighchartStoreRepitenciaPorMateria'

import './HighchartsLineIncidenciaDeMaterias.css'

//dependencia
import { useSelector } from 'react-redux'

export default function LineVariableIndependiente() {
    const prelineCategories = useSelector(selectArrayAbreviaturaIncidenciaDeMateriaRepitencia);
    const prelineSeries = useSelector(selectArrayIndiceDeIncidenciaDeMateriaRepitencia);
    let newData = {
        chart: {
            renderTo: "container",
            type: "line",
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "",
        },
        colors: ["#FF9655"],
        yAxis: {
            title: {
                text: "Tasa de Repitencia (%)",
            },
            plotLines: [
                {
                    color: "#808080",
                },
            ],
        },
        legend: {
            enabled: false,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            borderWidth: 1,
        },
        plotOptions: {
            series: {
                states: {
                    hover: {
                        enabled: true,
                    },
                },
            },
        },
        tooltip: {
            positioner: function () {
                return {
                    x: this.chart.plotLeft,
                    y: this.chart.plotTop,
                };
            },
            useHTML: true,
            formatter: function () {
                let body = this.points.reduce(
                    (body, p) =>
                        body +
                        `<span style="color:${p.series.color}">\u25CF Repitencia del: </span><small><strong>${p.y}%</strong></small><br/>`,
                    ""
                );
                let body2 = this.points.reduce(
                    (body2, p) => body2 + `<span >${p.x} </span><br/>`,
                    ""
                );
                return body2 + body;
            },
            shared: true,
            valueDecimals: 2,
            shadow: false,
            borderWidth: 1,
            borderColor: "#FF9655",
        },
        xAxis: {
            categories: [],
            crosshair: {
                snap: false,
            },
        },
        series: [
            {
                name: "",
                data: [],
            },
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                        },
                    },
                },
            ],
        },
    };

    newData.xAxis.categories = prelineCategories
    newData.series[0].data = prelineSeries
    
    if (prelineSeries.length != 0) {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={newData}
                containerProps = {{ className: 'HighchartContentLineRepitenciaPorMateria' }}
            />
        )
    }

}