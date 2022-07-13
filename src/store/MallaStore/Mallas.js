import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../ApiUrl';

export const traerMallasPorId = createSlice({
    name: 'arrayMallas',
    initialState: {
        value: [],
    },

    reducers: {
        setMallas: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const traerMallasPorIdEscuelaAsync = (id_escuela) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/general/escuela/mallas/' + id_escuela, {
        headers: {},
    })
        .then(res => {
            dispatch(setMallas(res.data));
        })
}


export const { setMallas } = traerMallasPorId.actions;
export const selectArrayMallas = (state) => state.arrayMallas.value;
export default traerMallasPorId.reducer;