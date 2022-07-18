import React from 'react';
import {  useSelector } from 'react-redux';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider } from '@mui/material';

//Dependencias
import { selectArrayMateriaSuspendidas } from '../../../../store/HighchartStore/DashboardDesercion/Prediccion/HighchartStoreInfoPrediccionDesercion';
import '../../../../css/ListTableStyle.css'


let viewRowsTable = [];

export default function SubjectDataTable() {
    viewRowsTable = useSelector(selectArrayMateriaSuspendidas)
    console.log(viewRowsTable);
    return (
        <TableContainer component={Paper}>
            <Box sx={{ display: 'flex', alignItems: "flex-end" }}>
                <Typography
                    className='TableTitleListMateriasSuspendidas'
                    component="div"
                >
                    TABLA DE MATERIAS SUSPENDIDAS
                </Typography>
            </Box>
            
            <Divider/>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead style={{ display: "flex" }}>
                    <TableRow
                        style={{ width: '100%', display: 'grid', gridTemplateColumns: 'auto 7rem 1rem' }}>
                        <TableCell className='rowTableMateria'>Materia</TableCell>
                        <TableCell className='rowTable' >Nivel</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ display: 'flex', flexDirection: 'column', overflow: 'auto', maxHeight: '350px' }}>
                    {
                        viewRowsTable.map((row, index) => (
                            <Fila
                                key={index}
                                row={row}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const Fila = ({ row}) => {
    return (
        <TableRow
            style={{ display: 'grid', gridTemplateColumns: 'auto 7rem 1rem', alignItems: 'center' }}
        >
            <TableCell className='rowTableMateria' >{row.materia}</TableCell>
            <TableCell className='rowTable' >{row.nivel}</TableCell>
        </TableRow>
    )
}