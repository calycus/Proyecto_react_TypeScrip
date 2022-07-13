import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../ApiUrl';

export const traerInfo = createSlice({
    name: 'PieFenomenosGeneral',
    initialState: {
        pieIndiceGeneralRepitenciaFacultad: {
            series: [
                {
                    name: "Tasa de Repitencia",
                    colorByPoint: true,
                    data: [],
                },
            ],
        },

        pieIndiceGeneralDesercionFacultad: {
            series: [
                {
                    name: "Tasa de Desercion",
                    colorByPoint: true,
                    data: [],
                },
            ],
        },

        pieIndiceGeneralRetencionFacultad: {
            series: [
                {
                    name: "Tasa de Retencion",
                    colorByPoint: true,
                    data: [],
                },
            ],
        },
    },

    reducers: {
        setIndicesFenomenos: (state, action) => {
            let data = action.payload

            //grafico tipo pie de indice general por facultad
            state.pieIndiceGeneralRepitenciaFacultad.series[0].data = [];
            state.pieIndiceGeneralDesercionFacultad.series[0].data = [];
            state.pieIndiceGeneralRetencionFacultad.series[0].data = [];

            let totalRetencion = 0;
            let totalDesercion = 0;
            let totalRepitencia = 0;

            data.forEach((elementoIndiceGeneral) => {
                totalRetencion += elementoIndiceGeneral.indice_retencion;
                totalDesercion += elementoIndiceGeneral.indice_desercion;
                totalRepitencia += elementoIndiceGeneral.indice_repitencia;
            });
            //grafico tipo pie que muestra el indice de las tasas de interes por facultad
            data.forEach((elementoIndiceGeneral) => {
                if (elementoIndiceGeneral.indice_repitencia == 0) {
                    return;
                } else {
                    //tasa de Repitencia
                    state.pieIndiceGeneralRepitenciaFacultad.series[0].data.push({
                        name: elementoIndiceGeneral.escuela,
                        y: elementoIndiceGeneral.indice_repitencia,
                        porcentaje:
                            (elementoIndiceGeneral.indice_repitencia / totalRepitencia) *
                            100,
                    });
                }
                if (elementoIndiceGeneral.indice_desercion == 0) {
                    return;
                } else {
                    //tasa de Desercion
                    state.pieIndiceGeneralDesercionFacultad.series[0].data.push({
                        name: elementoIndiceGeneral.escuela,
                        y: elementoIndiceGeneral.indice_desercion,
                        porcentaje:
                            (elementoIndiceGeneral.indice_desercion / totalDesercion) *
                            100,
                    });
                }
                if (elementoIndiceGeneral.indice_retencion == 0) {
                    return;
                } else {
                    //tasa de Retencion
                    state.pieIndiceGeneralRetencionFacultad.series[0].data.push({
                        name: elementoIndiceGeneral.escuela,
                        y: elementoIndiceGeneral.indice_retencion,
                        porcentaje:
                            (elementoIndiceGeneral.indice_retencion / totalRetencion) *
                            100,
                    });
                }
            })
        },
    }
})

export const traerInfoFenomenosAsync = (id_facultad) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/dash_general/tablas_graficos_multimallas/' + id_facultad, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {
            dispatch(setIndicesFenomenos(res.data.data))
        })
}


export const { setIndicesFenomenos } = traerInfo.actions;
export const selectpieIndiceRepitencia = (state) => state.PieFenomenosGeneral.pieIndiceGeneralRepitenciaFacultad;
export const selectpieIndiceDesercion = (state) => state.PieFenomenosGeneral.pieIndiceGeneralDesercionFacultad;
export const selectpieIndiceRetencion = (state) => state.PieFenomenosGeneral.pieIndiceGeneralRetencionFacultad;
export default traerInfo.reducer;