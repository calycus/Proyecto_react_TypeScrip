import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
        },

    },

    reducers: {
        setInfoFactorGeografico: (state, action) => {
            let data = action.payload

            let arrayEstadisticaDesercionPorFactorGeografico =
                data.array_cantidades_desercion_estadisticas_por_geografia_desertores_PROCESADO;

            let totalAlumnosDesertoresPorFactorGeografico = data.tot_alumnos_desertores;

            state.ColumnFactorGeografico.series[0].data = [];
            state.ColumnFactorGeografico.categories = [];

            state.TotAlumnosGeografico = totalAlumnosDesertoresPorFactorGeografico;

            arrayEstadisticaDesercionPorFactorGeografico.forEach(
                (elementoFactorGeografico) => {
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
                        y: parseFloat(elementoFactorGeografico.porcentaje),
                        cantidad: parseInt(elementoFactorGeografico.cantidad),
                    });

                }
            );
        },
    }
})

export const traerInfoDSColumnFactorGeograficoAsync = (id_Malla) => (dispatch) => {
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
export const selectColumnFactorGeografico = (state) => state.HighchartDesercionFactorGeografico.ColumnFactorGeografico;
export default traerInfo.reducer;