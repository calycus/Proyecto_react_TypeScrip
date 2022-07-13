import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Facultad, Malla } from "../../models/facultad";
import ApiUrl from '../ApiUrl';


let id_escuela: string = localStorage.getItem('id_escuela') != null ? localStorage.getItem('id_escuela') as string : '0';
let id_malla: string = localStorage.getItem('id_malla') != null ? localStorage.getItem('id_malla') as string : '0';
let id_facultad: string = localStorage.getItem('id_facultad') != null ? localStorage.getItem('id_facultad') as string : '0';
let name_facultad: string = localStorage.getItem('name_facultad') != null ? localStorage.getItem('name_facultad') as string : '';
let name_escuela: string = localStorage.getItem('name_escuela') != null ? localStorage.getItem('name_escuela') as string : '';
let facultades: Facultad[] = [];

export const traerFacultades = createSlice({
    name: 'arrayFacultades',
    initialState: {
        value: facultades,
        id_escuela: parseInt(id_escuela),
        id_malla: parseInt(id_malla),
        id_facultad: parseInt(id_facultad),
        name_facultad: name_facultad,
        name_escuela: name_escuela
    },

    reducers: {
        setFacultades: (state, action) => {
            state.value = action.payload;
        },

        toggleExpanded: (state, action) => {
            const index = action.payload;

            if (state.value.length > index && index >= 0 && state.value.length > 0) {
                //state.value[index].fac_expandida = !state.value[index].fac_expandida
                state.value.forEach((element, i) => {
                    if (i == index) {
                        state.value[index].fac_expandida = !state.value[index].fac_expandida
                    } else {
                        state.value[i].fac_expandida = false;
                    }
                })
            }
        },

        setLocalIdFacultad: (state, action) => {
            state.id_facultad = action.payload;
            localStorage.setItem('id_facultad', action.payload)
        },

        setLocalIdEscuela: (state, action) => {
            state.id_escuela = action.payload;
            localStorage.setItem('id_escuela', action.payload)
        },

        setLocalIdMalla: (state, action) => {
            //console.log("quieres cambiar la malla local = ",state.id_malla, " por ", action.payload )
            state.id_malla = action.payload;
            localStorage.setItem('id_malla', action.payload)
            //console.log("id cambiado a " , state.id_malla);
        },

        /* setLocalNameFacultad: (state, action) => {
            state.name_facultad = action.payload;
            localStorage.setItem('id_escuela', action.payload)
        },*/

        setLocalNameEscuela: (state, action) => {
            let newData = action.payload;

            newData.dataMalla.forEach((nameMalla:Malla) => {
                if (newData.newIdMalla == nameMalla.id) {
                    state.name_escuela = nameMalla.nombre;
                    localStorage.setItem('name_escuela', nameMalla.nombre)
                }
            })
            console.log(state.name_escuela)
            /* state.name_escuela = action.payload;
            localStorage.setItem('name_escuela', action.payload) */
        },
    }
})

export const traerFacultadesAsync = () => (dispatch:any) => {
    axios.get(ApiUrl.Api + '/api/general/facultades', {
        headers: {
            //Authorization: "Bearer " + this.userToken,
            Authorization: "Bearer " + ApiUrl.userToken
        },
    })
        .then(res => {
            const newArrayFacultades = res.data;
            dispatch(setFacultades(newArrayFacultades));
        })
}


export const { setFacultades, toggleExpanded,
    setLocalIdFacultad, setLocalIdEscuela,
    setLocalIdMalla, setLocalNameEscuela } = traerFacultades.actions;

export const selectArrayFacultades = (state:any) => state.arrayFacultades.value;
export const selectIdEscuela = (state:any) => state.arrayFacultades.id_escuela;
export const selectIdMalla = (state:any) => state.arrayFacultades.id_malla;
export const selectIdFacultad = (state:any) => state.arrayFacultades.id_facultad;
export const selectNameEscuela = (state:any) => state.arrayFacultades.name_escuela;

export default traerFacultades.reducer;