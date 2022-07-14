import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectpieIndiceRepitencia } from '../../../store/HighchartStore/DashboardGeneral/HighchartFenomenos'


//dependencia
import { useSelector } from 'react-redux'
import { graphicMultiMalla } from '../../../models/dashboardGeneral'

export default function LineVariableIndependiente() {
    const prepieIndiceRepitencia:graphicMultiMalla = useSelector(selectpieIndiceRepitencia);
    let pieIndiceRepitencia:any = {
        chart: {
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
        credits: { enabled: false },
        accessibility: {
            point: {
                valueSuffix: "%",
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
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>Incidencia</b>: {point.porcentaje:.1f} %",
                },
                showInLegend: true,
            },
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format:
                        "<span>Incidencia</span>: <b>{point.porcentaje:.1f}%</b> <br/>",
                },
            },
        },

        tooltip: {
            /* headerFormat: '<span style="font-size:11px">{series.name}</span><br>', */
            pointFormat:
                '<span class="text-bold" style="color:{point.color}">Incidencia</span>: <b>{point.porcentaje:.1f}%</b> <br/>' +
                '<span class="text-bold" style="color:{point.color}">Indice</span>: {point.y} <br/>',
        },
        series:[]
    };

    pieIndiceRepitencia.series = prepieIndiceRepitencia.series

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={pieIndiceRepitencia}
        />
    )

}