import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectArrayCategoria, selectArraySeries } from '../../../../store/HighchartStore/DashboardDesercion/Prediccion/HighchartStoreInfoPrediccionDesercion'

//dependencia
import { useSelector } from 'react-redux'
import './HighchartsLineTrayectoriaDelEstudiante.css'
import { seriesTrayectoriaAcademica } from '../../../../models/desercion/PrediccionDesercion'

let PreDataCategoria: string[] = []
let PreDataSeries: seriesTrayectoriaAcademica[] = []

export default function LineVariableIndependiente() {
    PreDataCategoria = useSelector(selectArrayCategoria);
    PreDataSeries = useSelector(selectArraySeries);

    let newData: any = {
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
        colors: ["#FF741F"],
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
            positioner: function (this: any) {
                return {
                    x: this.chart.plotLeft,
                    y: this.chart.plotTop,
                };
            },
            useHTML: true,
            formatter: function (this: any) {
                let body = this.points.reduce(
                    (body: any, p: any) =>
                        body +
                        `<span style="color:${p.series.color}">\u25CF Materias Repetidas: </span><small><strong>${p.y}</strong></small><br/>`,
                    ""
                );
                let body2 = this.points.reduce(
                    (body2: any, p: any) =>
                        body2 +
                        `<span >${p.x} </span><br/>`,
                    ""
                );
                return body2 + body;
            },
            shared: true,
            valueDecimals: 2,
            shadow: false,
            borderWidth: 1,
            borderColor: "#FF741F",
        },
        xAxis: {
            categories: [],
            crosshair: {
                snap: false,
            },
        },
        series: [
            {
                name: "Suspenciones Por Periodo",
                data: [],
            },
        ],
    };

    if (PreDataCategoria.length != 0 && PreDataSeries.length != 0) {
        newData.xAxis.categories = PreDataCategoria
        newData.series[0].data = PreDataSeries

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={newData}
                containerProps={{ className: 'HighchartsLineTrayectoriaDelEstudiante' }}
            />
        )
    }
    return (<div></div>)

}