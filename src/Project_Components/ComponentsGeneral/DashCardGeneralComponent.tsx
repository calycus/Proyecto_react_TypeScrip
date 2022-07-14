import React from "react";
import { CardHeader, CardContent } from '@mui/material';
import { IconButton } from "@mui/material";
import { Announcement, AspectRatio, BarChart } from '@mui/icons-material';
import { Divider } from '@mui/material';

//componentes
import LineDependiente from '../HighchartsComponent/HighchartsGeneral/HighchartsLineDependiente'
import LineIndependiente from '../HighchartsComponent/HighchartsGeneral/HighchartsLineIndependiente'
import PieIndiceRepitencia from '../HighchartsComponent/HighchartsGeneral/HighchartPieRepitencia'
import PieIndiceDesercion from '../HighchartsComponent/HighchartsGeneral/HighchartPieDesercion'
import PieIndiceRetencion from '../HighchartsComponent/HighchartsGeneral/HighchartPieRetencion'

const DashCardVD = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={2}>
                        <AspectRatio />
                    </IconButton>
                ]
            }
            title="FENÓMENOS ACADÉMICOS DE VARIABLE DEPENDIENTE"
        />
        <Divider />
        <CardContent>
            <LineDependiente />
        </CardContent>
    </React.Fragment>
);

const DashCardVI = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={2}>
                        <AspectRatio />
                    </IconButton>
                ]
            }
            title="FENÓMENO ACADÉMICO DE VARIABLE INDEPENDIENTE"
        />
        <Divider />
        <CardContent>
            <LineIndependiente />
        </CardContent>
    </React.Fragment>
);

const DashCardTRE = (
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
            title="TASA DE REPITENCIA"
        />
        <Divider />
        <CardContent>
            <PieIndiceRepitencia />
        </CardContent>
    </React.Fragment>
);

const DashCardTDE = (
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
            <PieIndiceDesercion />
        </CardContent>
    </React.Fragment>
);

const DashCardTRT = (
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
            title="TASA DE RETENCION"
        />
        <Divider />
        <CardContent>
            <PieIndiceRetencion />
        </CardContent>
    </React.Fragment>
);

export default {
    DashCardVD,
    DashCardVI,
    DashCardTRE,
    DashCardTDE,
    DashCardTRT
}