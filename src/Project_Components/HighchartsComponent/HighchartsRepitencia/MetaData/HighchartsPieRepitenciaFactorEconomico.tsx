import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectPieFactorEconomico } from '../../../../store/HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorEconomico'


//dependencia
import { useSelector } from 'react-redux'
import { PieRepitenciaFactorEconomico } from '../../../../models/repitencia/metaDataRepitencia'

export default function pieRepitenciaFactorEconomico() {
    const prePieRepitenciaFactorEconomico:PieRepitenciaFactorEconomico = useSelector(selectPieFactorEconomico);
    let newData:any = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
        },
        title: {
            text: "",
        },
        colors: [
            "#c64f6e",
            "#717dc5",
            "#6a9bc5",
            "#7ec56a",
            "#c6794d",
            "#82103e",
            "#33ccba",
            "#d0c025",
        ],
        credits: {
            enabled: false,
        },
        tooltip: {
            pointFormat:
                '<span style="color:{point.color}">Incidencia</span>: <b>{point.percentage:.1f}%</b><br/>' +
                '<span style="color:{point.color}">Total De Estudiantes</span>: {point.cantidad} <br/>',
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                pointPadding: 0.3,
                borderWidth: 0.3,
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        series: [
            {
                name: "{series.name}",
                colorByPoint: true,
                data: [{ sliced: true, selected: true }],
            },
        ],
    };
    
    newData.series = prePieRepitenciaFactorEconomico.series
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={newData}
        />
    )

}