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
    pet?:Pet|null;
    veterinario?:Veterinario;    
}

export interface Anamnese {
    templateID?: number;
    dtRegistro?: Date;
    titulo?:string;
    questoes: Questao[];
}

export interface Questao {
    tipo?:string;
    label?:string;
    descricao?:string;
    options?:string[];
    resposta?:string;
}