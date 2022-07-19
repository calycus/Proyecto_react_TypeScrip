import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSelector } from 'react-redux'

//dependencia
import { selectArrayInfoDataDocenteRepitencia, selectIdDocenteRepitencia } from '../../../../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/HighchartStoreRepitenciaPorMateria';
import { selectArrayDataMateriasPorIdMateria } from '../../../../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/ListTableStoreRepitenciaPorMateria';


let arrayInforamcionRepitencia = {
    total_Reprobados: 0,
    total_Aprobados: 0,
    total_Aprobados_Supletorio: 0,
    total_Inscritos: 0
}
export default function LineVariableIndependiente() {
    const arrayInfoDocente = useSelector(selectArrayInfoDataDocenteRepitencia)
    const id_Docente = useSelector(selectIdDocenteRepitencia)
    const array_Data_Materias_Por_Id_Materia = useSelector(selectArrayDataMateriasPorIdMateria)

    if (arrayInfoDocente != [] && array_Data_Materias_Por_Id_Materia.length != 0 && id_Docente != 0) {
        array_Data_Materias_Por_Id_Materia[0].docentes.map((elemento, index) => {
            if (elemento.id == id_Docente) {
                arrayInforamcionRepitencia.total_Reprobados = elemento.tot_reprobados
                arrayInforamcionRepitencia.total_Aprobados = elemento.tot_aprobados
                arrayInforamcionRepitencia.total_Aprobados_Supletorio = elemento.tot_aprobados_con_supletorio
                arrayInforamcionRepitencia.total_Inscritos = elemento.tot_inscritos
            }
        })
    }
    let newData = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
        },
        credits: { enabled: false },
        title: {
            text: "",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
            },
        },
        series: [
            {
                name: "estudiantes",
                colorByPoint: true,
                data: [],
            },
        ],
    };

    if (arrayInforamcionRepitencia.total_Inscritos != 0) {

        newData.series[0].data = []

        let ObjetoFactorAprobados = {
            name: "Aprobados",
            y: parseInt(arrayInforamcionRepitencia.total_Aprobados),
            sliced: true,
            selected: true,
        };

        newData.series[0].data.push(
            ObjetoFactorAprobados
        );

        let ObjetoFactorReprobados = {
            name: "Reprobados",
            y: parseInt(arrayInforamcionRepitencia.total_Reprobados),
        };

        newData.series[0].data.push(
            ObjetoFactorReprobados
        );

        let ObjetoFactorAprobadosConSupletorio = {
            name: "Aprobados con Supletorio",
            y: parseInt(arrayInforamcionRepitencia.total_Aprobados_Supletorio),
        };

        newData.series[0].data.push(
            ObjetoFactorAprobadosConSupletorio
        );


        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={newData}
            />
        )
    }

}