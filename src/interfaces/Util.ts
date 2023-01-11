export interface Especie {
    especieID?:number;
    nome:string;
    caracteristica?:string;
    dataRegistro?:Date;
}

export interface Raca {
    racaID?:number;
    nome:string;
    especie:Especie;
    dataRegistro?:Date;
}

export interface Medicamento {
    medicamentoID?:number;
    nome:string;
    descricao:string;
    posologia:string;
    indicacao:string;
    dataRegistro?:Date;
}

export interface Patologia {
    patologiaID:number;
    nome:string;
    codigo:string;
    descricao:string;
    dataRegistro?:Date;
}