import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { arrayRepitenciaPorGeografia, ColumnRepitenciaFactorGeografico } from "../../../../models/repitencia/metaDataRepitencia";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartRepitenciaFactorGeografico',
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
        } as ColumnRepitenciaFactorGeografico,

    },

    reducers: {
        setInfoFactorGeografico: (state, action) => {
            let data = action.payload

            let arrayEstadisticaRepeticionPorFactorGeografico =
                data.array_cantidades_repeticion_estadisticas_por_geografia_repetidores;


            state.ColumnFactorGeografico.series[0].data = [];
            state.ColumnFactorGeografico.categories = [];

            state.ColumnFactorGeografico.TotAlumnosGeografico = data.tot_alumnos_perdieron_1_vez;

            arrayEstadisticaRepeticionPorFactorGeografico.forEach(
                (elementoFactorGeografico: arrayRepitenciaPorGeografia) => {
                    if (
                        arrayEstadisticaRepeticionPorFactorGeografico.length >
                        10 &&
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

export const traerInfoRPColumnFactorGeograficoAsync = (id_Malla: number) => (dispatch: any) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/metadatos/factor_geografico/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setInfoFactorGeografico(res.data.data))
        })
}


export const { setInfoFactorGeografico } = traerInfo.actions;
export const selectColumnFactorGeografico = (state: any) => state.HighchartRepitenciaFactorGeografico.ColumnFactorGeografico;
export default traerInfo.reducer;