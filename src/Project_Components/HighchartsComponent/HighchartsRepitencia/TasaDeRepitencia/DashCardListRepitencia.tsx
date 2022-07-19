import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, InputBase, IconButton, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import Highcharts from "highcharts";
import HcMore from "highcharts/highcharts-more";

//Dependencias
import { selectNameEscuela } from '../../../../store/MallaStore/EleccionMallaStore';
import { selectArrayAbreviaturasPeriodoRepitencia, selectArrayIndicesRepitencia } from '../../../../store/HighchartStore/DashboardRepitencia/TasaDeRepitencia/HighchartStoreRepitenciaGeneral';
import {
    selectArrayMateriasRepitencia, selectArrayMateriasSelectPeriodo,
    selectArrayPeriodosDeInteres
} from '../../../../store/HighchartStore/DashboardRepitencia/TasaDeRepitencia/HighchartStoreRepitenciaGeneral';
import { abreviaturasPeriodo, materiasMayorIncidencia } from '../../../../models/repitencia/dashboardRepitencia';
import HighchartSpaiderWebRepitencia from './HighchartSpaiderWebRepitencia';
import HighchartDialogSpaiderWebPeriodSubjects from './HighchartDialogSpaiderWebPeriodSubjects';

import HighchartDialogColumn from './HighchartDialogColumn'
import '../../../../css/ListTableStyle.css'
import Periodo from '../../../../models/facultades/periodo';



HcMore(Highcharts);

let viewRowsTable: materiasMayorIncidencia[] = [];
let ArrayMaterias: any = [];
let arrayDePeriodosSeleccionados:Periodo[] = [];
let nameEscuela:string = "";
let AbreviaturasPeriodoRepitencia:abreviaturasPeriodo[] = []
let ArrayDeIndicesDeRepitencia:number[] = []
let newOpcionGraphicRenderSelected:any = HighchartSpaiderWebRepitencia
let newOpcionGraphicRenderSelectedPeriodSubjects:any = HighchartDialogSpaiderWebPeriodSubjects
let newOpcionGraphicDialogColumn:any = HighchartDialogColumn
let cont: number = -1

