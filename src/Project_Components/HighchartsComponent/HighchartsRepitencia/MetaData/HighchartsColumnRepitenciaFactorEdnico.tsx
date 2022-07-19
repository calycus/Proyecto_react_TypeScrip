import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { selectColumnFactorEdnico } from '../../../../store/HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorEdnico'

//dependencia
import { useSelector } from 'react-redux'
import { ColumnRepitenciaFactorEdnico } from '../../../../models/repitencia/metaDataRepitencia'

export default function columnRepitenciaFactorEdnico() {
    const preColumnRepitenciaFactorEdnico:ColumnRepitenciaFactorEdnico = useSelector(selectColumnFactorEdnico);
    let newData:any = {
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

    newData.xAxis.categories = preColumnRepitenciaFactorEdnico.categories
    newData.series = preColumnRepitenciaFactorEdnico.series

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={newData}
        />
    )

}