import {
    Card, Divider, Collapse,
    Typography, Accordion, AccordionSummary,
    AccordionDetails, ListItemButton, ListItemText, Button, ListItemIcon
} from '@mui/material';

import { Box, Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

//store
import {
    selectArrayFacultades,
    setLocalIdEscuela, setLocalIdMalla, setLocalIdFacultad,
    toggleExpanded, traerFacultadesAsync
} from './store/MallaStore/EleccionMallaStore';

//iconos
import { ExpandMore, AssuredWorkload, ArrowForward } from '@mui/icons-material';

//dependencias CSS
import './css/EleccionMalla.css';
import { Facultad } from './models/facultades/facultad';

//control de apertura y cierra de los card de acordiones

export default function CardCareerChoice() {
    const theme = useTheme()
    let navigate = useNavigate();
    const facultades:Facultad[] = useSelector(selectArrayFacultades);
    const dispatch:any = useDispatch();
    const [expandedPanel, setExpandedPanel] = useState(-1);

    useEffect(() => {
        dispatch(traerFacultadesAsync());
    }, []);

    /* function setLocalVariables(id_escuela) {
        dispatch(setLocalIdEscuela(id_escuela))
        dispatch(setLocalIdMalla(id_malla))
        dispatch(setLocalIdFacultad(id_facultad)) 
    } */

    function handleClick(id_escuela:number, id_malla:number, id_facultad:number) {

        dispatch(setLocalIdFacultad(id_facultad))
        dispatch(setLocalIdEscuela(id_escuela))
        dispatch(setLocalIdMalla(id_malla))

        navigate("/general", { replace: true });
    }

    return (
        <Box>
            <div className='titulo' >
                Seleccione una Malla para Continuar
            </div>
            <div className='grid-mallas'>
                {
                    facultades.map((facultad, index) =>
                        <Card className='card-facultad' key={index}>
                            <div>
                                <Container>
                                    <div className='card-container' onClick={() => dispatch(toggleExpanded(index))} >
                                        <img style={{ minWidth: '90px', maxWidth: '90px' }} src={'facultades/fac_' + facultad.id + '.svg'} />
                                        <div className='div-name-facultad' style={{ color: theme.palette.primary.main }}>
                                            {facultad.nombre}
                                        </div>
                                    </div>

                                    <Collapse in={facultad.fac_expandida} timeout="auto" unmountOnExit style={{paddingBottom: '12px'}}>
                                        <Divider sx={{ margin: 1 }} />
                                        {facultad.escuelas.map((escuela, index) =>
                                            <Accordion expanded sx={{ boxShadow: 'none' }} key={index}>
                                                <Accordion
                                                    expanded={expandedPanel === index}
                                                    onChange={(e, expanded) => setExpandedPanel(expanded ? index : -1)}
                                                    sx={{ boxShadow: 'none' }}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMore />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <AssuredWorkload style={{ paddingRight: '10px' }} />
                                                        {escuela.nombre}
                                                    </AccordionSummary>
                                                    <AccordionDetails >
                                                        {escuela.mallas.map((malla, index) =>
                                                            <AccordionDetails key={index} style={{ cursor: 'pointer' }} onClick={() => handleClick(escuela.id, malla.id, facultad.id)}>
                                                                <div className='div-select-malla'>
                                                                    <div className='div-name-select-malla'>
                                                                        {malla.nombre}
                                                                    </div>
                                                                    <div style={ {justifySelf: 'right', display: 'inline-flex'}}>
                                                                        <ArrowForward className='arrowFoward-class' />
                                                                    </div>
                                                                </div>
                                                            </AccordionDetails>

                                                        )}
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Accordion>)
                                        }
                                    </Collapse>
                                </Container>
                            </div>
                        </Card>)
                }
            </div>
        </Box >
    )
}
