import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';
import Highcharts from "highcharts";
import HighchartColumnTopMateriasMayorIncidencia from "../../../../Project_Components/HighchartsComponent/HighchartsRepitencia/TasaDeRepitencia/HighchartColumnTopMateriasMayorIncidencia";

export const traerInfo = createSlice({
    name: 'HighchartRepitenciaColumnTop',
    initialState: {
        array_Top_Materias_Mayor_Incidencia: [],
        antepenultimo_Periodo: "",
        penultimo_Periodo: "",
        arrayColumnasGraficoComparativo: [],
    },

    reducers: {
        setTopMateriasMayorIncidencia: (state, action) => {

            let data = action.payload;
            let newOpcionGraphic = HighchartColumnTopMateriasMayorIncidencia

            let antepenultimoPeriodo = data.antepenultimo_periodo;
            let antepenultimoPeriodoAbreviatura = data.antepenultimo_periodo.abreviatura;

            let penultimoPeriodo = data.penultimo_periodo;
            let penultimoPeriodoAbreviatura = data.penultimo_periodo.abreviatura;

            state.antepenultimo_Periodo = antepenultimoPeriodoAbreviatura;
            state.penultimo_Periodo = penultimoPeriodoAbreviatura;
            state.arrayColumnasGraficoComparativo = data.array_materias_mayor_incidencia;


            newOpcionGraphic.series[0].data = []
            newOpcionGraphic.series[1].data = []

            //el series[0] es el antepenultimo periodo
            state.arrayColumnasGraficoComparativo[antepenultimoPeriodo.id].forEach(
                (elementoColumna) => {
                    /* console.log(antepenultimoPeriodoAbreviatura); */
                    newOpcionGraphic.series[0].data.push(
                        {
                            abreviatura: antepenultimoPeriodoAbreviatura,
                            name: elementoColumna.materia,
                            label: elementoColumna.materia,
                            y: parseFloat(elementoColumna.porcentaje_incidencia),
                        }
                    );
                }
            );
            //el series[1] es el penultimo periodo
            state.arrayColumnasGraficoComparativo[penultimoPeriodo.id].forEach(
                (elementoColumna) => {
                    newOpcionGraphic.series[1].data.push(
                        {
                            abreviatura: penultimoPeriodoAbreviatura,
                            name: elementoColumna.materia,
                            label: elementoColumna.materia,
                            y: parseFloat(elementoColumna.porcentaje_incidencia),
                        }
                    );
                }
            );

            Highcharts.chart('HighchartTopMaterias', newOpcionGraphic)
        }
    }
})

export const traerInfoRepitenciaColumnTopAsync = (id_Malla) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/principal/comparacion_periodos/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {
            dispatch(setTopMateriasMayorIncidencia(res.data.data))
        })
}


export const { setTopMateriasMayorIncidencia } = traerInfo.actions;
export const selectTopMateriasSeries = (state) => state.HighchartRepitenciaColumnTop.series;

export default traerInfo.reducer;