import React, { useState } from "react";
import { CardHeader, CardContent, Box } from '@mui/material';
import { IconButton } from "@mui/material";
import { Announcement, AspectRatio } from '@mui/icons-material';
import { Divider } from '@mui/material';

//componentes
import ListPeriodosRepitencia from '../../HighchartsComponent/HighchartsRepitencia/TasaDeRepitencia/DashcardRadioListRepitencia'
import ListMateriasRepitencia from '../../HighchartsComponent/HighchartsRepitencia/TasaDeRepitencia/DashCardListRepitencia'
import DialogMaterias from "./DashcardRepitenciaDialogMateriasSelected"

const DashCardListRepitencia = () => {
    return (
        <React.Fragment>
            <ListPeriodosRepitencia />
            <ListMateriasRepitencia />
        </React.Fragment>
    )
}

const DashCardSpaiderWeb = () => {
    return (
        <React.Fragment>
            <CardHeader
                action={
                    [
                        <div style={{ display: "flex" }} key={1}>
                            <IconButton aria-label="expanded" >
                                <Announcement />
                            </IconButton>
                            <Box aria-label="expanded">
                                <DialogMaterias />
                            </Box>
                        </div>

                    ]
                }
                title="TASA DE REPITENCIA"
            />
            <Divider />
            <CardContent>
                <div id="SpaiderWebMateriasSelected"></div>
            </CardContent>
        </React.Fragment>
    )
}

const DashCardColumnComparativo = () => {
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
            <CardContent>
                <div id="HighchartTopMaterias"></div>
            </CardContent>
        </React.Fragment>
    )
}

export default {
    DashCardListRepitencia,
    DashCardSpaiderWeb,
    DashCardColumnComparativo,
}