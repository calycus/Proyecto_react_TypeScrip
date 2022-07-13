import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../ApiUrl';

export const traerInfo = createSlice({
    name: 'HighchartRetencion',
    initialState: {
        LineRetencionPormalla: {
            categories: [],
            series: [
                {
                    name: "Tasa de Retención",
                    data: [],
                },
            ],
        },

        ColumnGraduadosPorGenero: {

            promedioGeneral: 0,
            totalDeEstudiantesInscritos: 0,
            totalDeEstudiantesGradudados: 0,
            totalDeEstudiantesRetenidos: 0,
            porcentajeDeEstudiantesGradudados: 0,
            porcentajeDeEstudiantesRetenidos: 0,
            graduadosTotales: 0,
            retenidosTotales: 0,
            totalDeEstudiantesGradudadosHombres: 0,
            totalDeEstudiantesGradudadosMujeres: 0,

            series: [
                {
                    name: "Graduados Por Genero",
                    colorByPoint: true,
                    data: [],
                },
            ],
        },

        ColumnRetencionPorRangoDeEdad: {
            total_edad_rango: 0,
            total_edad_rango_1: 0,
            total_edad_rango_2: 0,
            total_edad_rango_3: 0,
            total_edad_rango_4: 0,
            
            series: [
                {
                    name: "Desercion Por Rango De Edad",
                    colorByPoint: true,
                    data: [],
                },
            ],
        },
    },

    reducers: {

        setLineRetencion: (state, action) => {
            let data = action.payload

            state.LineRetencionPormalla.categories = [];
            state.LineRetencionPormalla.series[0].data = [];

            data.forEach(element => {
                state.LineRetencionPormalla.categories.push(
                    element.periodo.abreviatura
                );

                //pusheo de datos en el grafico lineal el cual muestra el indice de retencion de una malla
                //atraves de los ultimos 6 periodos vigentes
                state.LineRetencionPormalla.series[0].data.push({
                    name: element.abreviatura,
                    label: element.abreviatura,
                    y: parseFloat(element.indice.toFixed(2), 2),
                });
            });

        },

        setColumnGraduados: (state, action) => {
            let data = action.payload

            state.ColumnGraduadosPorGenero.series[0].data = [];

            //data Retencion
            let totalIndices = 0;
            let promedio = 0;
            let totalDeInscritos = 0;
            let totalDeGraduados = 0;
            let totalDeRetenidos = 0;
            let totalDeGraduadosHombres = 0;
            let totalDeGraduadosMujeres = 0;
            let porcentajeDeGraduadosHombres = 0;
            let porcentajeDeGraduadosMujeres = 0;

            data.forEach(elementoRetencion => {
                //calculo de indice y total de estudiantes
                //calculo del total de estudiantes retenidos de los ultimos 6 periodos vigentes de una malla
                totalDeRetenidos =
                    totalDeRetenidos +
                    elementoRetencion.tot_inscritos_periodo_penultimo *
                    elementoRetencion.indice -
                    elementoRetencion.contador_inscritos_periodo_ultimo_primer_nivel;

                //precalculo del indice total de la malla para su posterior uso
                totalIndices = totalIndices + elementoRetencion.indice;

                //calculo del total de inscritos y total de gradudados en la malla seleccionada
                totalDeInscritos =
                    totalDeInscritos +
                    elementoRetencion.tot_inscritos_periodo_penultimo;
                totalDeGraduados =
                    totalDeGraduados +
                    elementoRetencion.tot_inscritos_egresados_periodo_penultimo;

                //calculo total de graduados por genero
                totalDeGraduadosHombres =
                    totalDeGraduadosHombres +
                    elementoRetencion.tot_inscritos_egresados_periodo_penultimo_hombre;
                totalDeGraduadosMujeres =
                    totalDeGraduadosMujeres +
                    elementoRetencion.tot_inscritos_egresados_periodo_penultimo_mujer;
            });

            //promedio de indices por malla y total de estudiantes
            promedio = (
                (totalIndices * 100) /
                data.length
            ).toFixed();

            //asignacion de variables ya calculadas a las variables globales para su posterior uso
            state.ColumnGraduadosPorGenero.promedioGeneral = parseInt(promedio);
            state.ColumnGraduadosPorGenero.totalDeEstudiantesInscritos = totalDeInscritos;

            //asignacion de la variable en valor numerico
            state.ColumnGraduadosPorGenero.graduadosTotales = totalDeGraduados;
            state.ColumnGraduadosPorGenero.retenidosTotales = totalDeRetenidos;

            //asignacion de la variable en porcentage
            state.ColumnGraduadosPorGenero.totalDeEstudiantesGradudados = (
                (totalDeGraduados * 100) /
                totalDeInscritos
            ).toFixed(2);
            state.ColumnGraduadosPorGenero.totalDeEstudiantesRetenidos = (
                (totalDeRetenidos * 100) /
                totalDeInscritos
            ).toFixed(2);
            
            //asignacion de variable en porcentage con base 1/1
            state.ColumnGraduadosPorGenero.porcentajeDeEstudiantesGradudados =
                state.ColumnGraduadosPorGenero.totalDeEstudiantesGradudados / 100;
            state.ColumnGraduadosPorGenero.porcentajeDeEstudiantesRetenidos =
                state.ColumnGraduadosPorGenero.totalDeEstudiantesRetenidos / 100;
                
            //asignacion de variable total de graduados por genero
            porcentajeDeGraduadosHombres =
                (totalDeGraduadosHombres * 100) / totalDeGraduados;
            porcentajeDeGraduadosMujeres =
                (totalDeGraduadosMujeres * 100) / totalDeGraduados;
            state.ColumnGraduadosPorGenero.totalDeEstudiantesGradudadosHombres = totalDeGraduadosHombres;
            state.ColumnGraduadosPorGenero.totalDeEstudiantesGradudadosMujeres = totalDeGraduadosMujeres;

            //pusheo de datos para grafico de Graduados por genero
            let graduadosHombres = {
                name: "Hombres",
                y: parseFloat(porcentajeDeGraduadosHombres, 2),
                cantidad: parseInt(state.totalDeEstudiantesGradudadosHombres),
            };

            state.ColumnGraduadosPorGenero.series[0].data.push(
                graduadosHombres
            );

            let graduadosMujeres = {
                name: "Mujeres",
                y: parseFloat(porcentajeDeGraduadosMujeres, 2),
                cantidad: parseInt(state.totalDeEstudiantesGradudadosMujeres),
            };

            state.ColumnGraduadosPorGenero.series[0].data.push(
                graduadosMujeres
            );
        },

        setColumnRangoDeEdad: (state, action) => {
            let data = action.payload

            let tot_edad_rango_1 = 0;
            let tot_edad_rango_2 = 0;
            let tot_edad_rango_3 = 0;
            let tot_edad_rango_4 = 0;

            state.ColumnRetencionPorRangoDeEdad.series[0].data = [];

            data.forEach(elementoRetencion => {
                //calculo de los rangos de edad
                tot_edad_rango_1 =
                    tot_edad_rango_1 +
                    elementoRetencion.json_edades_inscritos_primer_nivel
                        .tot_edad_rango_1;
                tot_edad_rango_2 =
                    tot_edad_rango_2 +
                    elementoRetencion.json_edades_inscritos_primer_nivel
                        .tot_edad_rango_2;
                tot_edad_rango_3 =
                    tot_edad_rango_3 +
                    elementoRetencion.json_edades_inscritos_primer_nivel
                        .tot_edad_rango_3;
                tot_edad_rango_4 =
                    tot_edad_rango_4 +
                    elementoRetencion.json_edades_inscritos_primer_nivel
                        .tot_edad_rango_4;
            });

            //asignacion de variables por rango de edad
            state.total_edad_rango =
                tot_edad_rango_1 +
                tot_edad_rango_2 +
                tot_edad_rango_3 +
                tot_edad_rango_4;
                
            //pusheo de datos para grafico de Graduados por genero
            let rangoDeEdad1 = {
                name: "DE 18 A 25 AÑOS",
                y: parseInt(tot_edad_rango_1),
            };

            state.ColumnRetencionPorRangoDeEdad.series[0].data.push(
                rangoDeEdad1
            );

            let rangoDeEdad2 = {
                name: "DE 26 A 35 AÑOS",
                y: parseInt(tot_edad_rango_2),
            };

            state.ColumnRetencionPorRangoDeEdad.series[0].data.push(
                rangoDeEdad2
            );

            let rangoDeEdad3 = {
                name: "DE 36 A 45 AÑOS",
                y: parseInt(tot_edad_rango_3),
            };

            state.ColumnRetencionPorRangoDeEdad.series[0].data.push(
                rangoDeEdad3
            );

            let rangoDeEdad4 = {
                name: "DE 46 EN ADELANTE",
                y: parseInt(tot_edad_rango_4),
            };

            state.ColumnRetencionPorRangoDeEdad.series[0].data.push(
                rangoDeEdad4
            );

        }
    }
})

export const traerInfoRetencionAsync = (id_Malla) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_retencion/principal/general_indices/' + id_Malla, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {

            dispatch(setLineRetencion(res.data.data))
            dispatch(setColumnGraduados(res.data.data))
            dispatch(setColumnRangoDeEdad(res.data.data))
        })
}


export const { setLineRetencion, setColumnGraduados, setColumnRangoDeEdad } = traerInfo.actions;
export const selectLineRetencionPormalla = (state) => state.HighchartRetencion.LineRetencionPormalla;
export const selectColumnGraduadosPorGenero = (state) => state.HighchartRetencion.ColumnGraduadosPorGenero;
export const selectColumnRetencionPorRangoDeEdad = (state) => state.HighchartRetencion.ColumnRetencionPorRangoDeEdad;
export default traerInfo.reducer;