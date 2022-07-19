import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { arrayRepitenciaPorEtnia, ColumnRepitenciaFactorEdnico } from "../../../../models/repitencia/metaDataRepitencia";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartRepitenciaFactorEdnico',
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
        } as ColumnRepitenciaFactorEdnico,

    },

    reducers: {
        setInfoFactorEdnico: (state, action) => {
            let data = action.payload

            let arrayEstadisticaRepeticionPorEtnia = data.array_cantidades_repeticion_estadisticas_por_etnia_repetidores;
            state.ColumnFactorEdnico.TotAlumnosEdnicos = data.tot_alumnos_perdieron_1_vez;

            state.ColumnFactorEdnico.series[0].data = [];
            state.ColumnFactorEdnico.categories = [];

            arrayEstadisticaRepeticionPorEtnia.forEach((elementoEtnia:arrayRepitenciaPorEtnia) => {
                state.ColumnFactorEdnico.categories.push(elementoEtnia.etnia);

                state.ColumnFactorEdnico.series[0].data.push({
                    name: elementoEtnia.etnia,
                    label: elementoEtnia.etnia,
                    y: elementoEtnia.porcentaje,
                    cantidad: elementoEtnia.cantidad,
                });
            });

        },
    }
})

export const traerInfoRPColumnFactorEdnicoAsync = (id_Malla:number) => (dispatch:any) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/metadatos/factor_etnico/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setInfoFactorEdnico(res.data.data))
        })
}


export const { setInfoFactorEdnico } = traerInfo.actions;
export const selectColumnFactorEdnico = (state:any) => state.HighchartRepitenciaFactorEdnico.ColumnFactorEdnico;
export default traerInfo.reducer;