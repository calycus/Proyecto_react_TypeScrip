import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectColumnGraduadosPorGenero } from '../../../store/HighchartStore/DashboardRetencion/HighchartStoreRetencion'


//dependencia
import { useSelector } from 'react-redux'
import { ColumnGraduadosPorGenero } from '../../../models/dashboardRetencion'

export default function columnGraduadosPorGenero() {
    const preColumnGraduadosPorGenero:ColumnGraduadosPorGenero = useSelector(selectColumnGraduadosPorGenero);
    let newData: any = {
        chart: {
            type: "column",
        },
        title: {
            text: "",
        },
        colors: ["#008080", "#4BCFD1"],
        credits: { enabled: false },
        accessibility: {
            announceNewData: {
                enabled: true,
            },
        },
        xAxis: {
            type: "category",
        },
        yAxis: {
            title: {
                text: "",
            },
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format:
                        '<span style="color:{point.color}">Indice</span>: <b>{point.y:.2f}%</b> <br/>',
                },
            },
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:
                '<span style="color:{point.color}">Indice</span>: <b>{point.y:.2f}%</b> <br/>' +
                '<span style="color:{point.color}">Total</span>: {point.cantidad} {point.name}<br/>',
        },

        series: [
            {
                name: "Graduados Por Genero",
                colorByPoint: true,
                data: [],
            },
        ],
    };

    newData.series = preColumnGraduadosPorGenero.series
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={newData}
        />
    )

}