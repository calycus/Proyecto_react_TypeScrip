import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ArrayInfoEstudiantesEnRiesgo, arrayMateriasReprobadas, seriesTrayectoriaAcademica } from "../../../../models/desercion/PrediccionDesercion";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartStoreInfoPrediccionDesercion',
    initialState: {
        array_Info_Estudiantes_En_Riesgo: [] as ArrayInfoEstudiantesEnRiesgo[],
        array_Tracyectoria_Academica_Del_Estudiante: [] as any,
        array_Materias_Suspendidas: [] as arrayMateriasReprobadas[],
        array_Categorias: [] as string[],
        array_Series: [] as seriesTrayectoriaAcademica[],
    },

    reducers: {

        setInfoEstudianteEnRiesgo: (state, action) => {
            state.array_Info_Estudiantes_En_Riesgo = []
            state.array_Info_Estudiantes_En_Riesgo = action.payload
        },

        setInfoTrayectoriaEstudiantes: (state, action) => {
            state.array_Tracyectoria_Academica_Del_Estudiante = []
            state.array_Materias_Suspendidas = []
            state.array_Categorias = []
            state.array_Series = []

            state.array_Tracyectoria_Academica_Del_Estudiante = action.payload

            /* forEach para poder recorrer la informacion guardada en la variable */
            state.array_Tracyectoria_Academica_Del_Estudiante.map((elementoPeriodos:any) => {
                elementoPeriodos.array_materias_reprobadas.map(
                    (elementoMateriasSuspendida:arrayMateriasReprobadas) => {
                        state.array_Materias_Suspendidas.push({
                            materia: elementoMateriasSuspendida.materia,
                            nivel: elementoMateriasSuspendida.nivel,
                        });
                    }
                );

                /* pushearla al graficocorrespondiente  */
                state.array_Categorias.push(
                    elementoPeriodos.periodo.abreviatura
                );

                state.array_Series.push({
                    y: parseInt(elementoPeriodos.contador_inscripciones_perdidas),
                });
            });
        },


    }
})

export const traerInfoEstudiantesDesertoresAsync = (id_Malla:number, id_Estudiante:number) => (dispatch:any) => {

    axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/prediccion/data_estudiantes_potenciales_desertores/' +
        id_Estudiante +
        '/' +
        id_Malla,
        {
            headers: {
                Authorization: "Bearer " + ApiUrl.userToken,
            },
        })
        .then(res => {
            dispatch(setInfoEstudianteEnRiesgo(res.data))
        })
}

export const traerInfoTrayectoriaEstudiantesAsync = (id_Malla:number, id_Estudiante:number) => (dispatch:any) => {

    axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/prediccion/inscripciones_perdidas_potenciales_desertores/' +
        id_Malla +
        '/' +
        id_Estudiante,
        {
            headers: {
                Authorization: "Bearer " + ApiUrl.userToken,
            },
        })
        .then(res => {
            dispatch(setInfoTrayectoriaEstudiantes(res.data.data))
        })
}

export const { setInfoEstudianteEnRiesgo, setInfoTrayectoriaEstudiantes } = traerInfo.actions;
export const selectArrayInfoEstudiante = (state:any) => state.HighchartStoreInfoPrediccionDesercion.array_Info_Estudiantes_En_Riesgo;
export const selectArrayMateriaSuspendidas = (state:any) => state.HighchartStoreInfoPrediccionDesercion.array_Materias_Suspendidas;
export const selectArrayCategoria = (state:any) => state.HighchartStoreInfoPrediccionDesercion.array_Categorias;
export const selectArraySeries = (state:any) => state.HighchartStoreInfoPrediccionDesercion.array_Series;

export default traerInfo.reducer;