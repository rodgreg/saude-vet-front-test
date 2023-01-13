export interface Especie {
    especieID?:number|null;
    nome:string;
    caracteristica?:string;
    dataRegistro?:Date|null;
}

export interface Raca {
    racaID?:number|null;
    nome:string;
    especie:Especie;
    dataRegistro?:Date|null;
}

export interface Medicamento {
    medicamentoID?:number|null;
    nome:string;
    descricao:string;
    posologia:string;
    indicacao:string;
    dataRegistro?:Date|null;
}

export interface Patologia {
    patologiaID:number|null;
    nome:string;
    codigo:string;
    descricao:string;
    dataRegistro?:Date|null;
}