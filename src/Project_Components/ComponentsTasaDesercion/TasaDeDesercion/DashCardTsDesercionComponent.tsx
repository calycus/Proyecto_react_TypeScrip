import React from "react";
import { CardHeader, CardContent } from '@mui/material';
import { IconButton } from "@mui/material";
import { Announcement, AspectRatio, ImportExport } from '@mui/icons-material';
import { Divider } from '@mui/material';

//componentes
import LineMetodoSga from '../../HighchartsComponent/HighchartsDesercion/TasaDeDesercion/HighchartsLineMetodoSga'
import CardIndiceTotalDeInscritos from './CardIndiceTotalDeInscritos'
import PieDesercionPorMaternidad from '../../HighchartsComponent/HighchartsDesercion/TasaDeDesercion/HighchartsPieDesercionPorMaternidad'
import ColumnDesercionPorEdad from '../../HighchartsComponent/HighchartsDesercion/TasaDeDesercion/HighchartsColumnDesercionPorEdad'
import ColumnDesercionPorGenero from '../../HighchartsComponent/HighchartsDesercion/TasaDeDesercion/HighchartsColumnDesercionPorGenero'

import './DashCardTsDesercionComponent.css'

const DashCardLineDesercion = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={2}>
                        <AspectRatio />
                    </IconButton>
                ]
            }
            title="TASA DE DESERCIÓN"
        />
        <Divider />
        <CardContent 
            className="HighchartContentDesercion">
            <LineMetodoSga />
        </CardContent>
    </React.Fragment>
);

const DashCardCircularProgressDesercion = (
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
            title="TOTAL DE INSCRITOS"
        />
        <Divider />
        <CardContent>
            <CardIndiceTotalDeInscritos/>
        </CardContent>
    </React.Fragment>
);

const DashCardDesercionPorMaternidad = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={1}>
                        <AspectRatio />
                    </IconButton>,
                ]
            }
            title="DESERCION POR MATERNIDAD"
        />
        <Divider />
        <CardContent>
            <PieDesercionPorMaternidad />
        </CardContent>
    </React.Fragment>
);

const DashCardDesercionPorRangoDeEdad = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={1}>
                        <AspectRatio />
                    </IconButton>,
                ]
            }
            title="DESERCION POR RANGO DE EDAD"
        />
        <Divider />
        <CardContent>
            <ColumnDesercionPorEdad />
        </CardContent>
    </React.Fragment>
);

const DashCardDesercionPorGenero = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={1}>
                        <AspectRatio />
                    </IconButton>,
                ]
            }
            title="DESERCION POR GENERO"
        />
        <Divider />
        <CardContent>
            <ColumnDesercionPorGenero />
        </CardContent>
    </React.Fragment>
);

export default {
    DashCardLineDesercion,
    DashCardCircularProgressDesercion,
    DashCardDesercionPorMaternidad,
    DashCardDesercionPorRangoDeEdad,
    DashCardDesercionPorGenero
}