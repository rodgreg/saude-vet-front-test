import { Pet } from "./Pet"

export interface Responsavel {
    responsavelID?:Number | null;
    nome?:String;
    sobrenome?:String;
    genero?:String;
    tipoPessoa?:String; // Física ou Jurídica
    tipoRegistro?:String; // CPF ou CNPJ
    registroNum?:String;
    nascimento?:Date | null;
    aceitaEmail?:Boolean;
    dataRegistro?:Date | null;
    pets?: Pet[] | null;
    enderecos?: Endereco[] | null;
    contatos?: Contato[] | null;
}

export interface Endereco {
    enderecoID?: Number | null;
    tipoEndereco?: String;
    cep: String;
    logradouro?: String;
    numero?: String;
    complemento?: String;
    endereco?: String;
    bairro?: String;
    cidade?: String;
    uf?: String;
}

export interface Contato {
        contatoID?: Number | null;
        tipoContato?: String;
        descricao?: String;
        principal?: Boolean;
        anotacao?: String;
}