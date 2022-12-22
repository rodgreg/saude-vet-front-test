import { Responsavel } from "./Responsavel";

export interface Pet {
    petID:Number | null;
    nome:String;
    especie:String;
    raca:String;
    cor:String;
    genero:String;
    nascimento:Date | null;
    pedigree:boolean;
    fertil:boolean;
    dataRegistro?:Date | null;
}

export interface Pet_Resp {
    pet:Pet;
    responsavel: Omit<Responsavel,"pets">;
  }