import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartRepitencia',
    initialState: {
        array_Materias_Repitencia: [],
        array_tot_inscripciones: [],
        array_tot_inscripciones_perdidas: [],
        array_tot_inscripciones_pasadas: [],
        array_abreviaturas_periodos: [],
        array_Indices_Repitencia: [],
        array_Listado_Materias_Mostradas: [],
        array_Periodos_De_Interes: [],
    },

    reducers: {
        setMateriasRepitencia: (state, action) => {
            // Al ser data.array_materias_mayor_incidencia un Object
            // console.log(typeof data.array_materias_mayor_incidencia);
            // no se lo puede recorrer con un forEach, ya que no es un array
            // Se recorre con el for .. in para pushear los valores de los keys del object en elementos del
            // array state.array_Materias_Repitencia

            state.array_Materias_Repitencia = [];
            for (const value in action.payload.array_materias_mayor_incidencia) {
                //console.log(`${value}: ${data.array_materias_mayor_incidencia[value]}`);
                state.array_Materias_Repitencia.push(action.payload.array_materias_mayor_incidencia[value]);
                //console.log(state.array_Materias_Repitencia[0])
            }
            
        },

        setTotalInscripcionesRepitencia: (state, action) => {
            state.array_tot_inscripciones = [];
            state.array_tot_inscripciones_perdidas = [];
            state.array_tot_inscripciones_pasadas = [];
            state.array_tot_inscripciones = action.payload.array_tot_inscripciones_Todo.array_tot_inscripciones;
            state.array_tot_inscripciones_perdidas = action.payload.array_tot_inscripciones_Todo.array_tot_inscripciones_perdidas;
            state.array_tot_inscripciones_pasadas = action.payload.array_tot_inscripciones_Todo.array_tot_inscripciones_pasadas;
            
        },

        setIndicesRepitencia: (state, action) => {
            state.array_Indices_Repitencia = [];
            state.array_Indices_Repitencia = action.payload.array_indices;
            /* console.log(data);
            console.log(data.array_indices); */
        },

        setArrayAbreviaturasPeriodoRepitencia: (state, action) => {
            state.array_abreviaturas_periodos = [];
            state.array_abreviaturas_periodos = action.payload.array_abreviaturas_periodo;
        },
        
        setArrayMateriasRadioSelect: (state, action) => {
            state.array_Listado_Materias_Mostradas = []
            state.array_Listado_Materias_Mostradas = action.payload
        },

        setArrayPeriodosDeInteres: (state, action) => {
            state.array_Periodos_De_Interes = [];
            state.array_Periodos_De_Interes = action.payload;
            
        },

    }
})

export const traerInfoRepitenciaAsync = (id_Malla, id_Periodos) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/principal/tablas_materias_incidencia/' + id_Malla + "/periodos/" + id_Periodos, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {
            dispatch(setMateriasRepitencia(res.data.data))
            dispatch(setTotalInscripcionesRepitencia(res.data.data))
            dispatch(setIndicesRepitencia(res.data.data))
            dispatch(setArrayAbreviaturasPeriodoRepitencia(res.data.data))
        })
}


export const { setMateriasRepitencia, setTotalInscripcionesRepitencia,
    setIndicesRepitencia, setArrayAbreviaturasPeriodoRepitencia, 
    setArrayMateriasRadioSelect, setArrayPeriodosDeInteres } = traerInfo.actions;

export const selectArrayMateriasRepitencia = (state) => state.HighchartRepitencia.array_Materias_Repitencia;
export const selectArrayTotalInscripcionesRepitencia = (state) => state.HighchartRepitencia.array_tot_inscripciones;
export const selectArrayTotalInscripcionesPerdidasRepitencia = (state) => state.HighchartRepitencia.array_tot_inscripciones_perdidas;
export const selectArrayTotalInscripcionesPasadasRepitencia = (state) => state.HighchartRepitencia.array_tot_inscripciones_pasadas;
export const selectArrayAbreviaturasPeriodoRepitencia = (state) => state.HighchartRepitencia.array_abreviaturas_periodos;
export const selectArrayIndicesRepitencia = (state) => state.HighchartRepitencia.array_Indices_Repitencia;
export const selectArrayMateriasSelectPeriodo = (state) => state.HighchartRepitencia.array_Listado_Materias_Mostradas;
export const selectArrayPeriodosDeInteres = (state) => state.HighchartRepitencia.array_Periodos_De_Interes;

export default traerInfo.reducer;