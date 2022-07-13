import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartDesercionFactorEconomico',
    initialState: {
        PieFactorEconomico: {
            TotAlumnosEconomico: 0,
            series: [
                {
                    name: "{series.name}",
                    colorByPoint: true,
                    data: [{ sliced: true, selected: true }],
                },
            ],
        },

    },

    reducers: {
        setInfoFactorEconomico: (state, action) => {
            let data = action.payload

            let arrayEstadisticaDesercionPorFactorEconomico = data.json_clase_salariales;
            let totalAlumnosDesertoresPorFactorEconomico = data.tot_alumnos_desertores;

            state.PieFactorEconomico.series[0].data = [];
            state.TotAlumnosEconomico = totalAlumnosDesertoresPorFactorEconomico;

            let ObjetoFactorEconomico = {
                name: "Salario Básico",
                y: arrayEstadisticaDesercionPorFactorEconomico
                    .contador_clase_salario_basico,
                cantidad:
                    arrayEstadisticaDesercionPorFactorEconomico
                        .contador_clase_salario_basico,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "Clase Media",
                y: arrayEstadisticaDesercionPorFactorEconomico
                    .contador_clase_salario_media,
                cantidad:
                    arrayEstadisticaDesercionPorFactorEconomico
                        .contador_clase_salario_media,
                sliced: true,
                selected: true,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "Clase Alta",
                y: arrayEstadisticaDesercionPorFactorEconomico
                    .contador_clase_salario_alta,
                cantidad:
                    arrayEstadisticaDesercionPorFactorEconomico
                        .contador_clase_salario_alta,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "Clase Adinerada",
                y: arrayEstadisticaDesercionPorFactorEconomico
                    .contador_clase_salario_rico,
                cantidad:
                    arrayEstadisticaDesercionPorFactorEconomico
                        .contador_clase_salario_rico,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "No Definido",
                y: arrayEstadisticaDesercionPorFactorEconomico
                    .contador_clase_no_definida,
                cantidad:
                    arrayEstadisticaDesercionPorFactorEconomico
                        .contador_clase_no_definida,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);


        },
    }
})

export const traerInfoDSPieFactorEconomicoAsync = (id_Malla) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/metadatos/factor_economico/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setInfoFactorEconomico(res.data.data))
        })
}


export const { setInfoFactorEconomico } = traerInfo.actions;
export const selectPieFactorEconomico = (state) => state.HighchartDesercionFactorEconomico.PieFactorEconomico;
export default traerInfo.reducer;