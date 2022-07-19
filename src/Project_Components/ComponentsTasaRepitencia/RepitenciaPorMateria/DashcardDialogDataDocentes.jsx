import React from "react";
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { School } from '@mui/icons-material';
import { useSelector } from "react-redux";

//Dependencias
import { selectArrayInfoDataDocenteRepitencia, selectIdDocenteRepitencia } from "../../../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/HighchartStoreRepitenciaPorMateria";
import { selectArrayDataMateriasPorIdMateria } from "../../../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/ListTableStoreRepitenciaPorMateria";
import PieRepitenciaDelDocente from '../../HighchartsComponent/HighchartsRepitencia/RepitenciaPorMateria/HighchartsPieRepitenciaDelDocente'
import './DashcardDialogDataDocentes.css'

let arrayInfoDocente = []
let array_Data_Materias_Por_Id_Materia = []
let id_Docente = 0

let arrayInforamcionRepitencia = {
    total_Reprobados: 0,
    total_Aprobados: 0,
    total_Aprobados_Supletorio: 0,
    total_Inscritos: 0
}

const DialogDocentesContainer = () => {

    arrayInfoDocente = useSelector(selectArrayInfoDataDocenteRepitencia)
    id_Docente = useSelector(selectIdDocenteRepitencia)
    array_Data_Materias_Por_Id_Materia = useSelector(selectArrayDataMateriasPorIdMateria)


    if (arrayInfoDocente != [] && array_Data_Materias_Por_Id_Materia.length != 0 && id_Docente != 0) {
        array_Data_Materias_Por_Id_Materia[0].docentes.map((elemento, index) => {
            if (elemento.id == id_Docente) {
                arrayInforamcionRepitencia.total_Reprobados = elemento.tot_reprobados
                arrayInforamcionRepitencia.total_Aprobados = elemento.tot_aprobados
                arrayInforamcionRepitencia.total_Aprobados_Supletorio = elemento.tot_aprobados_con_supletorio
                arrayInforamcionRepitencia.total_Inscritos = elemento.tot_inscritos
            }
        })
    }


    if (arrayInfoDocente != []) {
        return (
            <Box className="DashcarDialog">
                <CardDataDocente />
                <CardGraphicEstadisticasDocente />
            </Box>

        );
    }
}

export default DialogDocentesContainer

