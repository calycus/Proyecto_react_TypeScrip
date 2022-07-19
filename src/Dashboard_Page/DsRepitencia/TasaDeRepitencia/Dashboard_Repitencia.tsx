import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

//componentes
import DashCardTasaDeRepitencia from '../../../Project_Components/ComponentsTasaRepitencia/TasaDeRepitencia/DashCardTsRepitenciaComponent';
import Select from '../../../Project_Components/SelectComponent';
import DialogMateriasSelectedRepitencia from '../../../Project_Components/ComponentsTasaRepitencia/TasaDeRepitencia/DashcardRepitenciaDialogMateriasSelected'
//store
import {
    selectIdEscuela, selectIdMalla
} from '../../../store/MallaStore/EleccionMallaStore';
import { selectArrayMallas, traerMallasPorIdEscuelaAsync } from '../../../store/MallaStore/Mallas';
import { traerPeriodosPorIdMallaAsync } from '../../../store/PeriodosStore/Periodos';

//dependencias CSS
import './Dashboard_Repitencia.css'
import { Malla } from '../../../models/facultades/facultad';

export default function PageTasaDeRepitencia() {
    const id_escuela:number = useSelector(selectIdEscuela);
    const id_malla:number = useSelector(selectIdMalla);
    const mallas:Malla[] = useSelector(selectArrayMallas);
    const dispatch:any = useDispatch();

    React.useEffect(() => {
        dispatch(traerMallasPorIdEscuelaAsync(id_escuela))
        dispatch(traerPeriodosPorIdMallaAsync(id_malla))
    }, []);

    return (
        
        <Box sx={{ minWidth: 275 }}>
            <div className='cardGridSelectRepitencia'>
                <Card>
                    <CardContent className='selectContainer'>
                        {Select.CardSelectMalla(mallas)}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridUpRepitencia'>
                <Card>
                    <CardContent>
                        {DashCardTasaDeRepitencia.DashCardListRepitencia()}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardTasaDeRepitencia.DashCardSpaiderWeb()}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridDownRepitencia'>
                <Card>
                    <CardContent>
                        {DashCardTasaDeRepitencia.DashCardColumnComparativo()}
                    </CardContent>
                </Card>
            </div>
        </Box >
    );
}
