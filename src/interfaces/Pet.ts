import { Responsavel } from "./Responsavel";
import { Raca } from "./Util";

export interface Pet {
    petID:Number | null;
    nome:string;
    raca:Raca|null;
    cor:string;
    genero:string;
    nascimento:Date | null;
    pedigree:boolean;
    fertil:boolean;
    dataRegistro?:Date | null;
    imgPerfil?:string | null;
}

export interface Pet_Resp {
    pet:Pet;
    responsavel: Omit<Responsavel,"pets">;
  }