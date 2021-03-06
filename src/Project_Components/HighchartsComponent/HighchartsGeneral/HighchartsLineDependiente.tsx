import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSelector } from 'react-redux'


//dependencia
import { selectLineDependienteGeneral } from '../../../store/HighchartStore/DashboardGeneral/HighchartStoreGeneral'
import { graficoDependienteAndIndependiente } from '../../../models/dashboardGeneral'

export default function LineVariableDependiente() {
    const prelineDependiente:graficoDependienteAndIndependiente = useSelector(selectLineDependienteGeneral);

    let newData:any = {
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
        colors: ["#63b463", "#d05851"],
        yAxis: {
            title: {
                text: "Incidencia General (%)", // nombre del eje de Y
            },
            plotLines: [
                {
                    color: "#808080",
                },
            ],
        },
        legend: {
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
            positioner: function (this:any) {
                return {
                    x: this.chart.plotLeft,
                    y: this.chart.plotTop,
                };
            } as any,
            useHTML: true,
            formatter: function (this:any) {
                let body = this.points.reduce(
                    (body:any, p:any) =>
                        body +
                        `<span style="color:${p.series.color}">\u25CF ${p.series.name}: </span><small><strong>${p.y}</strong></small><br/>`,
                    ""
                );
                return body;
            } as any,
            shared: true,
            valueDecimals: 2,
            shadow: false,
            borderWidth: 1,
            borderColor: "#63b463",
        },
        xAxis: {
            categories: [],
            crosshair: {
                snap: false,
            },
        },
        series: [
            {
                // configuraci??n de las series
                name: "Tasa de Retencion",
                data: [],
            },
            {
                name: "Tasa de Deserci??n",
                data: [],
            },
        ],
    };

    newData.xAxis.categories = prelineDependiente.categories
    newData.series = prelineDependiente.series

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={newData}
        />
    )

}