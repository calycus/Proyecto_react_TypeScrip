import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Malla } from "../../models/facultades/facultad";
import ApiUrl from '../ApiUrl';

export const traerMallasPorId = createSlice({
    name: 'arrayMallas',
    initialState: {
        value: [] as Malla[],
    },

    reducers: {
        setMallas: (state, action) => {
            state.value = []
            state.value = action.payload;
        },
    }
})

export const traerMallasPorIdEscuelaAsync = (id_escuela: number) => (dispatch: any) => {
    axios.get(ApiUrl.Api + '/api/general/escuela/mallas/' + id_escuela, {
        headers: {},
    })
        .then(res => {
            dispatch(setMallas(res.data));
        })
}


export const { setMallas } = traerMallasPorId.actions;
export const selectArrayMallas = (state: any) => state.arrayMallas.value;
export default traerMallasPorId.reducer;