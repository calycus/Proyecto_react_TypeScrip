/* ListadoPotencialesDesertores */
export interface ListadoPotencialesDesertores {
    cedula: number,
    nombre: string,
    nivel: number,
    porc_desertar: number,
    porc_continuar: number,
    porc_medio: number,
    tot_inscripciones: number,
    tot_incripciones_reprobadas: number
}


/* array_Info_Estudiantes_En_Riesgo */
export interface ArrayInfoEstudiantesEnRiesgo {
    cedula: number,
    edad: number,
    estado_actual: string
    genero: string,
    mail_intitucional: string,
    mail_personal: string,
    nombres: string,
    residencia: string,
    telefonos: string[],
}


/* array_Tracyectoria_Academica_Del_Estudiante */
export interface seriesTrayectoriaAcademica {
    y:number
}

/* array_materias_reprobadas */
export interface arrayMateriasReprobadas {
    materia: string,
    nivel: number,
}
