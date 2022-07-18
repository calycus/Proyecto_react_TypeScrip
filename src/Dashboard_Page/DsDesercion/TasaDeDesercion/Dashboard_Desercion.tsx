import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

//componentes
import DashCardTasaDeDesercion from '../../../Project_Components/ComponentsTasaDesercion/TasaDeDesercion/DashCardTsDesercionComponent';
import Select from '../../../Project_Components/SelectComponent';

//store
import {
    selectIdEscuela, selectIdMalla
} from '../../../store/MallaStore/EleccionMallaStore';
import { selectArrayMallas, traerMallasPorIdEscuelaAsync } from '../../../store/MallaStore/Mallas';
import { traerInfoLineDesertoresAsync } from '../../../store/HighchartStore/DashboardDesercion/TasaDeDesercion/HighchartDesercionGeneral'
import { traerInfoesercionGenerosEdadEmbarazoAsync } from '../../../store/HighchartStore/DashboardDesercion/TasaDeDesercion/HighchartDesercionGenerosEdadEmbarazo'

//dependencias CSS
import './Dashboard_Desercion.css'
import { Malla } from '../../../models/facultades/facultad';

export default function PageTasaDeDesercion() {
    const id_escuela:number = useSelector(selectIdEscuela);
    const id_malla:number = useSelector(selectIdMalla);
    const mallas:Malla[] = useSelector(selectArrayMallas);
    const dispatch:any = useDispatch();

    React.useEffect(() => {
        dispatch(traerMallasPorIdEscuelaAsync(id_escuela))
        dispatch(traerInfoLineDesertoresAsync(id_malla))
        dispatch(traerInfoesercionGenerosEdadEmbarazoAsync(id_malla))
    }, []);

    return (
        <Box sx={{ minWidth: 275 }}>
            <div className='cardGridSelectDesercion'>
                <Card>
                    <CardContent className='selectContainer'>
                        {Select.CardSelectMalla(mallas)}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridUpDesercion'>
                <Card>
                    <CardContent>
                        {DashCardTasaDeDesercion.DashCardLineDesercion}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardTasaDeDesercion.DashCardCircularProgressDesercion}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridDownDesercion'>
                <Card>
                    <CardContent>
                        {DashCardTasaDeDesercion.DashCardDesercionPorMaternidad}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardTasaDeDesercion.DashCardDesercionPorRangoDeEdad}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardTasaDeDesercion.DashCardDesercionPorGenero}
                    </CardContent>
                </Card>
            </div>
        </Box >
    );
}
