import React from 'react'
import { styled } from '@mui/material/styles';
import { GroupAdd, HowToReg, School } from '@mui/icons-material';
import { selectColumnGraduadosPorGenero } from '../../store/HighchartStore/DashboardRetencion/HighchartStoreRetencion'
import { CircularProgress, Typography, Box, LinearProgress, linearProgressClasses, Stack, Button } from '@mui/material'

//dependencia
import { useSelector } from 'react-redux'
import './CardIndiceDeRetencionPorMalla.css'
import { padding } from '@mui/system';
import { ColumnGraduadosPorGenero } from '../../models/dashboardRetencion';

export default function CardIndiceDeRetencionPorMalla() {
    const preData:ColumnGraduadosPorGenero = useSelector(selectColumnGraduadosPorGenero);

    const BorderLinearTotInscritos:any = styled(LinearProgress)(({ theme }) => ({
        height: 30,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#21BA45' : '#21BA45',
        },
    }));
    const BorderLinearTotConservados:any = styled(LinearProgress)(({ theme }) => ({
        height: 30,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#26a69a' : '#26a69a',
        },
    }));
    const BorderLinearTotGraduados:any = styled(LinearProgress)(({ theme }) => ({
        height: 30,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#00bcd4' : '#00bcd4',
        },
    }));

    let totEstudiantesRetenidos = preData.totalDeEstudiantesRetenidos
    let totalDeEstudiantesGradudados = preData.totalDeEstudiantesGradudados

    return (
        <div className='cardIndiceDeRetencionPorMalla'>
            <Box position="relative" display="inline-flex" className='BoxContentsCircularProgress'>
                <CircularProgress thickness={4.5} style={{ color: "#00bcd4" }} variant="determinate" value={preData.promedioGeneral} size={125} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography style={{ color: "#00bcd4", fontSize: "2rem" }}>
                        {preData.promedioGeneral}%
                    </Typography>
                </Box>
            </Box>
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>

                <Button className='ButtonIndiceDeRetencion' style={{ color: '#21BA45' }}>
                    <GroupAdd style={{ color: '#21BA45', paddingRight: '0.6rem', paddingLeft: '0.5rem' }} sx={{ fontSize: 25 }} />
                    <Typography className='ButtonTextIndiceDeRetencion'>Tot. Inscritos</Typography>
                </Button>
                <Box position="relative" display="inline-block">
                    <BorderLinearTotInscritos variant="buffer" value={100} />
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div className='BorderLinearTextContents'>
                            {preData.totalDeEstudiantesInscritos}
                        </div>
                    </Box>
                </Box>

                <Button className='ButtonIndiceDeRetencion' style={{ color: '#26a69a' }}>
                    <HowToReg style={{ color: '#26a69a', paddingRight: '0.6rem', paddingLeft: '0.5rem' }} sx={{ fontSize: 25 }} />
                    <Typography className='ButtonTextIndiceDeRetencion'>Tot. Conservados</Typography>
                </Button>
                <Box position="relative" display="inline-block">
                    <BorderLinearTotConservados variant="determinate" value={totEstudiantesRetenidos} />
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div className='BorderLinearTextContents'>
                            {totEstudiantesRetenidos}%
                        </div>
                    </Box>
                </Box>
                <Button className='ButtonIndiceDeRetencion' style={{ color: '#00bcd4' }}>
                    <School style={{ color: '#00bcd4', paddingRight: '0.6rem', paddingLeft: '0.5rem' }} sx={{ fontSize: 25 }} />
                    <Typography className='ButtonTextIndiceDeRetencion'>Tot. Graduados</Typography>
                </Button>
                <Box position="relative" display="inline-block">
                    <BorderLinearTotGraduados variant="determinate" value={totalDeEstudiantesGradudados} />
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div className='BorderLinearTextContents'>
                            {totalDeEstudiantesGradudados}%
                        </div>
                    </Box>
                </Box>
            </Stack>
        </div>
    );

}