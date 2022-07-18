import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, TextField } from '@mui/material';
import Highcharts from "highcharts";
import HcMore from "highcharts/highcharts-more";

//Dependencias
import { selectArrayDataEstudiantesEnRiesgo } from '../../../../store/HighchartStore/DashboardDesercion/Prediccion/ListTableStorePosiblesDesertores';
import { selectIdMalla } from '../../../../store/MallaStore/EleccionMallaStore';
import { traerInfoEstudiantesDesertoresAsync, traerInfoTrayectoriaEstudiantesAsync } from '../../../../store/HighchartStore/DashboardDesercion/Prediccion/HighchartStoreInfoPrediccionDesercion';
import '../../../../css/ListTableStyle.css'


HcMore(Highcharts);

let viewRowsTable = [];
let idMalla = null

export default function SubjectDataTable() {
    viewRowsTable = useSelector(selectArrayDataEstudiantesEnRiesgo)
    idMalla = useSelector(selectIdMalla)

    const dispatch = useDispatch();
    const [RowsTable, setRows] = useState([])
    const [Search, setSearch] = useState(false)
    const [checked, setChecked] = useState(-1);

    const handleSelects = (data) => {
        dispatch(traerInfoEstudiantesDesertoresAsync(idMalla, data.cedula))
        dispatch(traerInfoTrayectoriaEstudiantesAsync(idMalla, data.cedula))
    }

    const requestSearch = (searchedVal) => {
        if (searchedVal.length == 0) {
            setSearch(false)
            return
        }
        const filteredRows = viewRowsTable.filter((row) => {
            return row.nombre.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows)
        setSearch(true)
    };

    const isDisabled = (data) => {
        setChecked(data);
    };

    return (
        <TableContainer component={Paper}>
            <Box sx={{ display: 'flex', alignItems: "flex-end" }}>
                <Typography
                    className='TableTitleRepitenciaPorMateria'
                    component="div"
                >
                    POTENCIALES DESERTORES
                </Typography>
                <TextField
                    sx={{ display: 'flex', width: 250 }}
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                    onChange={(e) => requestSearch(e.target.value)} />
            </Box>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead style={{ display: "flex" }}>
                    <TableRow
                        style={{ width: '100%', display: 'grid', gridTemplateColumns: '3rem auto 7rem 2rem' }}>
                        <TableCell style={{ content: " " }}></TableCell>
                        <TableCell className='rowTableMateria'>Nombre Del Estudiante</TableCell>
                        <TableCell className='rowTable' >Nivel</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ display: 'flex', flexDirection: 'column', overflow: 'auto', maxHeight: '350px' }}>
                    {!Search ?
                        viewRowsTable.map((row, index) => (
                            <Fila
                                key={index}
                                index={index}
                                row={row}
                                checked={checked}
                                handleSelects={handleSelects}
                                isDisabled={isDisabled}
                            />
                        ))
                        : RowsTable.map((row, index) => (
                            <Fila
                                key={index}
                                index={index}
                                row={row}
                                checked={checked}
                                handleSelects={handleSelects}
                                isDisabled={isDisabled}
                            />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const Fila = ({ row, handleSelects, isDisabled, index, checked }) => {
    return (
        <TableRow
            style={{ display: 'grid', gridTemplateColumns: '3rem auto 7rem 1rem', alignItems: 'center' }}
        >
            <TableCell className='rowTable' style={{ textAlign: 'center' }}>
                <Checkbox
                    color="success"
                    checked={checked == index}
                    onChange={(e) => isDisabled(e.target.value)}
                    onClick={() => handleSelects(row)}
                    value={index}
                />
            </TableCell>
            <TableCell className='rowTableMateria' >{row.nombre}</TableCell>
            <TableCell className='rowTable' >{row.nivel}</TableCell>
        </TableRow>
    )
}