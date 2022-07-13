import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartRepitenciaFactorEconomico',
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

            let arrayEstadisticaRepeticionPorFactorEconomico = data.json_clase_salariales;

            state.PieFactorEconomico.series[0].data = [];
            state.TotAlumnosEconomico = data.tot_alumnos_desertores;

            let ObjetoFactorEconomico = {
                name: "Salario Básico",
                y: arrayEstadisticaRepeticionPorFactorEconomico
                    .contador_clase_salario_basico,
                cantidad:
                    arrayEstadisticaRepeticionPorFactorEconomico
                        .contador_clase_salario_basico,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "Clase Media",
                y: arrayEstadisticaRepeticionPorFactorEconomico
                    .contador_clase_salario_media,
                cantidad:
                    arrayEstadisticaRepeticionPorFactorEconomico
                        .contador_clase_salario_media,
                sliced: true,
                selected: true,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "Clase Alta",
                y: arrayEstadisticaRepeticionPorFactorEconomico
                    .contador_clase_salario_alta,
                cantidad:
                    arrayEstadisticaRepeticionPorFactorEconomico
                        .contador_clase_salario_alta,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "Clase Adinerada",
                y: arrayEstadisticaRepeticionPorFactorEconomico
                    .contador_clase_salario_rico,
                cantidad:
                    arrayEstadisticaRepeticionPorFactorEconomico
                        .contador_clase_salario_rico,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);

            ObjetoFactorEconomico = {
                name: "No Definido",
                y: arrayEstadisticaRepeticionPorFactorEconomico
                    .contador_clase_no_definida,
                cantidad:
                    arrayEstadisticaRepeticionPorFactorEconomico
                        .contador_clase_no_definida,
            };
            state.PieFactorEconomico.series[0].data.push(ObjetoFactorEconomico);


        },
    }
})

export const traerInfoRPPieFactorEconomicoAsync = (id_Malla) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/metadatos/factor_economico/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setInfoFactorEconomico(res.data.data))
        })
}


export const { setInfoFactorEconomico } = traerInfo.actions;
export const selectPieFactorEconomico = (state) => state.HighchartRepitenciaFactorEconomico.PieFactorEconomico;
export default traerInfo.reducer;