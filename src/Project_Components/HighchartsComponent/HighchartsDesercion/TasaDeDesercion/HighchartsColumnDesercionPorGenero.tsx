import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectColumnDesercionPorGenero } from '../../../../store/HighchartStore/DashboardDesercion/TasaDeDesercion/HighchartDesercionGenerosEdadEmbarazo'


//dependencia
import { useSelector } from 'react-redux'
import { ColumnDesercionPorGenero } from '../../../../models/desercion/dashboardDesercion'

export default function columnDesercionPorGenero() {
    const preColumnDesercionPorGenero:ColumnDesercionPorGenero = useSelector(selectColumnDesercionPorGenero);
    let newData:any = {
        chart: {
            type: "column",
        },
        title: {
            text: "",
        },
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
                    format: "{point.y:.1f}%",
                },
            },
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:
                '<span style="color:{point.color}">Incidencia</span>: <b>{point.y:.2f}%</b> <br/>' +
                '<span style="color:{point.color}">Total</span>: {point.cantidad} {point.name}<br/>',
        },

        series: [
            {
                name: "Desercion Por Genero",
                colorByPoint: true,
                data: [],
            },
        ],
    };

    newData.series = preColumnDesercionPorGenero.series

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={newData}
        />
    )

}