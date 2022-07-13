import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from '../../../ApiUrl';

export const traerInfo = createSlice({
    name: 'ListTableRepitenciaPorMateria',
    initialState: {
        array_Data_Repitencia_Por_Materia: [],
        array_List_Materias_Repitencia: [],
        array_Data_Materias_Por_Id_Materia: [],
    },

    reducers: {
        setListMateriasRepitencia: (state, action) => {
            let data = action.payload
            let arrayMaterias = [];
            let arrayIdMaterias = [];
            state.array_List_Materias_Repitencia = []
            state.array_Data_Repitencia_Por_Materia = []

            data.forEach((idMateria, index) => {
                if (idMateria.tot_reprobados != 0) {
                    if (arrayIdMaterias.indexOf(idMateria.idmateria) == -1) {
                        arrayIdMaterias.push(idMateria.idmateria);
                        arrayMaterias.push({
                            id_materia: idMateria.idmateria,
                            materia: idMateria.materia,
                            nivel: idMateria.nivel,
                        });

                    }
                }
            });
            state.array_List_Materias_Repitencia = arrayMaterias
            state.array_Data_Repitencia_Por_Materia = data

        },

        setArrayIncidenciaDeMateriasPorDocente: (state, action) => {
            let id_Materia = -1
            let arrayMaTeriasPorIdMaterias = [];
            state.array_Data_Materias_Por_Id_Materia = []
            id_Materia = action.payload

            //se recorre la selecciones de materias de la tabla para luego proceder a pushealos en los arrays anteriormente vaciados
            //Listar Docentes Por materia
            //Sumar Estudiantes Reprobados Por Docente
            state.array_Data_Repitencia_Por_Materia
                .filter((mat) => id_Materia == mat.idmateria)
                .forEach((elementoDocenteMateria, index) => {
                    let item = arrayMaTeriasPorIdMaterias.find(
                        (mat) => mat.idmateria == elementoDocenteMateria.idmateria
                    );
                    if (item == null) {
                        let itempush = {
                            idmateria: elementoDocenteMateria.idmateria,
                            materia: elementoDocenteMateria.materia,
                        };
                        itempush.docentes = [
                            {
                                id: elementoDocenteMateria.id_docente,
                                docente: elementoDocenteMateria.docente,
                                tot_inscritos: elementoDocenteMateria.tot_inscritos,
                                tot_aprobados: elementoDocenteMateria.tot_aprobados,
                                tot_reprobados: elementoDocenteMateria.tot_reprobados,
                                tot_aprobados_con_supletorio:
                                    elementoDocenteMateria.tot_aprobados_con_supletorio,
                                paralelos: [
                                    {
                                        id: elementoDocenteMateria.iddistributivo,
                                        paralelo: elementoDocenteMateria.paralelo,
                                        tot_inscritos: elementoDocenteMateria.tot_inscritos,
                                        tot_aprobados: elementoDocenteMateria.tot_aprobados,
                                        tot_reprobados: elementoDocenteMateria.tot_reprobados,
                                        tot_aprobados_con_supletorio:
                                            elementoDocenteMateria.tot_aprobados_con_supletorio,
                                    },
                                ],
                            },
                        ];
                        arrayMaTeriasPorIdMaterias.push(itempush);
                    } else {
                        let docente = item.docentes.find(
                            (doc) => doc.id == elementoDocenteMateria.id_docente
                        );
                        if (docente == null) {
                            item.docentes.push({
                                id: elementoDocenteMateria.id_docente,
                                docente: elementoDocenteMateria.docente,
                                tot_inscritos: elementoDocenteMateria.tot_inscritos,
                                tot_aprobados: elementoDocenteMateria.tot_aprobados,
                                tot_reprobados: elementoDocenteMateria.tot_reprobados,
                                tot_aprobados_con_supletorio:
                                    elementoDocenteMateria.tot_aprobados_con_supletorio,
                                paralelos: [
                                    {
                                        id: elementoDocenteMateria.iddistributivo,
                                        paralelo: elementoDocenteMateria.paralelo,
                                        tot_inscritos: elementoDocenteMateria.tot_inscritos,
                                        tot_aprobados: elementoDocenteMateria.tot_aprobados,
                                        tot_reprobados: elementoDocenteMateria.tot_reprobados,
                                        tot_aprobados_con_supletorio:
                                            elementoDocenteMateria.tot_aprobados_con_supletorio,
                                    },
                                ],
                            });
                        } else {
                            docente.tot_inscritos += elementoDocenteMateria.tot_inscritos;
                            docente.tot_aprobados += elementoDocenteMateria.tot_aprobados;
                            docente.tot_reprobados += elementoDocenteMateria.tot_reprobados;
                            docente.tot_aprobados_con_supletorio +=
                                elementoDocenteMateria.tot_aprobados_con_supletorio;
                            docente.paralelos.push({
                                id: elementoDocenteMateria.iddistributivo,
                                paralelo: elementoDocenteMateria.paralelo,
                                tot_inscritos: elementoDocenteMateria.tot_inscritos,
                                tot_aprobados: elementoDocenteMateria.tot_aprobados,
                                tot_reprobados: elementoDocenteMateria.tot_reprobados,
                                tot_aprobados_con_supletorio:
                                    elementoDocenteMateria.tot_aprobados_con_supletorio,
                            });
                        }
                    }
                });

            state.array_Data_Materias_Por_Id_Materia = arrayMaTeriasPorIdMaterias
        },
    }
})

export const traerInfoRepitenciaPorMateriasAsync = (id_Malla, id_Periodo) => (dispatch) => {
    axios.get(ApiUrl.Api + '/api/educacion/tasa_repitencia/por_materia/tabla_materias/' + id_Malla + "/" + id_Periodo, {
        headers: {
            Authorization: "Bearer " + ApiUrl.userToken,
        },
    })
        .then(res => {
            dispatch(setListMateriasRepitencia(res.data.data))
        })
}


export const { setListMateriasRepitencia, setArrayIncidenciaDeMateriasPorDocente } = traerInfo.actions;
export const selectArrayListMateriasRepitencia = (state) => state.ListTableRepitenciaPorMateria.array_List_Materias_Repitencia;
export const selectArrayDataMateriasPorIdMateria = (state) => state.ListTableRepitenciaPorMateria.array_Data_Materias_Por_Id_Materia;

export default traerInfo.reducer;