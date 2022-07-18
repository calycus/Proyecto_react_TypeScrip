import React, { useState, useEffect } from 'react';
//dependencias he importacion para el select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, OutlinedInput, Chip, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';


//store
import { selectNameEscuela, selectIdEscuela, selectIdMalla, setLocalIdMalla, setLocalNameEscuela } from '../store/MallaStore/EleccionMallaStore';
import { selectArrayMallas } from '../store/MallaStore/Mallas';
import { selectArrayPeriodos, traerPeriodosPorIdMallaAsync } from '../store/PeriodosStore/Periodos';
///DsGeneral
import { traerInfoGeneralAsync } from '../store/HighchartStore/DashboardGeneral/HighchartStoreGeneral'

///Retencion
import { traerInfoRetencionAsync } from '../store/HighchartStore/DashboardRetencion/HighchartStoreRetencion'
/*
///Repitencia
import { traerInfoRepitenciaAsync, setArrayPeriodosDeInteres } from '../store/HighchartStore/DashboardRepitencia/TasaDeRepitencia/HighchartStoreRepitenciaGeneral';
import { traerInfoRepitenciaColumnTopAsync } from '../store/HighchartStore/DashboardRepitencia/TasaDeRepitencia/HighchartStoreRepitenciaColumnTopMaterias';
////Repitencia => Repitencia Por Materia
import { traerInfoRepitenciaPorMateriasAsync } from '../store/HighchartStore/DashboardRepitencia/RepitenciaPorMateria/ListTableStoreRepitenciaPorMateria'
////Repitencia => MetaData
import { traerInfoRPPieFactorEconomicoAsync } from '../store/HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorEconomico';
import { traerInfoRPColumnFactorEdnicoAsync } from '../store/HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorEdnico';
import { traerInfoRPColumnFactorGeograficoAsync } from '../store/HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorGeograficdo';
*/
///Desercion
import { traerInfoLineDesertoresAsync } from '../store/HighchartStore/DashboardDesercion/TasaDeDesercion/HighchartDesercionGeneral'
import { traerInfoesercionGenerosEdadEmbarazoAsync } from '../store/HighchartStore/DashboardDesercion/TasaDeDesercion/HighchartDesercionGenerosEdadEmbarazo'
////Desercion => Prediccion
import { traerListaPosiblesDesertoresAsync } from '../store/HighchartStore/DashboardDesercion/Prediccion/ListTableStorePosiblesDesertores';
////Desercion => MetaData
import { traerInfoDSPieFactorEconomicoAsync } from '../store/HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorEconomico';
import { traerInfoDSColumnFactorEdnicoAsync } from '../store/HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorEdnico';
import { traerInfoDSColumnFactorGeograficoAsync } from '../store/HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorGeograficdo';


//dependencias CSS
import '../css/Select.css'
import '../css/GlobalCss.css'
import { Theme, useTheme } from '@mui/material/styles';
import { Malla } from '../models/facultades/facultad';
import Periodo from '../models/facultades/periodo';


//constantes globales
let nameMalla: string = "";
let newIdMalla: number = 0;
let idsPeriodos: string = "";
let theme: Theme;
let mallaAux: MallaAux = { idEscuela: 0, idMalla: 0 };
let ArrayPeriodos: Periodo[] = [];
let arrayDePeriodosSeleccionados: Periodo[] = [];
let Metodologia = [
    { Tipo: "Regresión Lineal", id: 1 }
]

//interfaces de datos
interface MallaAux {
    idEscuela: number,
    idMalla: number
}

interface Metodologia {
    Tipo: string,
    id: number
}


//funcion encargada de traer las los datos del store
function UseSelectAll() {
    const id_escuela: number = useSelector(selectIdEscuela);
    const id_malla: number = useSelector(selectIdMalla);
    const mallas: Malla[] = useSelector(selectArrayMallas);
    return {
        idEscuela: id_escuela,
        idMalla: id_malla
    }
}


