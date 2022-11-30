export interface Veterinario {
    veterinarioID:Number;
    nome:String;
    sobrenome:String;
    genero:String;
    cpf:String;
    cidade:String;
    uf:String;
    crmvs: crmv[];
}

interface crmv {
    crmvID: Number;
    numero: String;
    uf: String;
    area: String;
    dataRegistro: Date;
}