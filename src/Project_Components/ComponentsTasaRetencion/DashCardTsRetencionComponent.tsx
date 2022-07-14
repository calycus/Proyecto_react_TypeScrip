import React from "react";
import { CardHeader, CardContent, Container } from '@mui/material';
import { IconButton } from "@mui/material";
import { Announcement, AspectRatio } from '@mui/icons-material';
import { Divider } from '@mui/material';

//componentes
import LineRetencionPorMalla from '../HighchartsComponent/HighchartsRetencion/HighchartsLineRetencion'
import ColumnGraduadosPorGenero from '../HighchartsComponent/HighchartsRetencion/HighchartsColumnGraduadosPorGenero'
import ColumnPrimeraMatriculaPorRangoDeEdad from '../HighchartsComponent/HighchartsRetencion/HighchartsColumnPrimeraMatriculaPorRangoDeEdad'
import CardIndiceDeRetencionPorMalla from './CardIndiceDeRetencionPorMalla'

import './DashCardTsRetencionComponent.css'

const DashCardLineRetencion = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={2}>
                        <AspectRatio/>
                    </IconButton>
                ]
            }
            title="TASA DE RETENCIÓN"
            subheader="prueba"
        />
        <Divider />
        <Container className="HighchartContentRetencion">
            <LineRetencionPorMalla/>
        </Container>
    </React.Fragment>
);

const DashCardCircularProgressRetencion = (
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
            title="INDICE DE RETENCIÓN POR MALLA"
            subheader="prueba"
        />
        <Divider />
        <CardContent>
            <CardIndiceDeRetencionPorMalla/>
        </CardContent>
    </React.Fragment>
);

const DashCardGraduadosPorGenero = (
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
            title="INDICE DE GRADUADOS POR GENERO"
        />
        <Divider />
        <CardContent>
        <ColumnGraduadosPorGenero/>
        </CardContent>
    </React.Fragment>
);

const DashCardPrimeraMatricula = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={1}>
                        <Announcement />
                    </IconButton>
                ]
            }
            title="PRIMERA MATRICULA POR RANGO DE EDAD"
        />
        <Divider />
        <CardContent>
        <ColumnPrimeraMatriculaPorRangoDeEdad/>
        </CardContent>
    </React.Fragment>
);

export default {
    DashCardLineRetencion,
    DashCardCircularProgressRetencion,
    DashCardGraduadosPorGenero,
    DashCardPrimeraMatricula
}