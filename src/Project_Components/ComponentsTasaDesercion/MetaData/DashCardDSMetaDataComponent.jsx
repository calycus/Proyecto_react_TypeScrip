import React from "react";
import { CardHeader, CardContent } from '@mui/material';
import { IconButton } from "@mui/material";
import { Announcement, AspectRatio } from '@mui/icons-material';
import { Divider } from '@mui/material';

//componentes
import PieDesercionFactorEconomico from "../../HighchartsComponent/HighchartsDesercion/MetaData/HighchartsPieDesercionFactorEconomico";
import ColumnDesercionFactorEdnico from "../../HighchartsComponent/HighchartsDesercion/MetaData/HighchartsColumnDesercionFactorEdnico";
import ColumnDesercionFactorGeografico from "../../HighchartsComponent/HighchartsDesercion/MetaData/HighchartsColumnDesercionFactorGeografico";

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
            title="IMPACTO EN LA TASA DE DESERCION POR FACTOR ECONÓMICO"
        />
        <Divider />
        <CardContent>
            <PieDesercionFactorEconomico />
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
            title="IMPACTO EN LA TASA DE DESERCION POR FACTOR ÉTNICO"
        />
        <Divider />
        <CardContent>
            <ColumnDesercionFactorEdnico/>
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
            title="IMPACTO EN LA TASA DE DESERCION POR FACTOR GEOGRÁFICO"
        />
        <Divider />
        <CardContent>
            <ColumnDesercionFactorGeografico />
        </CardContent>
    </React.Fragment>
);

export default {
    DashCardPieFactorEconomico,
    DashCardColumnFactorEtnico,
    DashCardColumnFactorGeografico,
}