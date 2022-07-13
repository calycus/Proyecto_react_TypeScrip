import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartStoreRepitenciaPorMateria',
    initialState: {
        array_Incidencia_De_Materia: [],
        array_Abreviatura_Incidencia_De_Materia_Por_Periodo: [],
        array_Indice_De_Incidencia_De_Materia_Por_Periodo: [],
        array_Info_Data_Docente: [],
        id_Docente: null
    },

    reducers: {
        setArrayIncidenciaDeMateriasRepitencia: (state, action) => {
            state.array_Incidencia_De_Materia = []
            state.array_Incidencia_De_Materia = action.payload

            state.array_Abreviatura_Incidencia_De_Materia_Por_Periodo = []
            state.array_Indice_De_Incidencia_De_Materia_Por_Periodo = []

            state.array_Incidencia_De_Materia.forEach((elementoMateria, index) => {
                state.array_Abreviatura_Incidencia_De_Materia_Por_Periodo.push(
                    elementoMateria.abreviatura_periodo
                );

                //verificacion de las materias cuando no tienen repitencia en mas de dos semestres 
                if (index > 1) {
                    if (
                        state.array_Incidencia_De_Materia[index].porcentaje_incidencia == 0
                    ) {
                        if (
                            state.array_Incidencia_De_Materia[index - 1]
                                .porcentaje_incidencia == 0 &&
                            state.array_Incidencia_De_Materia[index - 2]
                                .porcentaje_incidencia == 0
                        ) {
                            return;
                        }
                    }
                }

                state.array_Indice_De_Incidencia_De_Materia_Por_Periodo.push({
                    name: elementoMateria.abreviatura_periodo,
                    y: elementoMateria.porcentaje_incidencia,
                });
            });

        },

        setInfoDataDocente: (state, action) => {
            state.array_Info_Data_Docente = []
            state.array_Info_Data_Docente = action.payload
            
        },

        setIdDocente:(state, action)=>{
            state.id_Docente = null
            state.id_Docente = action.payload
        }

    }
})

export const traerIncidenciaDeMateriaAtravezDeLosPeriodosRepitencia = (id_Malla, id_Materia) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/por_materia/incidencia_por_periodo_select_tabla_materias/' +
        id_Malla +
        "/" +
        id_Materia,
        {
            headers: {
                Authorization: "Bearer " + ApiUrl.userToken,
            },
        })
        .then(res => {
            dispatch(setArrayIncidenciaDeMateriasRepitencia(res.data.data))
        })
}


export const traerInfoDataDocenteAsync = (id_Docente) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/por_materia/data_docentes/' + id_Docente, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {
            dispatch(setIdDocente(id_Docente))
            dispatch(setInfoDataDocente(res.data))
        })
}


export const { setArrayIncidenciaDeMateriasRepitencia, setInfoDataDocente,setIdDocente } = traerInfo.actions;
export const selectArrayIncidenciaDeMateriasRepitencia = (state) => state.HighchartStoreRepitenciaPorMateria.array_Incidencia_De_Materia;
export const selectArrayAbreviaturaIncidenciaDeMateriaRepitencia = (state) => state.HighchartStoreRepitenciaPorMateria.array_Abreviatura_Incidencia_De_Materia_Por_Periodo;
export const selectArrayIndiceDeIncidenciaDeMateriaRepitencia = (state) => state.HighchartStoreRepitenciaPorMateria.array_Indice_De_Incidencia_De_Materia_Por_Periodo;
export const selectArrayInfoDataDocenteRepitencia = (state) => state.HighchartStoreRepitenciaPorMateria.array_Info_Data_Docente;
export const selectIdDocenteRepitencia = (state) => state.HighchartStoreRepitenciaPorMateria.id_Docente;

export default traerInfo.reducer;