import React, { useState } from "react";
import { CardHeader, CardContent, Box } from '@mui/material';
import { IconButton } from "@mui/material";
import { Announcement, AspectRatio } from '@mui/icons-material';
import { Divider } from '@mui/material';

//componentes
import ListMateriasRepitenciaPorMateria from '../../HighchartsComponent/HighchartsRepitencia/RepitenciaPorMateria/DashCardListRepitenciaPorMateria'
import LineIncidenciaDeMateria from '../../HighchartsComponent/HighchartsRepitencia/RepitenciaPorMateria/HighchartsLineIncidenciaDeMaterias'
import PieIncidenciaDeMateriasPorDocente from '../../HighchartsComponent/HighchartsRepitencia/RepitenciaPorMateria/HighchartsPieIncidenciaDeMateriasPorDocente'
import CardDocentes from './CardDocentesQueImpartenLaMateria'

const DashCardListRepitenciaPorMateria = () => {
    return (
        <React.Fragment>
            <ListMateriasRepitenciaPorMateria />
        </React.Fragment>
    )
}

const DashCardSpaiderWebPorMateria = () => {
    return (
        <React.Fragment>
            <CardHeader
                action={
                    [
                        <div style={{ display: "flex" }} key={1}>
                            <IconButton aria-label="expanded" >
                                <Announcement />
                            </IconButton>
                        </div>

                    ]
                }
                title="TASA DE REPITENCIA"
            />
            <Divider />
            <CardContent>
                <PieIncidenciaDeMateriasPorDocente />
            </CardContent>
        </React.Fragment>
    )
}
const CardDocentesQueImpartenLaMateria = () => {
    return (
        <CardDocentes />
    )
}

const DashCardColumnComparativoPorMateria = () => {
    return (
        <React.Fragment>
            <CardHeader
                action={
                    [
                        <IconButton aria-label="expanded" key={1}>
                            <Announcement />
                        </IconButton>,
                        <IconButton aria-label="AspectRatio" key={2}>
                            <AspectRatio />
                        </IconButton>
                    ]
                }
                title="TASA DE DESERCIÓN"
            />
            <Divider />
                <LineIncidenciaDeMateria />
        </React.Fragment>
    )
}

export default {
    DashCardListRepitenciaPorMateria,
    DashCardSpaiderWebPorMateria,
    CardDocentesQueImpartenLaMateria,
    DashCardColumnComparativoPorMateria,
}