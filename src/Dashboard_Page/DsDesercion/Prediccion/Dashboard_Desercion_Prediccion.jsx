import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

//componentes
import Select from '../../../Project_Components/SelectComponent';
import DashCardDsPrediccion from '../../../Project_Components/ComponentsTasaDesercion/Prediccion/DashCardDsPrediccionDesercionComponent'
import { selectArrayMallas, traerMallasPorIdEscuelaAsync } from '../../../store/MallaStore/Mallas';
import { selectIdEscuela } from '../../../store/MallaStore/EleccionMallaStore';
//dependencias CSS
import './Dashboard_Desercion_Prediccion.css'

export default function PageTasaDeDesercion() {
    const mallas = useSelector(selectArrayMallas);
    const id_escuela = useSelector(selectIdEscuela);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(traerMallasPorIdEscuelaAsync(id_escuela))

    }, []);
    return (
        <Box sx={{ minWidth: 275 }}>
            <div className='cardGridSelectDesercion_Prediccion'>
                <Card>
                    <CardContent className='selectContainer'>
                        {Select.CardSelectMalla(mallas)}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridUpDesercion_Prediccion'>
                <Card>
                    <CardContent>
                        {DashCardDsPrediccion.CardInfoEstudiante()}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardDsPrediccion.DashCardColumnTendenciaDelEstuainte()}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {DashCardDsPrediccion.CardTableListEstudianteEnRiesgo()}
                    </CardContent>
                </Card>
            </div>
            <div className='cardGridDownDesercion_Prediccion'>
                <Card style={{ maxHeight: '27rem' }}>
                    <CardContent>
                        {DashCardDsPrediccion.DashCardLineTrayectoriaEstudiantil()}
                    </CardContent>
                </Card>
                <Card style={{ maxHeight: '27rem' }}>
                    <CardContent>
                        {DashCardDsPrediccion.CardTableListMateriasEstudiante()}
                    </CardContent>
                </Card>
            </div>
        </Box >
    );
}
