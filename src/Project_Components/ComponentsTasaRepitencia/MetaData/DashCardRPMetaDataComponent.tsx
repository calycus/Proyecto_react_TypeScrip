import React from "react";
import { CardHeader, CardContent } from '@mui/material';
import { IconButton } from "@mui/material";
import { Announcement, AspectRatio } from '@mui/icons-material';
import { Divider } from '@mui/material';

//componentes
import PieRepitenciaFactorEconomico from "../../HighchartsComponent/HighchartsRepitencia/MetaData/HighchartsPieRepitenciaFactorEconomico";
import ColumnRepitenciaFactorEdnico from "../../HighchartsComponent/HighchartsRepitencia/MetaData/HighchartsColumnRepitenciaFactorEdnico";
import ColumnRepitenciaFactorGeografico from "../../HighchartsComponent/HighchartsRepitencia/MetaData/HighchartsColumnRepitenciaFactorGeografico";

const DashCardPieFactorEconomico = (
    <React.Fragment>
        <CardHeader
            action={
                [
                    <IconButton aria-label="expanded" key={2}>
                        <AspectRatio />
                    </IconButton>
                ]
            }
            title="IMPACTO EN LA TASA DE REPITENCIA POR FACTOR ECONÓMICO"
        />
        <Divider />
        <CardContent>
            <PieRepitenciaFactorEconomico />
        </CardContent>
    </React.Fragment>
);

const DashCardColumnFactorEtnico = (
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
            title="IMPACTO EN LA TASA DE REPITENCIA POR FACTOR ÉTNICO"
        />
        <Divider />
        <CardContent>
            <ColumnRepitenciaFactorEdnico />
        </CardContent>
    </React.Fragment>
);

const DashCardColumnFactorGeografico = (
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
            title="IMPACTO EN LA TASA DE REPITENCIA POR FACTOR GEOGRÁFICO"
        />
        <Divider />
        <CardContent>
            <ColumnRepitenciaFactorGeografico />
        </CardContent>
    </React.Fragment>
);

export default {
    DashCardPieFactorEconomico,
    DashCardColumnFactorEtnico,
    DashCardColumnFactorGeografico,
}