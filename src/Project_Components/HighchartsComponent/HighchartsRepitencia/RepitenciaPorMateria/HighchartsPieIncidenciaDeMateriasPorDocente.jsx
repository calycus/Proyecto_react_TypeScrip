import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { selectArrayDataMateriasPorIdMateria } from '../../../../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/ListTableStoreRepitenciaPorMateria'

//dependencia
import { useSelector } from 'react-redux'

export default function LineVariableIndependiente() {
    const prePieData = useSelector(selectArrayDataMateriasPorIdMateria);

    let newData = {
        chart: {
            type: "pie",
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
        },
        title: {
            text: "Indice<br>de<br>Repitencia",
            align: "center",
            verticalAlign: "middle",
            y: 60,
        },
        credits: { enabled: false },
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
        tooltip: {
            pointFormat:
                "Incidencia de Repitencia Estudiantil: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: "bold",
                        color: "white",
                    },
                },
                startAngle: -90,
                endAngle: 90,
                center: ["50%", "75%"],
                size: "110%",
            },
        },
        series: [
            {
                name: "Indice De Repitencia",
                innerSize: "50%",
                data: [],
            },
        ],
    };

    if (prePieData.length != 0) {

        prePieData[0].docentes.map((elemento) => {
            if (elemento.tot_reprobados > 0) {
                newData.series[0].data.push({
                    name: elemento.docente,
                    y: parseInt(elemento.tot_reprobados),
                });
            }
        });

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={newData}
            />
        )
    }

}