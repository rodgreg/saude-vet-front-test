import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import './formDetailPet.css';
import { Responsavel } from '../../interfaces/Responsavel';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '../HtmlComponents';
import { Pet } from '../../interfaces/Pet';

interface propsFormResponsavel {
    cancelFormClick:(event: React.MouseEvent<HTMLButtonElement>) => void;
    responsavelDetail?: Responsavel;
    petIndex?: number;
}

export function FormDetailPet(props: propsFormResponsavel) {

    const [responsavel, setResponsavel] = useState<Responsavel>();
    const [pet, setPet] = useState<Pet>();

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
        if(props.responsavelDetail!=null && props.petIndex!=null){
            setResponsavel(props.responsavelDetail);
            if(props.responsavelDetail?.pets != null) {
                setPet(props.responsavelDetail.pets[props.petIndex])
            }
        }
        moment.locale('pt-br');
    },[props])

    return (
        <div id='form_pet'>
            <Button color={'light_cancel'} type="button"
                    onClick={(e) => props.cancelFormClick(e)}> {"Fechar"} </Button>
            <p><b>{pet?.nome}</b></p>
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
                                <span>Sexo: <b>{pet?.genero}</b></span>
                                <span>Espécie: <b>{pet?.especie}</b></span>
                                <span>Raça: <b>{pet?.raca}</b></span>
                                <span>Cor: <b>{pet?.cor}</b></span>
                                <span>Data de nascimento: <b>{pet?.nascimento?moment(pet?.nascimento).format('DD/MM/YYYY'):""}
                                                                                       </b>
                                </span>
                                <span>Fertil?: &nbsp;<b>
                                    <span>{Boolean(pet?.fertil)?"Sim":"Não"}
                                    </span></b>
                                </span>
                                <span>Pedigree?: &nbsp;<b>
                                    <span>{Boolean(pet?.pedigree)?"Sim":"Não"}
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
                            <span>Nome: <b>{responsavel?.nome+" "+responsavel?.sobrenome}</b></span>
                            <span>Sexo: <b>{responsavel?.genero}</b></span>
                            <span>Tipo de Pessoa: <b>{responsavel?.tipoPessoa}</b></span>
                            <span>CPF/CNPJ: <b>{responsavel?.tipoRegistro && responsavel.registroNum?cpf_cnpj_mask(responsavel.tipoRegistro, responsavel.registroNum):""}</b></span>
                            <span>Data de nascimento: <b>{responsavel?.nascimento?moment(responsavel.nascimento).format('DD/MM/YYYY'):""}
                                                                                   {/* { +" - "+
                                                                                    moment(responsavel.nascimento).month(0).from(moment().month(0),true)
                                                                                    +" - "+
                                                                                    (moment().isBefore([
                                                                                    (new Date().getFullYear().valueOf()),
                                                                                    responsavel.nascimento.getMonth().valueOf(),
                                                                                    responsavel.nascimento.getDate().valueOf()])?
                                                                                    moment().to(
                                                                                                moment([
                                                                                                    (new Date().getFullYear().valueOf()),
                                                                                                    responsavel.nascimento.getMonth().valueOf(),
                                                                                                    responsavel.nascimento.getDate().valueOf()]))
                                                                                    : moment().to(
                                                                                        moment([
                                                                                            (new Date().getFullYear().valueOf()+1),
                                                                                            responsavel.nascimento.getMonth().valueOf(),
                                                                                            responsavel.nascimento.getDate().valueOf()]))
                                                                                    )
                                                                                    :"" */}
                                                                                    </b>
                            </span>
                            <span>Aceita receber e-mail: &nbsp;<b>
                                <span>{Boolean(responsavel?.aceitaEmail)?"Sim":"Não"}
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
                        {responsavel?.enderecos?.map(endereco => {return(
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
                        {props.responsavelDetail?.contatos?.map(contato => (
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

        //     "nome":"String",
        //     "sobrenome":"String",
        //     "genero":"String",
        //     "tipoPessoa":"String",
        //     "tipoRegistro":"String",
        //     "registroNum":"String",
        //     "nascimento":"Date",
        //     "aceitaEmail":Boolean