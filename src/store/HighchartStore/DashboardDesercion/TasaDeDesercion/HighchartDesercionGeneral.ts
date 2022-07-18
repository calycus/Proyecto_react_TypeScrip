import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';
import { ArrayIndiceTasaDesertoresFormula, ArrayIndiceTasaDesertoresSGA, CardTotInscritosTotDesertores, LineDesercionPormalla, totEstudiantes } from "../../../../models/desercion/dashboardDesercion";

export const traerInfo = createSlice({
    name: 'HighchartDesercionGeneral',
    initialState: {
        LineTasaDeDesercionSGA: {
            categories: [],
            series: [
                {
                    // configuración de las series
                    name: "Tasa de Deserción",
                    data: [],
                },
            ],
        } as LineDesercionPormalla,

        LineTasaDeDesercionFormula: {
            categories: [],
            series: [
                {
                    // configuración de las series
                    name: "Tasa de Deserción",
                    data: [],
                },
            ],
        } as LineDesercionPormalla,

        CardTotInscritosTotDesertores: {
            TotEstudiantes: 0,
            TotNoDesertores: 0,
            TotDesertores: 0,
        } as CardTotInscritosTotDesertores
    },

    reducers: {
        setInfoDesertoresSGA: (state, action) => {
            let data = action.payload

            state.LineTasaDeDesercionSGA.categories = [];
            state.LineTasaDeDesercionSGA.series[0].data = [];

            data.forEach(
                (elementoDesercionSGA: ArrayIndiceTasaDesertoresSGA) => {
                    state.LineTasaDeDesercionSGA.categories.push(
                        elementoDesercionSGA.abreviatura_periodo
                    );
                    state.LineTasaDeDesercionSGA.series[0].data.push({
                        name: elementoDesercionSGA.abreviatura_periodo,
                        label: elementoDesercionSGA.abreviatura_periodo,
                        y: elementoDesercionSGA.indice_tasa_desertores_por_periodo
                    });
                }
            );
        },

        setInfoDesertoresFormula: (state, action) => {
            let data = action.payload

            state.LineTasaDeDesercionFormula.categories = [];
            state.LineTasaDeDesercionFormula.series[0].data = [];

            data.forEach(
                (elementoDesercionFormula: ArrayIndiceTasaDesertoresFormula) => {
                    state.LineTasaDeDesercionFormula.categories.push(
                        elementoDesercionFormula.abreviatura_periodo
                    );

                    state.LineTasaDeDesercionFormula.series[0].data.push({
                        name: elementoDesercionFormula.abreviatura_periodo,
                        label: elementoDesercionFormula.abreviatura_periodo,
                        y: elementoDesercionFormula.indice_tasa_desertores_por_periodo
                    });
                }
            );
        },

        setInfoTotInscritosTotDesertores: (state, action) => {
            let Estudiantes = action.payload

            state.CardTotInscritosTotDesertores.TotEstudiantes = Estudiantes.TotInscritos;
            state.CardTotInscritosTotDesertores.TotNoDesertores = Estudiantes.TotInscritos - Estudiantes.TotDesertores;
            state.CardTotInscritosTotDesertores.TotDesertores = Estudiantes.TotDesertores;
        },
    }
})

export const traerInfoLineDesertoresAsync = (id_Malla: number) => (dispatch: any) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/principal/general_indices/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setInfoDesertoresSGA(res.data.data.array_indices_tasa_desertores_por_periodo_bd_sga))
            dispatch(setInfoDesertoresFormula(res.data.data.array_indices_tasa_desertores_por_periodo_formula))

            let totEstudiantes: totEstudiantes = {
                TotInscritos: res.data.data.tot_inscritos_en_todos_periodos,
                TotDesertores: res.data.data.tot_inscritos_desertores_en_todos_periodos
            }
            dispatch(setInfoTotInscritosTotDesertores(totEstudiantes))
        })
}


export const { setInfoDesertoresSGA, setInfoDesertoresFormula, setInfoTotInscritosTotDesertores } = traerInfo.actions;
export const selectLineTasaDeDesercionSGA = (state: any) => state.HighchartDesercionGeneral.LineTasaDeDesercionSGA;
export const selectLineTasaDeDesercionFormula = (state: any) => state.HighchartDesercionGeneral.LineTasaDeDesercionFormula;
export const selectCardTotInscritosTotDesertores = (state: any) => state.HighchartDesercionGeneral.CardTotInscritosTotDesertores;
export default traerInfo.reducer;