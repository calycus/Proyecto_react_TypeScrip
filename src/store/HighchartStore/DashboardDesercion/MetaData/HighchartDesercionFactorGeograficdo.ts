import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { arrayDesercionPorGeografia, ColumnFactorGeografico } from "../../../../models/desercion/metaDataDesercion";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartDesercionFactorGeografico',
    initialState: {
        ColumnFactorGeografico: {
            TotAlumnosGeografico: 0,
            categories: [],
            series: [
                {
                    name: "",
                    colorByPoint: true,
                    data: [],
                },
            ],
        } as ColumnFactorGeografico,

    },

    reducers: {
        setInfoFactorGeografico: (state, action) => {
            let data = action.payload

            let arrayEstadisticaDesercionPorFactorGeografico =
                data.array_cantidades_desercion_estadisticas_por_geografia_desertores_PROCESADO;

            let totalAlumnosDesertoresPorFactorGeografico = data.tot_alumnos_desertores;

            state.ColumnFactorGeografico.series[0].data = [];
            state.ColumnFactorGeografico.categories = [];

            state.ColumnFactorGeografico.TotAlumnosGeografico = totalAlumnosDesertoresPorFactorGeografico;

            arrayEstadisticaDesercionPorFactorGeografico.forEach(
                (elementoFactorGeografico:arrayDesercionPorGeografia) => {
                    if (
                        arrayEstadisticaDesercionPorFactorGeografico.length > 10 &&
                        elementoFactorGeografico.cantidad <= 7
                    ) {
                        return;
                    }
                    state.ColumnFactorGeografico.categories.push(
                        elementoFactorGeografico.canton
                    );

                    state.ColumnFactorGeografico.series[0].data.push({
                        name: elementoFactorGeografico.canton,
                        label: elementoFactorGeografico.canton,
                        y: elementoFactorGeografico.porcentaje,
                        cantidad: elementoFactorGeografico.cantidad,
                    });

                }
            );
        },
    }
})

export const traerInfoDSColumnFactorGeograficoAsync = (id_Malla:number) => (dispatch:any) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/metadatos/factor_geografico/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setInfoFactorGeografico(res.data.data))
        })
}


export const { setInfoFactorGeografico } = traerInfo.actions;
export const selectColumnFactorGeografico = (state:any) => state.HighchartDesercionFactorGeografico.ColumnFactorGeografico;
export default traerInfo.reducer;