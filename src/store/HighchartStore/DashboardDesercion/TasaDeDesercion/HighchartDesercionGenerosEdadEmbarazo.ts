import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ColumnDesercionPorEdad, ColumnDesercionPorGenero, PieDesercionPorMaternidad, seriesDataPieDesercionPorMaternidad } from "../../../../models/desercion/dashboardDesercion";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartDesercionGenerosEdadEmbarazo',
    initialState: {
        PieDesercionPorMaternidad: {
            categories: [],
            series: [
                {
                    name: "Desercion Por Maternidad",
                    colorByPoint: true,
                    data: [],
                },
            ],
        } as PieDesercionPorMaternidad,

        ColumnDesercionPorEdad: {
            series: [
                {
                    name: "Desercion Por Rango De Edad",
                    colorByPoint: true,
                    data: [],
                },
            ],
        } as ColumnDesercionPorEdad,

        ColumnDesercionPorGenero: {
            series: [
                {
                    name: "Desercion Por Genero",
                    colorByPoint: true,
                    data: [],
                },
            ],
        } as ColumnDesercionPorGenero
    },

    reducers: {
        setInfoDesertoresMaternidad: (state, action) => {
            let data = action.payload

            state.PieDesercionPorMaternidad.series[0].data = [];

            let totalNoDesertoras =
                data.TotEmbarazadas - data.TotDesertorasEmbarazadas;

            let ObjetoDesercionPorMaternidad = {
                name: "No Desertoras",
                y: totalNoDesertoras,
                sliced: true,
                selected: true,
            };

            state.PieDesercionPorMaternidad.series[0].data.push(
                ObjetoDesercionPorMaternidad
            );

            ObjetoDesercionPorMaternidad = {
                name: "Desertoras",
                y: parseInt(data.TotDesertorasEmbarazadas),
                sliced: false,
                selected: false,
            };

            state.PieDesercionPorMaternidad.series[0].data.push(
                ObjetoDesercionPorMaternidad
            );


        },

        setInfoDesertoresPorEdad: (state, action) => {
            let data = action.payload

            state.ColumnDesercionPorEdad.series[0].data = [];

            let randoDeEdad1 = {
                name: "DE 18 A 25 A??OS",
                y: parseInt(data.tot_edad_rango_1),
            };

            state.ColumnDesercionPorEdad.series[0].data.push(
                randoDeEdad1
            );

            let randoDeEdad2 = {
                name: "DE 26 A 35 A??OS",
                y: parseInt(data.tot_edad_rango_2),
            };

            state.ColumnDesercionPorEdad.series[0].data.push(
                randoDeEdad2
            );

            let randoDeEdad3 = {
                name: "DE 36 A 45 A??OS",
                y: parseInt(data.tot_edad_rango_3),
            };

            state.ColumnDesercionPorEdad.series[0].data.push(
                randoDeEdad3
            );

            let randoDeEdad4 = {
                name: "DE 46 EN ADELANTE",
                y: parseInt(data.tot_edad_rango_4),
            };

            state.ColumnDesercionPorEdad.series[0].data.push(
                randoDeEdad4
            );

        },

        setInfoDesertoresGenero: (state, action) => {
            let data = action.payload

            state.ColumnDesercionPorGenero.series[0].data = [];

            let totalDecertores =
                data.TotHombres + data.TotMujeres;
            let porcentajeTotalDeHombres =
                (data.TotHombres * 100) / totalDecertores;
            let porcentajeTotalDeMujeres =
                (data.TotMujeres * 100) / totalDecertores;

            let desercionHombres = {
                name: "Hombres",
                y: porcentajeTotalDeHombres,
                cantidad: parseInt(data.TotHombres),
            };

            state.ColumnDesercionPorGenero.series[0].data.push(desercionHombres);

            let desercionMujeres = {
                name: "Mujeres",
                y: porcentajeTotalDeMujeres,
                cantidad: parseInt(data.TotMujeres),
            };

            state.ColumnDesercionPorGenero.series[0].data.push(desercionMujeres);
        },

    }
})

export const traerInfoesercionGenerosEdadEmbarazoAsync = (id_Malla:number) => (dispatch:any) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_desertores/principal/general_generos_edad_embarazo/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            let Maternidad = {
                TotEmbarazadas: res.data.data.tot_embarazadas,
                TotDesertorasEmbarazadas: res.data.data.tot_desertoras_embarazadas
            }

            let Genero = {
                TotHombres: res.data.data.tot_inscritos_desertores_hombre_por_periodo,
                TotMujeres: res.data.data.tot_inscritos_desertores_mujer_por_periodo
            }

            dispatch(setInfoDesertoresMaternidad(Maternidad))
            dispatch(setInfoDesertoresPorEdad(res.data.data.rangos_edad_desertores))
            dispatch(setInfoDesertoresGenero(Genero))
        })
}


export const { setInfoDesertoresMaternidad, setInfoDesertoresPorEdad, setInfoDesertoresGenero } = traerInfo.actions;
export const selectPieDesercionPorMaternidad = (state:any) => state.HighchartDesercionGenerosEdadEmbarazo.PieDesercionPorMaternidad;
export const selectColumnDesercionPorEdad = (state:any) => state.HighchartDesercionGenerosEdadEmbarazo.ColumnDesercionPorEdad;
export const selectColumnDesercionPorGenero = (state:any) => state.HighchartDesercionGenerosEdadEmbarazo.ColumnDesercionPorGenero;
export default traerInfo.reducer;