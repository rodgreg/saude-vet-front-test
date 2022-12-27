import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import './formDetailPet.css';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '../../utils/HtmlComponents';
import { Pet_Resp } from '../../../interfaces/Pet';

interface propsFormResponsavel {
    cancelFormClick:(event: React.MouseEvent<HTMLButtonElement>) => void;
    editFormClick:(event: React.MouseEvent<HTMLButtonElement>, petR:Pet_Resp) => void;
    petDetail: Pet_Resp;
}

export function FormDetailPet(props: propsFormResponsavel) {
    const [pet, setPet] = useState<Pet_Resp>(props.petDetail);

    const cpf_cnpj_mask = (tipo:String,numero:String) => {
        let mask = "";
        if(tipo === "CPF") {
            mask = numero.substring(0,3)
            +"."+
            numero.substring(3,6)
            +"."+
            numero.substring(6,9)
            +"-"+
            numero.substring(9,11)
        } else if (tipo === "CNPJ") {
            mask = numero.substring(0,2)
            +"."+
            numero.substring(2,5)
            +"."+
            numero.substring(5,8)
            +"/"+
            numero.substring(8,12)
            +"-"+
            numero.substring(12,14)
        }
        return mask;
    };

    useEffect(() => {
        if(props.petDetail!=null){
            setPet(props.petDetail);
        }
        moment.locale('pt-br');
    },[props])

    return (
        <div id='form_pet'>
            <div>
                <Button color={'light_cancel'} type="button"
                        onClick={(e) => props.cancelFormClick(e)}> {"Fechar"} </Button>
                <Button color={'light'} type="button"
                        onClick={(e) => props.editFormClick(e, pet)}> {"Editar"} </Button>
            </div>
            
            <p><b>{pet.pet?pet.pet.nome:""}</b></p>
            <br/>
            <Accordion.Root className='AccordionRootP' type='single' defaultValue="item-1" collapsible>
                <Accordion.Item className='AccordionItemP' value="item-1">
                    <Accordion.Header className="AccordionHeaderP">
                    <Accordion.Trigger className='AccordionTriggerP'>
                        Dados do Pet
                        <ChevronDownIcon className="AccordionChevronP" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                     <Accordion.Content className='AccordionContentP'>
                        <div className="AccordionContentTextP">
                            <div className='AccordionCardP'>
                                <span>Sexo: <b>{pet.pet?pet.pet.genero:""}</b></span>
                                <span>Espécie: <b>{pet.pet?pet.pet.especie:""}</b></span>
                                <span>Raça: <b>{pet.pet?pet.pet.raca:""}</b></span>
                                <span>Cor: <b>{pet.pet?pet.pet.cor:""}</b></span>
                                <span>Data de nascimento: <b>{pet.pet?moment(pet.pet.nascimento).format('DD/MM/YYYY'):""}
                                                                                       </b>
                                </span>
                                <span>Fertil?: &nbsp;<b>
                                    <span>{pet.pet?pet.pet.fertil?"Sim":"Não":""}
                                    </span></b>
                                </span>
                                <span>Pedigree?: &nbsp;<b>
                                    <span>{pet.pet?pet.pet.pedigree?"Sim":"Não":""}
                                    </span></b>
                                </span>
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item className='AccordionItemP' value="item-2">
                    <Accordion.Header className="AccordionHeaderP">
                    <Accordion.Trigger className='AccordionTriggerP'>
                        Responsável
                        <ChevronDownIcon className="AccordionChevronP" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='AccordionContentP'>
                        <div className="AccordionContentTextP">
                        <div className='AccordionCardP'>
                            <span>Nome: <b>{pet.responsavel?.nome+" "+pet.responsavel?.sobrenome}</b></span>
                            <span>Sexo: <b>{pet.responsavel?.genero}</b></span>
                            <span>Tipo de Pessoa: <b>{pet.responsavel?.tipoPessoa}</b></span>
                            <span>CPF/CNPJ: <b>{pet.responsavel?.tipoRegistro && pet.responsavel.registroNum?cpf_cnpj_mask(pet.responsavel.tipoRegistro, pet.responsavel.registroNum):""}</b></span>
                            <span>Data de nascimento: <b>{pet.responsavel?.nascimento?moment(pet.responsavel.nascimento).format('DD/MM/YYYY'):""}</b>
                            </span>
                            <span>Aceita receber e-mail: &nbsp;<b>
                                <span>{pet.responsavel?.aceitaEmail?"Sim":"Não"}
                                </span></b>
                            </span>
                        </div>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item className='AccordionItemP' value="item-3">
                    <Accordion.Header className="AccordionHeaderP">
                    <Accordion.Trigger className='AccordionTriggerP'>
                        Endereços
                        <ChevronDownIcon className="AccordionChevronP" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='AccordionContentP'>
                        <div className="AccordionContentTextP" >
                        {pet.responsavel?.enderecos?.map(endereco => {return(
                        <div key={endereco.enderecoID?.valueOf()} className='AccordionCardP'>
                            <span>Tipo: <b>{endereco.tipoEndereco}</b> &nbsp; | &nbsp;
                                  CEP: <b>{endereco.cep}</b></span>
                            <span>Logradouro: <b>{endereco.logradouro}</b>&nbsp; | &nbsp;
                                  Numero: <b>{endereco.numero}</b></span>
                            <span>Endereço: <b>{endereco.endereco}</b></span>
                            <span>Complemento: <b>{endereco.complemento}</b></span>
                            <span>Bairro: <b>{endereco.bairro}</b></span>
                            <span>Cidade: <b>{endereco.cidade}</b>&nbsp; | &nbsp;
                                  UF: <b>{endereco.uf}</b></span>
                        </div>
                            )})}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item className='AccordionItemP' value="item-4">
                    <Accordion.Header className="AccordionHeaderP">
                    <Accordion.Trigger className='AccordionTriggerP'>
                        Contatos
                        <ChevronDownIcon className="AccordionChevronP" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='AccordionContentP'>
                        <div className="AccordionContentTextP">
                        {pet.responsavel?.contatos?.map(contato => (
                            <div key={contato.contatoID?.valueOf()} className='AccordionCardP'>
                                <span>Principal: <b>{contato.principal ? "Sim" : "Não"}</b> | &nbsp;
                                      Tipo: <b>{contato.tipoContato}</b></span>
                                <span>Descrição: <b>{contato.descricao}</b></span>
                                <span>Observações: <b>{contato.anotacao}</b></span>
                            </div>
                        ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </div>
    )
    
}