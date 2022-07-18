import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { selectColumnFactorEdnico } from '../../../../store/HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorEdnico'

//dependencia
import { useSelector } from 'react-redux'

export default function ColumnDesercionFactorEdnico() {
    const preColumnDesercionFactorEdnico = useSelector(selectColumnFactorEdnico);
    let newData = {
        chart: {
            type: "column",
            reflow: true,
        },
        title: {
            text: "",
        },
        subtitle: {
            text: "",
        },
        xAxis: {
            categories: [],
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: "",
            },
        },
        credits: {
            enabled: false,
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><br/>',
            pointFormat:
                '<span style="color:{point.color}">Incidencia Estudiantil</span>: <b>{point.y:.1f}%</b><br/>' +
                '<span style="color:{point.color}">Total De Estudiantes</span>: {point.cantidad} <br/>',

            shared: true,
        },
        legend: {
            enabled: false,
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: "",
                colorByPoint: true,
                data: [],
            },
        ],
    };

    newData.xAxis.categories = preColumnDesercionFactorEdnico.categories
    newData.series = preColumnDesercionFactorEdnico.series

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={newData}
        />
    )

}