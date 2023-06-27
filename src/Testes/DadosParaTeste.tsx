import { Veterinario, Crmv } from "../interfaces/Veterinario"
import { CartaoVacina, AplicacaoVacina } from "../interfaces/Prontuario"
import { Especie, Raca, Vacina } from "../interfaces/Util"
import { Pet } from "../interfaces/Pet"

var now = new Date
const CRMVtemp1: Crmv = {
    crmvID: 1,
    numero: "2565",
    uf: "DF",
    area:"Clínica de Grandes Animais",
    dataRegistro: now
    }

const VeterinarioTmp1: Veterinario = {
    veterinarioID:1,
    nome:"Rodrigo",
    sobrenome:"Gregorio Botelho",
    genero:"Masculino",
    cpf:"704.133.121-00",
    cidade:"Brasília",
    uf:"DF",
    dataRegistro: now,
    crmvs:[CRMVtemp1],
    }

const CRMVtemp2: Crmv = {
    crmvID: 1,
    numero: "5555",
    uf: "DF",
    area:"Clínica de Pequenos Animais",
    dataRegistro: now
    }
    
const VeterinarioTmp2: Veterinario = {
    veterinarioID:2,
    nome:"Marina",
    sobrenome:"Fleury",
    genero:"Feminino",
    cpf:"123.456.789-00",
    cidade:"Brasília",
    uf:"DF",
    dataRegistro: now,
    crmvs:[CRMVtemp2],
    }

const CRMVtemp3: Crmv = {
    crmvID: 3,
    numero: "3333",
    uf: "DF",
    area:"Clínica e Cirurgia de Pequenos Animais",
    dataRegistro: now
    }
    
const VeterinarioTmp3: Veterinario = {
    veterinarioID:3,
    nome:"Paula",
    sobrenome:"Dutra",
    genero:"Feminino",
    cpf:"111.222.333-00",
    cidade:"Brasília",
    uf:"DF",
    dataRegistro: now,
    crmvs:[CRMVtemp3],
    }

export const listVeterinarioTmpTeste = [VeterinarioTmp1, VeterinarioTmp2,VeterinarioTmp3]

const especie1:Especie = {
    especieID:1,
    nome:"Canina",
    caracteristica:"Onívora",
    dataRegistro:now
}
const raca1:Raca = {
    racaID:1,
    nome:"Yorkshire Terrier",
    especie:especie1,
    dataRegistro:now
}
const pet1:Pet = {
    petID:1,
    nome:"Antonieta",
    raca:raca1,
    cor:"Preta",
    genero:"Fêmea",
    nascimento:now,
    pedigree:true,
    fertil:true,
    dataRegistro: now,
    imgPerfil:null
}
const vacina1:Vacina = {
    vacinaID:1,
    nome:"Vencomax 12",
    periodicidade:"anual",
    indicacao:"Cinomose, Parvovirose, Parainfluenza, Adenovírus canino Tipo 2, Coronavirose canina, Leptospira canicola, L. icterohaemorrhagiae, L. grippothyphosa, L. copenhageni, L. pomona, L. hardjo e L. pyrogenes",
    dataRegistro:now
}
const vacina2:Vacina = {
    vacinaID:2,
    nome:"Raiva",
    periodicidade:"anual",
    indicacao:"Raiva",
    dataRegistro:now
}
const vacina3:Vacina = {
    vacinaID:3,
    nome:"Tosse dos Canis",
    periodicidade:"anual",
    indicacao:"Bordetella Bronchiseptica",
    dataRegistro:now
}

export const listVacinasTeste = [vacina1,vacina2,vacina3]

const aplicacaoVacina1:AplicacaoVacina = {
    aplicacaoVacinaID: 1,
    vacina: vacina1,
    dtProgramada: now,
    dtAplicada: now,
    dosagem: "0,5mL",
    veterinario: VeterinarioTmp1
}
const aplicacaoVacina2:AplicacaoVacina = {
    aplicacaoVacinaID: 2,
    vacina: vacina2,
    dtProgramada: now,
    dtAplicada: now,
    dosagem: "0,5mL",
    veterinario: VeterinarioTmp1
}
const aplicacaoVacina3:AplicacaoVacina = {
    aplicacaoVacinaID: 3,
    vacina: vacina3,
    dtProgramada: now,
    dtAplicada: now,
    dosagem: "0,5mL",
    veterinario: VeterinarioTmp1
}
export const cartao1: CartaoVacina = {
    cartaoVacinaID: 1,
    pet: pet1,
    aplicacaoVacinaDto:[aplicacaoVacina1, aplicacaoVacina2, aplicacaoVacina3]
}

export const listCartaoVacinaTeste = [cartao1]