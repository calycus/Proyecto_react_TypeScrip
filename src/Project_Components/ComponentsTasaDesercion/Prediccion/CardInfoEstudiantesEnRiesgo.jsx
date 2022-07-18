import React from "react";
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

//Dependencias
import { selectArrayInfoEstudiante } from '../../../store/HighchartStore/DashboardDesercion/Prediccion/HighchartStoreInfoPrediccionDesercion'
import './CardInfoEstudiantesEnRiesgo.css'
let arrayInfoEstudiante = []

const CardInfoDataEstudiante = () => {

    arrayInfoEstudiante = useSelector(selectArrayInfoEstudiante)

    if (arrayInfoEstudiante != []) {
        return (
            <Box>
                <Stack direction="row" spacing={2} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '10px',
                    paddingBottom: '10px'

                }}>
                    <Avatar
                        alt="User"
                        src='https://cdn.quasar.dev/img/mountains.jpg'
                        sx={{ width: '8rem', height: '8rem' }} />
                </Stack>
                <CardContent sx={{ padding: '0px 1.5rem' }}>
                    <div className="NameEstudiante">
                        {arrayInfoEstudiante.nombres}
                    </div>
                    <Divider />
                </CardContent>
                <br />
                <CardContent sx={{ padding: '0px 1.5rem .4rem 1.5rem' }}>
                    <div className="AlingDataPersonalEstudiante">
                        <div className="DataFijaEstudiante">
                            CI o Pasaporte:
                        </div>
                        <div className="DataDinamicaEstudiante">
                            {arrayInfoEstudiante.cedula}
                        </div>
                    </div>

                    <div className="AlingDataPersonalEstudiante">
                        <div className="DataFijaEstudiante">
                            Género:
                        </div>
                        <div className="DataDinamicaEstudiante">

                            {arrayInfoEstudiante.genero}
                        </div>
                    </div>

                    <div className="AlingDataPersonalEstudiante">
                        <div className="DataFijaEstudiante">
                            Edad:
                        </div>
                        <div className="DataDinamicaEstudiante">
                            {arrayInfoEstudiante.edad}
                        </div>
                    </div>

                    <div className="AlingDataPersonalEstudiante">
                        <div className="DataFijaEstudiante">
                            Estado Actual:
                        </div>
                        <div className="DataDinamicaEstudiante"
                            style={{
                                'color':
                                    arrayInfoEstudiante.estado_actual == 'INSCRITO'
                                        ? '#21BA45'
                                        : '#C10015',
                                fontWeight: '700'
                            }}>
                            {arrayInfoEstudiante.estado_actual}
                        </div>
                    </div>

                </CardContent>
                <CardContent sx={{ padding: '0px 1.5rem' }}>
                    <div className="DataFijaEstudiante" style={{ textAlign: 'center', paddingBottom: '5px' }}>
                        Contacto
                    </div>

                    <div className="AlingDataContactoEstudiante">
                        <div className="DataFijaEstudiante">
                            Correo Institucional:
                        </div>
                        <div className="DataDinamicaEstudiante">
                            {arrayInfoEstudiante.mail_intitucional}
                        </div>
                    </div>

                    <div className="AlingDataContactoEstudiante" style={{ paddingTop: '10px' }}>
                        <div className="DataFijaEstudiante">
                            Correo Personal:
                        </div>
                        <div className="DataDinamicaEstudiante">
                            {arrayInfoEstudiante.mail_personal}
                        </div>
                    </div>

                    <div className="AlingDataContactoEstudiante" style={{ paddingTop: '10px' }}>
                        <div className="DataFijaEstudiante">
                            Teléfonos:
                        </div>
                        {(arrayInfoEstudiante.length != 0) ?
                            arrayInfoEstudiante.telefonos.map((telefonos, index) => {
                                return (
                                    <div className="ListNumerosEstudiante"
                                        key={index}
                                    >
                                        <li className="DataDinamicaEstudiante">
                                            # {telefonos}
                                        </li>
                                    </div>
                                )
                            })
                            : null}
                    </div>
                    <div className="AlingDataPersonalEstudiante" style={{ paddingTop: '15px' }}>
                        <div className="DataFijaEstudiante">
                            Reside en:
                        </div>
                        <div className="DataDinamicaEstudiante">
                            {arrayInfoEstudiante.residencia}
                        </div>
                    </div>
                </CardContent>
            </Box >
        )
    }
}

export default CardInfoDataEstudiante