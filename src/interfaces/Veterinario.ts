export interface Veterinario {
    veterinarioID:Number|null;
    nome:string;
    sobrenome:string;
    genero:string;
    cpf:string;
    cidade:string;
    uf:string;
    dataRegistro?:Date | null;
    crmvs: Crmv[];
}

export interface Crmv {
    crmvID: Number | null;
    numero: string;
    uf: string;
    area: string;
    dataRegistro: Date | null;
}