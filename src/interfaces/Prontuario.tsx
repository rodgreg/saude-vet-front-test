import { Pet } from "./Pet";
import { Veterinario } from "./Veterinario";

export interface Consulta {
    consultaID?:number;
    tipo?:string;
    dtRegistro?:Date;
    anamnese?:Anamnese;
    peso?:string;
    tamanho?:string;
    relatoResponsavel?:string;
    registroGeral?:string;
    petC?:Pet;
    veterinarioC?:Veterinario;    
}

export interface Anamnese {
    anamneseID?: number;
    dtRegistro?: Date;
    questoes: Questao[];
}

interface Questao {
    questaoID?:number;
    tipo?:string;
    label?:string;
    descricao?:string;
    options?:string[];
    resposta?:string;
}