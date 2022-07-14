import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectColumnRetencionPorRangoDeEdad } from '../../../store/HighchartStore/DashboardRetencion/HighchartStoreRetencion'


//dependencia
import { useSelector } from 'react-redux'
import { ColumnRetencionPorRangoDeEdad } from '../../../models/dashboardRetencion'

export default function ColumnGraduadosPorRangoDeEdad() {
    const preColumnMatriculaPorRangoDeEdad:ColumnRetencionPorRangoDeEdad = useSelector(selectColumnRetencionPorRangoDeEdad);
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
                    format:
                        '<span style="color:{point.color}">Matriculas</span>: {point.y} <br/>',
                },
            },
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px"></span><br>',
            pointFormat:
                "<b>{point.name}</b> <br/>" +
                '<span style="color:{point.color}">Estudiantes Matriculados</span>: {point.y} <br/>',
        },

        series: [
            {
                name: "Desercion Por Rango De Edad",
                colorByPoint: true,
                data: [],
            },
        ],
    };

    newData.series = preColumnMatriculaPorRangoDeEdad.series
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={newData}
        />
    )

}