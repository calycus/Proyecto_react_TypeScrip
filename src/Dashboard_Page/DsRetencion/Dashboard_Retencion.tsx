import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

//componentes
import DashCardTasaDeRetencion from '../../Project_Components/ComponentsTasaRetencion/DashCardTsRetencionComponent';
import Select from '../../Project_Components/SelectComponent';

//store
import {
    selectIdEscuela, selectIdMalla
} from '../../store/MallaStore/EleccionMallaStore';
import { selectArrayMallas, traerMallasPorIdEscuelaAsync } from '../../store/MallaStore/Mallas';
import { traerInfoRetencionAsync } from '../../store/HighchartStore/DashboardRetencion/HighchartStoreRetencion'

//dependencias CSS
import './Dashboard_Retencion.css'
import { Malla } from '../../models/facultades/facultad';

export default function PageTasaDeRetencion() {
    const id_escuela:number = useSelector(selectIdEscuela);
    const id_malla:number = useSelector(selectIdMalla);
    const mallas:Malla[] = useSelector(selectArrayMallas);
    const dispatch:any = useDispatch();

    React.useEffect(() => {
        dispatch(traerMallasPorIdEscuelaAsync(id_escuela))
        dispatch(traerInfoRetencionAsync(id_malla))
    }, []);

    return (
        <Box sx={{ minWidth: 275 }}>
            <div className='cardGridSelectRetencion'>
                <Card>
                    <CardContent className='selectContainer'>
                        {Select.CardSelectMalla(mallas)}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridUpRetencion'>
                <Card>
                    <CardContent className='CardLineRetencion'>
                        {DashCardTasaDeRetencion.DashCardLineRetencion}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardTasaDeRetencion.DashCardCircularProgressRetencion}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridDownRetencion'>
                <Card>
                    <CardContent>
                        {DashCardTasaDeRetencion.DashCardGraduadosPorGenero}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardTasaDeRetencion.DashCardPrimeraMatricula}
                    </CardContent>
                </Card>
            </div>
        </Box >
    );
}
