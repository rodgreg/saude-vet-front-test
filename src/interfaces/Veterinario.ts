export interface Veterinario {
    veterinarioID:Number|null;
    nome:String;
    sobrenome:String;
    genero:String;
    cpf:String;
    cidade:String;
    uf:String;
    dataRegistro?:Date | null;
    crmvs: Crmv[];
}

export interface Crmv {
    crmvID: Number | null;
    numero: String;
    uf: String;
    area: String;
    dataRegistro: Date | null;
}