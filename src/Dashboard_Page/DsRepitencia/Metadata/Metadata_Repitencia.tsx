import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

//componentes
import DashCardRPMetaDataComponent from '../../../Project_Components/ComponentsTasaRepitencia/MetaData/DashCardRPMetaDataComponent';
import Select from '../../../Project_Components/SelectComponent';

//store
import {
    selectIdEscuela, selectIdMalla
} from '../../../store/MallaStore/EleccionMallaStore';
import { selectArrayMallas, traerMallasPorIdEscuelaAsync } from '../../../store/MallaStore/Mallas';
import { traerInfoRPPieFactorEconomicoAsync } from '../../../store/HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorEconomico';
import { traerInfoRPColumnFactorEdnicoAsync } from '../../../store/HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorEdnico';
import { traerInfoRPColumnFactorGeograficoAsync } from '../../../store/HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorGeograficdo';


//dependencias CSS
import './Metadata_Repitencia.css'
import { Malla } from '../../../models/facultades/facultad';

export default function PageTasaDeDesercionMetaData() {
    const id_escuela:number = useSelector(selectIdEscuela);
    const id_malla:number = useSelector(selectIdMalla);
    const mallas:Malla[] = useSelector(selectArrayMallas);
    const dispatch:any = useDispatch();

    React.useEffect(() => {
        dispatch(traerMallasPorIdEscuelaAsync(id_escuela))
        dispatch(traerInfoRPPieFactorEconomicoAsync(id_malla))
        dispatch(traerInfoRPColumnFactorEdnicoAsync(id_malla))
        dispatch(traerInfoRPColumnFactorGeograficoAsync(id_malla))
    }, []);

    return (
        <Box sx={{ minWidth: 275 }}>
            <div className='cardGridSelectRepitenciaMetaData'>
                <Card>
                    <CardContent className='selectContainer'>
                        {Select.CardSelectMalla(mallas)}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridUpRepitenciaMetaData'>
                <Card>
                    <CardContent>
                        {DashCardRPMetaDataComponent.DashCardPieFactorEconomico}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardRPMetaDataComponent.DashCardColumnFactorEtnico}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridDownRepitenciaMetaData'>
                <Card>
                    <CardContent>
                        {DashCardRPMetaDataComponent.DashCardColumnFactorGeografico}
                    </CardContent>
                </Card>
            </div>
        </Box >
    );
}
