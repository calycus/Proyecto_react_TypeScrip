import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

//componentes
import DashCardTasaDeDesercionMetaData from '../../../Project_Components/ComponentsTasaDesercion/MetaData/DashCardDSMetaDataComponent';
import Select from '../../../Project_Components/SelectComponent';

//store
import {
    selectIdEscuela, selectIdMalla
} from '../../../store/MallaStore/EleccionMallaStore';
import { selectArrayMallas, traerMallasPorIdEscuelaAsync } from '../../../store/MallaStore/Mallas';
import { traerInfoDSPieFactorEconomicoAsync } from '../../../store/HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorEconomico';
import { traerInfoDSColumnFactorEdnicoAsync } from '../../../store/HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorEdnico';
import { traerInfoDSColumnFactorGeograficoAsync } from '../../../store/HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorGeograficdo';
//dependencias CSS
import './Metadata_Desercion.css'

export default function PageTasaDeDesercionMetaData() {
    const id_escuela = useSelector(selectIdEscuela);
    const id_malla = useSelector(selectIdMalla);
    const mallas = useSelector(selectArrayMallas);
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        dispatch(traerMallasPorIdEscuelaAsync(id_escuela))
        dispatch(traerInfoDSPieFactorEconomicoAsync(id_malla))
        dispatch(traerInfoDSColumnFactorGeograficoAsync(id_malla))
        dispatch(traerInfoDSColumnFactorEdnicoAsync(id_malla))
    }, []);

    return (
        <Box sx={{ minWidth: 275 }}>
            <div className='cardGridSelectDesercionMetaData'>
                <Card>
                    <CardContent className='selectContainer'>
                        {Select.CardSelectMalla(mallas)}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridUpDesercionMetaData'>
                <Card>
                    <CardContent>
                        {DashCardTasaDeDesercionMetaData.DashCardPieFactorEconomico}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardTasaDeDesercionMetaData.DashCardColumnFactorEtnico}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridDownDesercionMetaData'>
                <Card>
                    <CardContent>
                        {DashCardTasaDeDesercionMetaData.DashCardColumnFactorGeografico}
                    </CardContent>
                </Card>
            </div>
        </Box >
    );
}
