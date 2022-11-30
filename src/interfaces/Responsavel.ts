import { Pet } from "./Pet"

export interface Responsavel {
    responsavelID?:Number;
    nome:String;
    sobrenome:String;
    genero:String;
    tipoPessoa:String;
    tipoRegistro:String;
    registroNum:String;
    nascimento:Date;
    aceitaEmail:Boolean;
    pets?: Pet[];
    enderecos?: endereco[];
    contatos?: contato[];
}

interface endereco {
    enderecoID?: Number;
    tipoEndereco?: String;
    cep: String;
    logradouro?: String;
    numero?: String;
    endereco?: String;
    bairro?: String;
    cidade?: String;
    uf?: String;
}

interface contato {
        contatoID?: Number;
        tipoContato?: String;
        descricao?: String;
        principal?: Boolean;
        anotacao?: String;
}