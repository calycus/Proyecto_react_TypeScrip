import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Periodo from "../../../models/facultades/periodo";
import ApiUrl from '../../ApiUrl';

interface data{
    y:number
}

export const traerInfo = createSlice({
    name: 'HighchartLineGeneral',
    initialState: {
        LineDependienteGeneral: {
            categories: [] as string[],
            series: [
                {
                    // configuración de las series
                    name: "Tasa de Retencion",
                    data: [] as data[],
                },
                {
                    name: "Tasa de Deserción",
                    data: [] as data[],
                },
            ],
        }, 
        LineIndependienteGeneral: {
            categories: [] as string[],
            series: [
                {
                    // configuración de las series
                    name: "Tasa de Repitencia",
                    data: [] as data[],
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

            data.array_periodos_de_interes.forEach((element:Periodo) => {
                state.LineDependienteGeneral.categories.push(
                    element.abreviatura
                );
            });
            data.array_indices_desercion_to_response.forEach((element:number) => {
                state.LineDependienteGeneral.series[0].data.push(
                    {
                        y: element
                    }
                );
            });
            data.array_indices_retencion_to_response.forEach((element:number) => {
                state.LineDependienteGeneral.series[1].data.push(
                    {
                        y: element
                    }
                );
            });

        },
        setInfoIndependienteGeneral: (state, action) => {
            let data = action.payload
            state.LineIndependienteGeneral.categories = [];
            state.LineIndependienteGeneral.series[0].data = [];
            data.array_periodos_de_interes.forEach((element:Periodo) => {
                state.LineIndependienteGeneral.categories.push(
                    element.abreviatura
                );
            });
            data.array_indices_repitencia_to_response.forEach((element:number) => {
                state.LineIndependienteGeneral.series[0].data.push(
                    {
                        y:element
                    }
                );
            });
        },
    }
})

export const traerInfoGeneralAsync = (id_Malla:number) => (dispatch:any) => {
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
export const selectLineDependienteGeneral = (state:any) => state.HighchartLineGeneral.LineDependienteGeneral;
export const selectLineIndependienteGeneral = (state:any) => state.HighchartLineGeneral.LineIndependienteGeneral;
export default traerInfo.reducer;