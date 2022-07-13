import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';

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
        },

        LineTasaDeDesercionFormula: {
            categories: [],
            series: [
                {
                    // configuración de las series
                    name: "Tasa de Deserción",
                    data: [],
                },
            ],
        },

        CardTotInscritosTotDesertores: {
            TotEstudiantes: 0,
            TotNoDesertores: 0,
            TotDesertores: 0,
        }
    },

    reducers: {
        setInfoDesertoresSGA: (state, action) => {
            let data = action.payload

            state.LineTasaDeDesercionSGA.categories = [];
            state.LineTasaDeDesercionSGA.series[0].data = [];
            
            data.forEach(
                (elementoDesercionSGA) => {
                    state.LineTasaDeDesercionSGA.categories.push(
                        elementoDesercionSGA.abreviatura_periodo
                    );
                    state.LineTasaDeDesercionSGA.series[0].data.push({
                        name: elementoDesercionSGA.abreviatura_periodo,
                        label: elementoDesercionSGA.abreviatura_periodo,
                        y: parseFloat(
                            elementoDesercionSGA.indice_tasa_desertores_por_periodo
                        ),
                    });
                }
            );
        },

        setInfoDesertoresFormula: (state, action) => {
            let data = action.payload

            state.LineTasaDeDesercionFormula.categories = [];
            state.LineTasaDeDesercionFormula.series[0].data = [];

            data.forEach(
                (elementoDesercionFormula) => {
                    state.LineTasaDeDesercionFormula.categories.push(
                        elementoDesercionFormula.abreviatura_periodo
                    );

                    state.LineTasaDeDesercionFormula.series[0].data.push({
                        name: elementoDesercionFormula.abreviatura_periodo,
                        label: elementoDesercionFormula.abreviatura_periodo,
                        y: parseFloat(
                            elementoDesercionFormula.indice_tasa_desertores_por_periodo
                        ),
                    });
                }
            );
        },
        
        setInfoTotInscritosTotDesertores: (state, action) => {
            let Estudiantes = action.payload

            state.CardTotInscritosTotDesertores.TotEstudiantes = Estudiantes.TotInscritos;
            state.CardTotInscritosTotDesertores.TotNoDesertores = parseInt(Estudiantes.TotInscritos - Estudiantes.TotDesertores);
            state.CardTotInscritosTotDesertores.TotDesertores = Estudiantes.TotDesertores;
        },
    }
})

export const traerInfoLineDesertoresAsync = (id_Malla) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/principal/general_indices/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setInfoDesertoresSGA(res.data.data.array_indices_tasa_desertores_por_periodo_bd_sga))
            dispatch(setInfoDesertoresFormula(res.data.data.array_indices_tasa_desertores_por_periodo_formula))

            let totEstudiantes = {
                TotInscritos: res.data.data.tot_inscritos_en_todos_periodos,
                TotDesertores: res.data.data.tot_inscritos_desertores_en_todos_periodos
            }
            dispatch(setInfoTotInscritosTotDesertores(totEstudiantes))
        })
}


export const { setInfoDesertoresSGA, setInfoDesertoresFormula, setInfoTotInscritosTotDesertores } = traerInfo.actions;
export const selectLineTasaDeDesercionSGA = (state) => state.HighchartDesercionGeneral.LineTasaDeDesercionSGA;
export const selectLineTasaDeDesercionFormula = (state) => state.HighchartDesercionGeneral.LineTasaDeDesercionFormula;
export const selectCardTotInscritosTotDesertores = (state) => state.HighchartDesercionGeneral.CardTotInscritosTotDesertores;
export default traerInfo.reducer;