//Funcion encargada de asignar un estilo nuevo a las opciones seleccionadas en el multi select
function getStyles(id: number, PeriodosDeInteres: Periodo[], theme: Theme) {
    return {
        fontWeight:
            PeriodosDeInteres.findIndex(elemento => elemento.id == id) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightBold,
    };
}


//funciones que devuelven los diferentes selects usados en el dashboard
function CardSelectMalla(props: Malla[]) {


    mallaAux = UseSelectAll();
    theme = useTheme();
    nameMalla = useSelector(selectNameEscuela);
    ArrayPeriodos = useSelector(selectArrayPeriodos);

    const DataMallas = props;
    const dispatch: any = useDispatch();
    const sampleLocation: any = useLocation();
    const [PeriodosDeInteres, setPeriodosDeInteres] = useState<Periodo[]>([]);
    const [PeriodoSelected, setPeriodoSelected] = useState<number>(-1);
    const ITEM_HEIGHT: number = 48;
    const ITEM_PADDING_TOP: number = 2;
    const MenuProps: any = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    //Constantes de tipo evento encargadas de supervisar lo que pasa con los diferentes selects
    const SelectMalla = (event: any) => {
        newIdMalla = event.target.value;
        let array = [] as Periodo[];
        let sendData = {
            newIdMalla: newIdMalla,
            dataMalla: DataMallas
        }
        dispatch(setLocalIdMalla(newIdMalla));
        dispatch(setLocalNameEscuela(sendData));

        dispatch(traerPeriodosPorIdMallaAsync(newIdMalla))
        setPeriodosDeInteres(array)
        SelectPeriodos();
    };
    const SelectMultiPeriodos = (event: any) => {
        arrayDePeriodosSeleccionados = event.target.value
        if (arrayDePeriodosSeleccionados.length > 4) {
            return
        } else {
            let ids = "";
            setPeriodosDeInteres(arrayDePeriodosSeleccionados);

            arrayDePeriodosSeleccionados.map((item: Periodo, index: number) => {
                if (index > 0) {
                    ids += ",";
                }
                ids += item.id.toString();
            });
            idsPeriodos = ids;
        }
    };

    const SelectPeriodo = (event: any) => {
        setPeriodoSelected(event);
    };

    //constante que devuelve un select con los periodes de interes
    function SelectPeriodos() {
        let SelectReturn = null;
        if (sampleLocation.pathname == "/tasa_repitencia") {
            SelectReturn = (
                <FormControl sx={{ m: 1, minWidth: 500, maxWidth: 700 }} size="small">
                    <InputLabel id="demo-multiple-chip-label">Seleccionar Periodos</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={PeriodosDeInteres}
                        onChange={SelectMultiPeriodos}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value.id} label={value.abreviatura} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {ArrayPeriodos.map((periodos:Periodo) => (
                            <MenuItem
                                key={periodos.id}
                                value={periodos.id}
                                style={getStyles(periodos.id, PeriodosDeInteres, theme)}
                            >
                                {periodos.abreviatura}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        } else if (sampleLocation.pathname == "/tasa_repitencia_por_materia") {
            SelectReturn = (
                <FormControl sx={{ m: 1, minWidth: 500, maxWidth: 700 }} size="small">
                    <InputLabel id="demo-simple-select-label">Seleccionar Periodo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={PeriodoSelected}
                        onChange={(e) => SelectPeriodo(e.target.value)}
                        input={<OutlinedInput id="select-simple-chip" label="Chip" />}
                        MenuProps={MenuProps}
                    >
                        {ArrayPeriodos.map((periodos:Periodo) => (
                            <MenuItem
                                key={periodos.id}
                                value={periodos.id}
                                style={getStyles(periodos.id, PeriodosDeInteres, theme)}
                            >
                                {periodos.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        } else if (sampleLocation.pathname == "/tasa_desercion_prediccion") {
            SelectReturn = (
                <FormControl sx={{ m: 1, minWidth: 300, maxWidth: 500 }} size="small">
                    <InputLabel id="demo-simple-select-label">Metodología</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={PeriodoSelected}
                        onChange={(e) => SelectPeriodo(e.target.value)}
                        input={<OutlinedInput id="select-simple-chip" label="Chip" />}
                        MenuProps={MenuProps}
                    >
                        {Metodologia.map((metodologia:Metodologia) => (
                            <MenuItem
                                key={metodologia.id}
                                value={metodologia.id}
                                style={getStyles(metodologia.id, PeriodosDeInteres, theme)}
                            >
                                {metodologia.Tipo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        }
        return SelectReturn
    }


    return (
        <React.Fragment>
            <FormControl sx={{ m: 1 }} size="small">
                <InputLabel id="demo-select-small">Seleccionar Malla</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    defaultValue={mallaAux.idMalla}
                    label="id"
                    onChange={SelectMalla}
                >
                    {props.map((malla, index) => <MenuItem key={malla.id} value={malla.id}>{
                        malla.nombre
                    }</MenuItem>)}
                </Select>
            </FormControl>
            {SelectPeriodos()}
            <IconButton aria-label="search" size='large' onClick={() => {
                SearchButton({ dispatch, sampleLocation, PeriodosDeInteres, PeriodoSelected })
            }}>
                <SearchIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />
            </IconButton>
        </React.Fragment>
    )
};

export default {
    CardSelectMalla,
}

const SearchButton = ({ dispatch, sampleLocation, PeriodosDeInteres, PeriodoSelected }:
    { dispatch: any, sampleLocation: any, PeriodosDeInteres: Periodo[], PeriodoSelected: number }) => {
    if (sampleLocation.pathname == "/general") {
        dispatch(traerInfoGeneralAsync(mallaAux.idMalla))

    } else if (sampleLocation.pathname == "/tasa_retencion") {
        dispatch(traerInfoRetencionAsync(mallaAux.idMalla))

    } /* else if (sampleLocation.pathname == "/tasa_repitencia") {
        if (PeriodosDeInteres.length == 0) {
            return
        } else {
            dispatch(traerInfoRepitenciaAsync(mallaAux.idMalla, idsPeriodos))
            dispatch(traerInfoRepitenciaColumnTopAsync(mallaAux.idMalla))
            dispatch(setArrayPeriodosDeInteres(arrayDePeriodosSeleccionados))
        }

    } else if (sampleLocation.pathname == "/tasa_repitencia_por_materia") {
        if (PeriodoSelected.length == "") {
            return
        } else {
            dispatch(traerInfoRepitenciaPorMateriasAsync(mallaAux.idMalla, PeriodoSelected.id))
        }
    } else if (sampleLocation.pathname == "/tasa_repitencia_metadata") {
        dispatch(traerInfoRPPieFactorEconomicoAsync(mallaAux.idMalla))
        dispatch(traerInfoRPColumnFactorEdnicoAsync(mallaAux.idMalla))
        dispatch(traerInfoRPColumnFactorGeograficoAsync(mallaAux.idMalla))

    }*/ else if (sampleLocation.pathname == "/tasa_desercion") {
        dispatch(traerInfoLineDesertoresAsync(mallaAux.idMalla))
        dispatch(traerInfoesercionGenerosEdadEmbarazoAsync(mallaAux.idMalla))

    } else if (sampleLocation.pathname == "/tasa_desercion_prediccion") {
        if (PeriodoSelected == -1) {
            return
        } else {
            dispatch(traerListaPosiblesDesertoresAsync(mallaAux.idMalla, PeriodoSelected))
        }
    } else if (sampleLocation.pathname == "/tasa_desercion_metadata") {
        dispatch(traerInfoDSPieFactorEconomicoAsync(mallaAux.idMalla))
        dispatch(traerInfoDSColumnFactorEdnicoAsync(mallaAux.idMalla))
        dispatch(traerInfoDSColumnFactorGeograficoAsync(mallaAux.idMalla))

    }
    return
}