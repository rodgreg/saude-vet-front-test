import { Pet } from "./Pet";
import { Vacina } from "./Util";
import { Veterinario } from "./Veterinario";

export interface Consulta {
    consultaID?:number;
    tipo?:string;
    dtRegistro?:Date;
    anamnese?:Anamnese;
    peso?:string;
    tamanho?:string;
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

export interface CartaoVacina {
    cartaoVacinaID?: number;
    pet:Pet | null;
    aplicacao: AplicacaoVacina[] | null;

}

export interface AplicacaoVacina {
    aplicacaoVacinaID?: number;
    vacina: Vacina;
    dataProgramada?: Date | null;
    dataAplicada?: Date | null;
    dosagem: string | null;
    veterinario?: Veterinario | null;
}