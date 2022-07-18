import { configureStore } from '@reduxjs/toolkit'
import ArrayMallasReducer from './MallaStore/Mallas'
import ArrayFacultadesReducer from './MallaStore/EleccionMallaStore'
import ArrayPeriodosPorIdMalla from './PeriodosStore/Periodos'

//store Highchart General
import HighchartLineGeneral from './HighchartStore/DashboardGeneral/HighchartStoreGeneral'
import PieFenomenosGeneral from './HighchartStore/DashboardGeneral/HighchartFenomenos'

//store Highchart DS Retencion
import HighchartRetencion from './HighchartStore/DashboardRetencion/HighchartStoreRetencion'
/* 
//store Highchart DS Repitencia
import HighchartRepitencia from './HighchartStore/DashboardRepitencia/TasaDeRepitencia/HighchartStoreRepitenciaGeneral'
import HighchartRepitenciaColumnTop from './HighchartStore/DashboardRepitencia/TasaDeRepitencia/HighchartStoreRepitenciaColumnTopMaterias'
////store Highchart DS Repitencia => Repitencia Por Materia
import ListTableRepitenciaPorMateria from './HighchartStore/DashboardRepitencia/RepitenciaPorMateria/ListTableStoreRepitenciaPorMateria'
import HighchartStoreRepitenciaPorMateria from './HighchartStore/DashboardRepitencia/RepitenciaPorMateria/HighchartStoreRepitenciaPorMateria'
////store Highchart DS Repitencia => Metadata
import HighchartRepitenciaFactorEconomico from './HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorEconomico'
import HighchartRepitenciaFactorEdnico from './HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorEdnico'
import HighchartRepitenciaFactorGeografico from './HighchartStore/DashboardRepitencia/MetaData/HighchartRepitenciaFactorGeograficdo'
 */
//store Highchart DS Desercion
import HighchartDesercionGeneral from './HighchartStore/DashboardDesercion/TasaDeDesercion/HighchartDesercionGeneral'
import HighchartDesercionGenerosEdadEmbarazo from './HighchartStore/DashboardDesercion/TasaDeDesercion/HighchartDesercionGenerosEdadEmbarazo'
////store Highchart DS Desercion => Prediccion
import ListTableEstudiantesPrediccion from './HighchartStore/DashboardDesercion/Prediccion/ListTableStorePosiblesDesertores'
import HighchartStoreInfoPrediccionDesercion from './HighchartStore/DashboardDesercion/Prediccion/HighchartStoreInfoPrediccionDesercion'
////store Highchart DS Desercion => Metadata
import HighchartDesercionFactorEconomico from './HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorEconomico'
import HighchartDesercionFactorEdnico from './HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorEdnico'
import HighchartDesercionFactorGeografico from './HighchartStore/DashboardDesercion/MetaData/HighchartDesercionFactorGeograficdo'

export default configureStore({
  reducer: {
    arrayMallas: ArrayMallasReducer,
    arrayFacultades: ArrayFacultadesReducer,
    arrayPeriodos: ArrayPeriodosPorIdMalla,

    //store Highchart DS General
    HighchartLineGeneral: HighchartLineGeneral,
    PieFenomenosGeneral: PieFenomenosGeneral,

    //store Highchart DS Retencion
    HighchartRetencion: HighchartRetencion,
    /*
      //store Highchart DS Repitencia
      HighchartRepitencia: HighchartRepitencia,
      HighchartRepitenciaColumnTop: HighchartRepitenciaColumnTop,
      ////store Highchart DS Repitencia => Repitencia Por Materia
      ListTableRepitenciaPorMateria: ListTableRepitenciaPorMateria,
      HighchartStoreRepitenciaPorMateria: HighchartStoreRepitenciaPorMateria,
      ////store Highchart DS Repitencia => Metadata
      HighchartRepitenciaFactorEconomico: HighchartRepitenciaFactorEconomico,
      HighchartRepitenciaFactorEdnico: HighchartRepitenciaFactorEdnico,
      HighchartRepitenciaFactorGeografico: HighchartRepitenciaFactorGeografico,
   */
    //store Highchart DS Desercion
    HighchartDesercionGeneral: HighchartDesercionGeneral,
    HighchartDesercionGenerosEdadEmbarazo: HighchartDesercionGenerosEdadEmbarazo,
    ////store Highchart DS Desercion => Prediccion
    ListTableEstudiantesPrediccion: ListTableEstudiantesPrediccion,
    HighchartStoreInfoPrediccionDesercion: HighchartStoreInfoPrediccionDesercion,
    ////store Highchart DS Desercion => Metadata
    HighchartDesercionFactorEconomico: HighchartDesercionFactorEconomico,
    HighchartDesercionFactorEdnico: HighchartDesercionFactorEdnico,
    HighchartDesercionFactorGeografico: HighchartDesercionFactorGeografico
  },
})