const CardDataDocente = () => {
    return (
        <Card className="cardContainer">
            <Stack direction="row" spacing={2} style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '10px'

            }}>
                <Avatar
                    alt="User"
                    src='https://cdn.quasar.dev/img/mountains.jpg'
                    sx={{ width: '8rem', height: '8rem' }} />
            </Stack>
            <br />
            <CardContent sx={{ padding: '0px 1.5rem' }}>
                <div className="NameDocente">
                    {arrayInfoDocente.nombres}
                </div>
                <Divider />
                <div style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                    <div className="DataFija">Titulos:</div>
                </div>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    {(arrayInfoDocente.length != 0) ?
                        arrayInfoDocente.titulos.map((titulos, index) => {
                            return (
                                <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', }}
                                    key={index}
                                >
                                    <School sx={{ fontSize: 15, paddingRight: '16px' }} />
                                    <div style={{
                                        fontSize: '.75rem',
                                        fontWeight: '400',
                                        letterSpacing: '.03333em',
                                        lineHeight: '1.25rem'
                                    }}>
                                        {titulos}
                                    </div>
                                </div>
                            )
                        })
                        : null}
                </div>

            </CardContent>
            <CardContent sx={{ padding: '0px 1.5rem .4rem 1.5rem' }}>
                <div className="AlingDataPersonal">
                    <div className="DataFija">
                        CI o Pasaporte:
                    </div>
                    <div className="DataDinamica">
                        {arrayInfoDocente.cedula}
                    </div>
                </div>

                <div className="AlingDataPersonal">
                    <div className="DataFija">
                        Género:
                    </div>
                    <div className="DataDinamica">

                        {arrayInfoDocente.genero}
                    </div>
                </div>

                <div className="AlingDataPersonal">
                    <div className="DataFija">
                        Edad:
                    </div>
                    <div className="DataDinamica">
                        {arrayInfoDocente.edad}
                    </div>
                </div>

            </CardContent>
            <CardContent sx={{ padding: '0px 1.5rem' }}>
                <div className="DataFija" style={{ textAlign: 'center', paddingBottom: '5px' }}>
                    Contacto
                </div>

                <div className="AlingDataContacto">
                    <div className="DataFija">
                        Correo Institucional:
                    </div>
                    <div className="DataDinamica">
                        {arrayInfoDocente.mail_intitucional}
                    </div>
                </div>

                <div className="AlingDataContacto" style={{paddingTop: '10px'}}>
                    <div className="DataFija">
                        Correo Personal:
                    </div>
                    <div className="DataDinamica">
                        {arrayInfoDocente.mail_personal}
                    </div>
                </div>

                <div className="AlingDataContacto" style={{paddingTop: '10px'}}>
                    <div className="DataFija">
                        Teléfonos:
                    </div>
                        {(arrayInfoDocente.length != 0) ?
                            arrayInfoDocente.telefonos.map((telefonos, index) => {
                                return (
                                    <div className="ListNumeros"
                                        key={index}
                                    >
                                        <li className="DataDinamica">
                                            # {telefonos}
                                        </li>
                                    </div>
                                )
                            })
                            : null}
                </div>
                <div className="AlingDataPersonal" style={{paddingTop: '15px'}}>
                    <div className="DataFija">
                        Reside en:
                    </div>
                    <div className="DataDinamica">
                        {arrayInfoDocente.residencia}
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

const CardGraphicEstadisticasDocente = () => {
    return (
        <Card className="cardContainer">
            <div className="TitleGraphic">
                <label>Grafico de Rendimiento Estudiantil</label>
            </div>
            <Divider />
            <CardContent className="HightChartContainer" sx={{ padding: '1rem' }}>
                <PieRepitenciaDelDocente />
            </CardContent>
            <Divider />
            <CardContent className="DataDocenteRepitencia" sx={{ padding: '2rem 1rem' }}>
                <CardsInfoRepitencia />
            </CardContent>
        </Card>
    )
}

const CardsInfoRepitencia = () => {
    return (
        <React.Fragment>
            <Card>
                <div className="TitleGraphic">
                    <label>Aprobados</label>
                </div>
                <Divider />
                <CardContent sx={{ padding: '1rem 2rem 0rem 2rem', textAlign: 'center', paddingBottom: '10px !important' }}>
                    <div >
                        <div className="TextDashcard">
                            {arrayInforamcionRepitencia.total_Aprobados}/{arrayInforamcionRepitencia.total_Inscritos}
                        </div>
                        <label className="Estudiantes">Estudiantes</label>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <div className="TitleGraphic">
                    <label>Reprobados</label>
                </div>
                <Divider />
                <CardContent sx={{ padding: '1rem 2rem 0rem 2rem', textAlign: 'center', paddingBottom: '10px !important' }}>
                    <div >
                        <div className="TextDashcard">
                            {arrayInforamcionRepitencia.total_Reprobados}/{arrayInforamcionRepitencia.total_Inscritos}
                        </div>
                        <label className="Estudiantes">Estudiantes</label>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <div className="TitleGraphic">
                    <label>Aprobados con Supletorio </label>
                </div>
                <Divider />
                <CardContent sx={{ padding: '1rem 2rem 0rem 2rem', textAlign: 'center', paddingBottom: '10px !important' }}>
                    <div >
                        <div className="TextDashcard">
                            {arrayInforamcionRepitencia.total_Aprobados_Supletorio}/{arrayInforamcionRepitencia.total_Aprobados}
                        </div>
                        <label className="Estudiantes">Estudiantes</label>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}