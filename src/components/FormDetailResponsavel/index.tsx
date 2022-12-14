import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import './formDetailResponsavel.css';
import { Responsavel } from '../../interfaces/Responsavel';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '../HtmlComponents';

interface propsFormResponsavel {
    cancelFormClick:(event: React.MouseEvent<HTMLButtonElement>) => void;
    responsavelDetail?: Responsavel;
}

export function FormDetailResponsavel(props: propsFormResponsavel) {

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
        moment.locale('pt-br');
    },[])

    return (
        <div id='form_responsavel'>
            <Button color={'light_cancel'} type="button"
                    onClick={(e) => props.cancelFormClick(e)}> {"Fechar"} </Button>
            <p><b>{props.responsavelDetail?.nome && props.responsavelDetail.sobrenome?props.responsavelDetail.nome.toString()+" "+props.responsavelDetail.sobrenome.toString():""}</b></p>
            <br/>
            <Accordion.Root className='AccordionRoot' type='single' defaultValue="item-1" collapsible>
                <Accordion.Item className='AccordionItem' value="item-1">
                    <Accordion.Header className="AccordionHeader">
                    <Accordion.Trigger className='AccordionTrigger'>
                        Dados Pessoais
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                     <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentText">
                            <div className='AccordionCard'>
                                <span>Sexo: <b>{props.responsavelDetail?.genero?props.responsavelDetail.genero.toString():""}</b></span>
                                <span>Tipo de Pessoa: <b>{props.responsavelDetail?.tipoPessoa?props.responsavelDetail.tipoPessoa.toString():""}</b></span>
                                <span>CPF/CNPJ: <b>{props.responsavelDetail?.tipoRegistro && props.responsavelDetail.registroNum?cpf_cnpj_mask(props.responsavelDetail.tipoRegistro, props.responsavelDetail.registroNum):""}</b></span>
                                <span>Data de nascimento: <b>{props.responsavelDetail?.nascimento?moment(props.responsavelDetail.nascimento).format('DD/MM/YYYY')
                                                                                        +" - "+
                                                                                        moment(props.responsavelDetail.nascimento).month(0).from(moment().month(0),true)
                                                                                        +" - "+
                                                                                        (moment().isBefore([
                                                                                        (new Date().getFullYear().valueOf()),
                                                                                        props.responsavelDetail.nascimento.getMonth().valueOf(),
                                                                                        props.responsavelDetail.nascimento.getDate().valueOf()])?
                                                                                        moment().to(
                                                                                                    moment([
                                                                                                        (new Date().getFullYear().valueOf()),
                                                                                                        props.responsavelDetail.nascimento.getMonth().valueOf(),
                                                                                                        props.responsavelDetail.nascimento.getDate().valueOf()]))
                                                                                        : moment().to(
                                                                                            moment([
                                                                                                (new Date().getFullYear().valueOf()+1),
                                                                                                props.responsavelDetail.nascimento.getMonth().valueOf(),
                                                                                                props.responsavelDetail.nascimento.getDate().valueOf()]))
                                                                                       )
                                                                                       :""}
                                                                                       </b>
                                </span>
                                <span>Aceita receber e-mail: &nbsp;<b>
                                    <span>{props.responsavelDetail?Boolean(props.responsavelDetail.aceitaEmail)?"Sim":"Não":""}
                                    </span></b>
                                </span>
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item className='AccordionItem' value="item-2">
                    <Accordion.Header className="AccordionHeader">
                    <Accordion.Trigger className='AccordionTrigger'>
                        Contatos
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentText">
                        {props.responsavelDetail?.contatos?.map(contato => (
                            <div key={contato.contatoID?.valueOf()} className='AccordionCard'>
                                <span>Principal: <b>{contato.principal ? "Sim" : "Não"}</b> | &nbsp;
                                      Tipo: <b>{contato.tipoContato}</b></span>
                                <span>Descrição: <b>{contato.descricao}</b></span>
                                <span>Observações: <b>{contato.anotacao}</b></span>
                            </div>
                        ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item className='AccordionItem' value="item-3">
                    <Accordion.Header className="AccordionHeader">
                    <Accordion.Trigger className='AccordionTrigger'>
                        Endereços
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentText" >
                        {props.responsavelDetail?.enderecos?.map(endereco => {return(
                        <div key={endereco.enderecoID?.valueOf()} className='AccordionCard'>
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
                <Accordion.Item className='AccordionItem' value="item-4">
                    <Accordion.Header className="AccordionHeader">
                    <Accordion.Trigger className='AccordionTrigger'>
                        Pets
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentText">
                        {props.responsavelDetail?.pets?.map(pet => {return(
                        <div key={pet.petID?.valueOf()} className='AccordionCard'>
                            <span>Nome: <b>{pet.nome}</b>&nbsp; | &nbsp;
                                  Sexo: <b>{pet.genero}</b></span>
                            <span>Especie: <b>{pet.especie}</b>&nbsp; | &nbsp;
                                  Raça: <b>{pet.raca}</b>&nbsp; | &nbsp;
                                  Cor: <b>{pet.cor}</b></span>
                            <span>Data de Nascimento: <b>{moment(pet.nascimento).format("DD/MM/YYYY")}</b></span>
                            <span>Fetirlidade: <b>{pet.fertil?"Sim":"Não"}</b>&nbsp; | &nbsp;
                                  Pedigree: <b>{pet.pedigree?"Sim":"Não"}</b></span>
                        </div>
                            )})}
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