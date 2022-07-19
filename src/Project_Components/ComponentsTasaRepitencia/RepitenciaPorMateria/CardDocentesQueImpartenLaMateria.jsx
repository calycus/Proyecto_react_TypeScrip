import React, { useState } from "react"
import {
    Dialog, DialogContent, IconButton, Card,
    CardContent, Box, Button, ListItemButton, Collapse, Typography, Paper, Divider, Icon, Stack, Avatar, DialogTitle
} from '@mui/material'
import { OpenInFull, Close } from '@mui/icons-material/';
import { useDispatch, useSelector } from "react-redux";

//Dependencias
import { selectArrayDataMateriasPorIdMateria } from "../../../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/ListTableStoreRepitenciaPorMateria"
import { traerInfoDataDocenteAsync } from "../../../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/HighchartStoreRepitenciaPorMateria";
import DialogDocentesContainer from './DashcardDialogDataDocentes'
import './CardDocentesQueImpartenLaMateria.css'

let array_Data_Materias_Por_Id_Materia = [];
const setCssPorfile = (docentes, index) => {
    const style = document.documentElement.style
    {
        (docentes % 2 > 0 && index == docentes - 1)
            ? style.setProperty('--gridColumn', 'span 2')
            : style.setProperty('--gridColumn', 'span 1')
    }
}


const CardDocentes = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    array_Data_Materias_Por_Id_Materia = useSelector(selectArrayDataMateriasPorIdMateria)

    const setOpenDialogDocente = (id_Docente) => {
        dispatch(traerInfoDataDocenteAsync(id_Docente))
        setOpen(true)


    }
    const handleClose = () => {
        setOpen(false);
    };

    if (array_Data_Materias_Por_Id_Materia.length != 0) {
        return (
            <Box className="BoxDocentesContainer">
                {array_Data_Materias_Por_Id_Materia[0].docentes.map((docente, index) => {
                    setCssPorfile(array_Data_Materias_Por_Id_Materia[0].docentes.length, index);
                    return (
                        <Card
                            key={index}
                            className="CardDocentes"
                            style={{
                                display: 'flex',
                                'gridColumn':
                                    array_Data_Materias_Por_Id_Materia[0].docentes.length % 2 > 0 &&
                                        index == array_Data_Materias_Por_Id_Materia[0].docentes.length - 1
                                        ? 'span 2'
                                        : 'span 1',
                            }}
                            onClick={() => setOpenDialogDocente(docente.id)}
                        >
                            <Box label="Alert">
                                <div className="wellDashCard">
                                    <div className="dashCardHeading">
                                        {docente.docente}
                                    </div>
                                </div>
                            </Box>
                            <Box className="wellDashCard">
                                <div >
                                    <div className="TextDashcard">
                                        {docente.tot_reprobados}/{docente.tot_inscritos}
                                    </div>
                                    <label className="TextDashcardReprobados">Reprobados</label>
                                </div>
                            </Box>
                        </Card>
                    )
                })}
                {(open)
                    ?
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        className="dashCardContainer"
                    >
                        <DialogTitle className="dialogToolbarContainer">
                            <Stack direction="row" spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt="Utm" src="/icons/Logo_utm.png" />
                                <Typography className="TituloDialogRepitenciDocentes">Reporte por Docente</Typography>
                            </Stack>
                            <DialogContent sx={{ display: 'flex', justifyContent: 'right', padding: '0px' }}>
                                <IconButton onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            </DialogContent>
                        </DialogTitle>
                        <DialogContent >
                            <DialogDocentesContainer />
                        </DialogContent>
                    </Dialog>
                    : null}
            </Box>
        )
    }
}

export default CardDocentes
