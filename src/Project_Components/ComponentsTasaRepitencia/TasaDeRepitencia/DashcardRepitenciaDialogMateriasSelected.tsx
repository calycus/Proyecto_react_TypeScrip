import React, { useState } from "react";
import {
    Dialog, DialogContent, IconButton, Card,
    CardContent, List, ListItemIcon, ListItemButton, Collapse, Typography, Paper, Divider
} from '@mui/material'
import { OpenInFull, Close, ExpandLess, ExpandMore } from '@mui/icons-material/';
import { renderHighchartGraphic } from '../../HighchartsComponent/HighchartsRepitencia/TasaDeRepitencia/DashCardListRepitencia'
import {
    selectArrayTotalInscripcionesRepitencia, selectArrayTotalInscripcionesPerdidasRepitencia,
    selectArrayTotalInscripcionesPasadasRepitencia, selectArrayAbreviaturasPeriodoRepitencia
} from "../../../store/HighchartStore/DashboardRepitencia/TasaDeRepitencia/HighchartStoreRepitenciaGeneral";
import './DashcardRepitenciaDialogMateriasSelected.css'
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/system";
import { abreviaturasPeriodo, materiasMayorIncidencia } from "../../../models/repitencia/dashboardRepitencia";

const DialogMaterias = () => {

    let AbreviaturasPeriodoRepitencia:any = useSelector(selectArrayAbreviaturasPeriodoRepitencia)
    let ArrayTotalInscripcionesRepitencia:number[] = useSelector(selectArrayTotalInscripcionesRepitencia)
    let ArrayTotalInscripcionesPerdidasRepitencia:number[] = useSelector(selectArrayTotalInscripcionesPerdidasRepitencia)
    let ArrayTotalInscripcionesPasadasRepitencia:number[] = useSelector(selectArrayTotalInscripcionesPasadasRepitencia)
    let contador:number = 0
    const [open, setOpen] = useState<boolean>(false);
    const [openList, setOpenList] = useState<boolean>(true);

    const handleClickListInscritos = () => {
        setOpenList(!openList);
    };

    const handleClickOpen = () => () => {
        contador = renderHighchartGraphic("")
        if (contador > 2) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="expanded" onClick={handleClickOpen()}>
                <OpenInFull />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{ minWidth: "200px" }}
            >
                <DialogContent className="dialogCloseIcon">
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogContent>
                <DialogContent >
                    <Box style={{ display: "flex" }}>
                        <div id="SpaiderWebPeriodSubjects"></div>
                        <Card className="cardInscriocionesPorPeriodo">
                            <Typography className="TitelCardDialog">INSCRIPCIONES POR PERIODO</Typography>
                            <CardContent>
                                {AbreviaturasPeriodoRepitencia.map((element:abreviaturasPeriodo, index:number) => {
                                    return (
                                        <List key={index} style={{ padding: "0px", paddingTop: "10px" }}>
                                            <ListItemButton onClick={handleClickListInscritos}>
                                                <ListItemIcon>
                                                    <div className='DivPaperContents'>
                                                        <Paper key={2} elevation={2} className='PaperDesercion'>
                                                            <div className='dialogDivContents' style={{ minHeight: '1.6rem', backgroundColor: 'rgb(0 0 0 / 10%)' }}>
                                                                {ArrayTotalInscripcionesRepitencia[index]}
                                                            </div>
                                                            <Divider />
                                                            <div className='dialogDivContents' style={{ minHeight: '1.8rem', backgroundColor: 'rgb(0 0 0 / 20%)' }}>Inscripciones</div>
                                                        </Paper>
                                                    </div>
                                                </ListItemIcon>
                                                <CardContent style={{ display: "flex", flexGrow: "1" }}>
                                                    <Typography className="dialogTitelListText">{element.abreviatura}</Typography>
                                                    {openList ? <ExpandLess /> : <ExpandMore />}</CardContent>
                                            </ListItemButton>
                                            <Collapse in={openList} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding className="dialogListRepitencia">
                                                    <Typography className="dialogListText">Total Aprobadas: {ArrayTotalInscripcionesPasadasRepitencia[index]}</Typography>
                                                    <Typography className="dialogListText">Total Perdidas: {ArrayTotalInscripcionesPerdidasRepitencia[index]}</Typography>
                                                </List>
                                            </Collapse>
                                        </List>
                                    )
                                })}
                            </CardContent>
                            <Typography className="TitelCardDialog" style={{ paddingTop: '20px' }}>INCIDENCIA POR PERIODO</Typography>
                            <CardContent>
                                <div id="DialogColumnPeriodSubjects"></div>
                                <Divider />
                            </CardContent>
                        </Card>
                    </Box>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default DialogMaterias