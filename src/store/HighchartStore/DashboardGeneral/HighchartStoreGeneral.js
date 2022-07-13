import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartLineGeneral',
    initialState: {
        LineDependienteGeneral: {
            categories: [],
            series: [
                {
                    // configuración de las series
                    name: "Tasa de Retencion",
                    data: [],
                },
                {
                    name: "Tasa de Deserción",
                    data: [],
                },
            ],
        },
        LineIndependienteGeneral: {
            categories: [],
            series: [
                {
                    // configuración de las series
                    name: "Tasa de Repitencia",
                    data: [],
                }
            ],
        },
    },

    reducers: {
        setInfoDependienteGeneral: (state, action) => {
            let data = action.payload
            state.LineDependienteGeneral.categories = [];
            state.LineDependienteGeneral.series[0].data = [];
            state.LineDependienteGeneral.series[1].data = [];
            data.array_periodos_de_interes.forEach(element => {
                state.LineDependienteGeneral.categories.push(
                    element.abreviatura
                );
            });
            data.array_indices_desercion_to_response.forEach(element => {
                state.LineDependienteGeneral.series[0].data.push(
                    {
                        y: parseFloat(element, 2)
                    }
                );
            });
            data.array_indices_retencion_to_response.forEach(element => {
                state.LineDependienteGeneral.series[1].data.push(
                    {
                        y: parseFloat(element, 2)
                    }
                );
            });

        },
        setInfoIndependienteGeneral: (state, action) => {
            let data = action.payload
            state.LineIndependienteGeneral.categories = [];
            state.LineIndependienteGeneral.series[0].data = [];
            data.array_periodos_de_interes.forEach(element => {
                state.LineIndependienteGeneral.categories.push(
                    element.abreviatura
                );
            });
            data.array_indices_repitencia_to_response.forEach(element => {
                state.LineIndependienteGeneral.series[0].data.push(
                    {
                        y: parseFloat(element, 2)
                    }
                );
            });
        },
    }
})

export const traerInfoGeneralAsync = (id_Malla) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/dash_general/indices/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {
            
            dispatch(setInfoDependienteGeneral(res.data.data))
            dispatch(setInfoIndependienteGeneral(res.data.data))
        })
}


export const { setInfoDependienteGeneral, setInfoIndependienteGeneral } = traerInfo.actions;
export const selectLineDependienteGeneral = (state) => state.HighchartLineGeneral.LineDependienteGeneral;
export const selectLineIndependienteGeneral = (state) => state.HighchartLineGeneral.LineIndependienteGeneral;
export default traerInfo.reducer;