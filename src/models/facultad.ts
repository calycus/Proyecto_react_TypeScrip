
export interface Malla {
    id: number,
    nombre: string
}

export interface Escuela {
    id: number,
    nombre: string,
    mallas: Malla[]
}

export interface Facultad {
    id: number,
    nombre: string,
    fac_expandida: boolean
    escuelas: Escuela[]
}

