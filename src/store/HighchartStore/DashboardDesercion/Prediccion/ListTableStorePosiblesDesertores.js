import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';


let Metodologia = [
    { Tipo: "Regresión Lineal", id: 1 }
]

export const traerInfo = createSlice({
    name: 'ListTableEstudiantesPrediccion',
    initialState: {
        array_List_Data_Estudiantes_En_Riesgo: [],
    },

    reducers: {
        setListEstudiantesPrediccion: (state, action) => {
            state.array_List_Data_Estudiantes_En_Riesgo = []
            state.array_List_Data_Estudiantes_En_Riesgo = action.payload
            console.log(state.array_List_Data_Estudiantes_En_Riesgo)
        },


    }
})

export const traerListaPosiblesDesertoresAsync = (id_Malla, id_Metodo) => (dispatch) => {
    if (id_Metodo == Metodologia[0].id) {
        axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/prediccion/met_regresion_lineal/listado_potenciales_desertores/' + id_Malla, {
            headers: {
                Authorization: "Bearer " + ApiUrl.userToken,
            },
        })
            .then(res => {
                dispatch(setListEstudiantesPrediccion(res.data.data))
            })
    }
}


export const { setListEstudiantesPrediccion } = traerInfo.actions;
export const selectArrayDataEstudiantesEnRiesgo = (state) => state.ListTableEstudiantesPrediccion.array_List_Data_Estudiantes_En_Riesgo;

export default traerInfo.reducer;