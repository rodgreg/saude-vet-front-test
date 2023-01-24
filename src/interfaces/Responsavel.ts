import { Pet } from "./Pet"

export interface Responsavel {
    responsavelID?:Number | null;
    nome?:string;
    sobrenome?:string;
    genero?:string;
    tipoPessoa?:string; // Física ou Jurídica
    tipoRegistro?:string; // CPF ou CNPJ
    registroNum?:string;
    nascimento?:Date | null;
    aceitaEmail?:Boolean;
    dataRegistro?:Date | null;
    pets?: Pet[] | null;
    enderecos?: Endereco[] | null;
    contatos?: Contato[] | null;
}

export interface Endereco {
    enderecoID?: Number | null;
    tipoEndereco?: string;
    cep: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
}

export interface Contato {
        contatoID?: Number | null;
        tipoContato?: string;
        descricao?: string;
        principal?: Boolean;
        anotacao?: string;
}