import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartDesercionFactorEdnico',
    initialState: {
        ColumnFactorEdnico: {
            TotAlumnosEdnicos: 0,
            categories: [],
            series: [
                {
                    name: "",
                    colorByPoint: true,
                    data: [],
                },
            ],
        },

    },

    reducers: {
        setInfoFactorEdnico: (state, action) => {
            let data = action.payload

            let arrayEstadisticaDesercionPorEtnia = data.array_cantidades_desercion_estadisticas_por_etnia_desertores_PROCESADO;
            state.TotAlumnosEdnicos = data.tot_alumnos_desertores;

            state.ColumnFactorEdnico.series[0].data = [];
            state.ColumnFactorEdnico.categories = [];

            arrayEstadisticaDesercionPorEtnia.forEach((elementoEtnia) => {
                state.ColumnFactorEdnico.categories.push(elementoEtnia.etnia);

                state.ColumnFactorEdnico.series[0].data.push({
                    name: elementoEtnia.etnia,
                    label: elementoEtnia.etnia,
                    y: parseFloat(elementoEtnia.porcentaje),
                    cantidad: parseInt(elementoEtnia.cantidad),
                });
            });

        },
    }
})

export const traerInfoDSColumnFactorEdnicoAsync = (id_Malla) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/metadatos/factor_etnico/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setInfoFactorEdnico(res.data.data))
        })
}


export const { setInfoFactorEdnico } = traerInfo.actions;
export const selectColumnFactorEdnico = (state) => state.HighchartDesercionFactorEdnico.ColumnFactorEdnico;
export default traerInfo.reducer;