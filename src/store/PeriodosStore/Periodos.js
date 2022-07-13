import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../ApiUrl';

export const TraerPeriodos = createSlice({
    name: 'arrayPeriodos',
    initialState: {
        arrayPeriodosPorId: [],
    },

    reducers: {
        setArrayPeriodos: (state, action) => {
            state.arrayPeriodosPorId = action.payload;
        },
    }
})

export const traerPeriodosPorIdMallaAsync = (id_malla) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/general/periodos_por_malla/excluido_ultimo_periodo/' + id_malla, {
        headers: {},
    })
        .then(res => {
            dispatch(setArrayPeriodos(res.data));
        })
}


export const { setArrayPeriodos } = TraerPeriodos.actions;
export const selectArrayPeriodos = (state) => state.arrayPeriodos.arrayPeriodosPorId;
export default TraerPeriodos.reducer;