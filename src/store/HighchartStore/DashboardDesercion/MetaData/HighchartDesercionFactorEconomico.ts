import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json_clase_salariales, PieFactorEconomico } from "../../../../models/desercion/metaDataDesercion";
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
        } as PieFactorEconomico,

    },

    reducers: {
        setInfoFactorEconomico: (state, action) => {
            let data = action.payload

            let arrayEstadisticaDesercionPorFactorEconomico:json_clase_salariales = data.json_clase_salariales;
            let totalAlumnosDesertoresPorFactorEconomico:number = data.tot_alumnos_desertores;

            state.PieFactorEconomico.series[0].data = [];
            state.PieFactorEconomico.TotAlumnosEconomico = totalAlumnosDesertoresPorFactorEconomico;

            let ObjetoFactorEconomico = {
                name: "Salario Básico",
                y: arrayEstadisticaDesercionPorFactorEconomico
                    .contador_clase_salario_basico,
                cantidad:
                    arrayEstadisticaDesercionPorFactorEconomico
                        .contador_clase_salario_basico,
                sliced: false,
                selected: false,
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
                sliced: false,
                selected: false,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "Clase Adinerada",
                y: arrayEstadisticaDesercionPorFactorEconomico
                    .contador_clase_salario_rico,
                cantidad:
                    arrayEstadisticaDesercionPorFactorEconomico
                        .contador_clase_salario_rico,
                sliced: false,
                selected: false,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "No Definido",
                y: arrayEstadisticaDesercionPorFactorEconomico
                    .contador_clase_no_definida,
                cantidad:
                    arrayEstadisticaDesercionPorFactorEconomico
                        .contador_clase_no_definida,
                sliced: false,
                selected: false,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);


        },
    }
})

export const traerInfoDSPieFactorEconomicoAsync = (id_Malla:number) => (dispatch:any) => {
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
export const selectPieFactorEconomico = (state:any) => state.HighchartDesercionFactorEconomico.PieFactorEconomico;
export default traerInfo.reducer;