export default function DataTable() {
    viewRowsTable = useSelector(selectArrayMateriasSelectPeriodo)
    arrayDePeriodosSeleccionados = useSelector(selectArrayPeriodosDeInteres)
    nameEscuela = useSelector(selectNameEscuela);
    ArrayMaterias = useSelector(selectArrayMateriasRepitencia);
    AbreviaturasPeriodoRepitencia = useSelector(selectArrayAbreviaturasPeriodoRepitencia)
    ArrayDeIndicesDeRepitencia = useSelector(selectArrayIndicesRepitencia)

    const [chexData, sendChexData] = useState<materiasMayorIncidencia[]>([])
    const [contador, setContador] = useState(0)

    const [RowsTable, setRows] = useState(viewRowsTable)
    const [Search, setSearch] = useState(false)

    const handleSelects = (data:materiasMayorIncidencia, checkedControl:boolean) => {
        let newArray = [];
        cont = -1

        if (!checkedControl) {
            newArray = chexData.filter((item:any) => item.id !== data.id);
            sendChexData(newArray);
            renderSelected(newArray)
            if (newArray.length > 2) {
                cont = newArray.length
                renderSelectedPeriodSubjects(newArray)
            }
            return
        }
        chexData.push(data);
        sendChexData(chexData);
        renderSelected(chexData)

        if (chexData.length > 2) {
            cont = chexData.length
            renderSelectedPeriodSubjects(chexData)
        }
    }

    const handleChexControl = (checked:boolean) => {
        if (checked) {

            setContador(contador + 1)
        } else {

            setContador(contador - 1)
        }
    }

    const requestSearch = (searchedVal:string) => {
        if (searchedVal.length == 0) {
            setSearch(false)
            return
        }
        const filteredRows = viewRowsTable.filter((row) => {
            return row.materia.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows)
        setSearch(true)
    };

    return (
        <TableContainer component={Paper}>
            <Box sx={{ display: 'flex' }}>
                <Typography
                    className='TableTitle'
                    component="div"
                >
                    {nameEscuela}
                </Typography>
                <TextField
                    sx={{ display: 'flex', width: 400 }}
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                    onChange={(e) => requestSearch(e.target.value)} />
            </Box>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ display: "flex" }}>
                    <TableRow
                        style={{ width: '100%', display: 'grid', gridTemplateColumns: '3rem auto 5rem 7rem 9rem' }}>
                        <TableCell style={{ content: " " }}></TableCell>
                        <TableCell className='rowTableMateria'>Materia</TableCell>
                        <TableCell className='rowTable' >Nivel</TableCell>
                        <TableCell className='rowTable' >Reprobados</TableCell>
                        <TableCell className='rowTable' >% INCIDENCIA</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ display: 'flex', flexDirection: 'column', overflow: 'auto', maxHeight: '350px' }}>
                    {
                        !Search ?
                            viewRowsTable.map((row:materiasMayorIncidencia) => (
                                <Fila
                                    key={row.id}
                                    row={row}
                                    handleSelects={handleSelects}
                                    handleChexControl={handleChexControl}
                                    contador={contador} />
                            ))
                            : RowsTable.map((row) => (
                                <Fila
                                    key={row.id}
                                    row={row}
                                    handleSelects={handleSelects}
                                    handleChexControl={handleChexControl}
                                    contador={contador} />
                            ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

}

const Fila = ({ row, handleSelects, handleChexControl, contador }:{row:materiasMayorIncidencia, handleSelects:any, handleChexControl:any, contador:number}) => {
    const [checked, setChecked] = useState<boolean>(false)

    const isDisabled = () => {
        if (!checked && contador == 6) {
            return true
        } else {
            return false
        }
    }

    return (
        <TableRow
            style={{ display: 'grid', gridTemplateColumns: '3rem auto 5rem 7rem 8rem', alignItems: 'center' }}
        >
            <TableCell className='rowTable' style={{ textAlign: 'center' }}>
                <Checkbox color="success" checked={checked} disabled={isDisabled()} onClick={() => handleSelects(row, !checked)} onChange={(e) => {
                    handleChexControl(e.target.checked)
                    setChecked(e.target.checked)
                }} />
            </TableCell>
            <TableCell className='rowTableMateria' >{row.materia}</TableCell>
            <TableCell className='rowTable' >{row.nivel}</TableCell>
            <TableCell className='rowTable' >{row.cantidad_perdidas}</TableCell>
            <TableCell className='rowTable' >{row.porcentaje_incidencia}</TableCell>
        </TableRow>
    )
}

const renderSelected = (data:any) => {
    newOpcionGraphicRenderSelected.xAxis.categories = []
    newOpcionGraphicRenderSelected.series[0].data = []
    data.map((selected:materiasMayorIncidencia) => {
        newOpcionGraphicRenderSelected.xAxis.categories.push(selected.materia);
        newOpcionGraphicRenderSelected.series[0].data.push({
            name: selected.materia,
            label: selected.materia,
            y: parseFloat(selected.porcentaje_incidencia),
        });
    })

    Highcharts.chart('SpaiderWebMateriasSelected', newOpcionGraphicRenderSelected)
}

const renderSelectedPeriodSubjects = (data:materiasMayorIncidencia[]) => {
    newOpcionGraphicRenderSelectedPeriodSubjects.xAxis.categories = []
    newOpcionGraphicRenderSelectedPeriodSubjects.series = []

    newOpcionGraphicDialogColumn.xAxis.categories = []
    newOpcionGraphicDialogColumn.series[0].data = []


    let materias_keys = Object.keys(ArrayMaterias);
    let arrayMateriasParaMostrar:any[] = [];

    //  recorremos las materias seleccionadas

    materias_keys.map((periodo, index) => {
        arrayMateriasParaMostrar.push({
            name: abreviaturaNombrePeriodo(index),
            data: [],
            pointPlacement: "on",
        });

        setTimeout(() => {
            data.map((elementoMateria) => {
                let elemento = ArrayMaterias[periodo].find(
                    (el:any) => el.id == elementoMateria.id
                );
                newOpcionGraphicRenderSelectedPeriodSubjects.xAxis.categories.push(
                    elementoMateria.materia
                );
                if (elemento != null) {
                    arrayMateriasParaMostrar[index].data.push({
                        name: elemento.materia,
                        y: parseFloat(elemento.porcentaje_incidencia),
                    });
                } else {
                    arrayMateriasParaMostrar[index].data.push({
                        name: elementoMateria.materia,
                        y: 0,
                    });
                }
            });
        }, 500)
    });
    newOpcionGraphicRenderSelectedPeriodSubjects.series =
        arrayMateriasParaMostrar;

    AbreviaturasPeriodoRepitencia.map((elemento) => {
        newOpcionGraphicDialogColumn.xAxis.categories.push(elemento.abreviatura)
    })
    newOpcionGraphicDialogColumn.series[0].data = ArrayDeIndicesDeRepitencia

    /* dispatch((newOpcionGraphicRenderSelectedPeriodSubjects))
    dispatch((newOpcionGraphicDialogColumn)) */
}

const abreviaturaNombrePeriodo = (indexPeriodo:number) => {
    let arrayValorSelectPeriodosOrdenadoJSON = JSON.stringify(arrayDePeriodosSeleccionados)
    let arrayValorSelectPeriodosOrdenado = JSON.parse(arrayValorSelectPeriodosOrdenadoJSON)
    arrayValorSelectPeriodosOrdenado.sort(
        function (a:any, b:any) {
            return a.id - b.id;
        }
    );

    return arrayValorSelectPeriodosOrdenado[indexPeriodo].abreviatura;

}

const renderHighchartGraphic = (Highcharts: any) => {
    setTimeout(() => {
        Highcharts.chart('DialogColumnPeriodSubjects', newOpcionGraphicDialogColumn)
        Highcharts.chart('SpaiderWebPeriodSubjects', newOpcionGraphicRenderSelectedPeriodSubjects)
    }, 200)
    return cont
}
export { renderHighchartGraphic }