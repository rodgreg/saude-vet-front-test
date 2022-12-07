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
            <p><b>{props.responsavelDetail?.responsavelID?props.responsavelDetail.nome.toString()+" "+props.responsavelDetail.sobrenome.toString():""}</b></p>
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
                            <div style={{ backgroundColor: "#fefff8", padding: 8, borderRadius: 4, marginBottom: 2 }}>
                                <label>Sexo: <b>{props.responsavelDetail?props.responsavelDetail.genero.toString():""}</b></label><br/><br/>
                                <label>Tipo de Pessoa: <b>{props.responsavelDetail?props.responsavelDetail.tipoPessoa.toString():""}</b></label><br/><br/>
                                <label>CPF/CNPJ: <b>{props.responsavelDetail?cpf_cnpj_mask(props.responsavelDetail.tipoRegistro, props.responsavelDetail.registroNum):""}</b></label><br/><br/>
                                <label>Data de nascimento: <b>{props.responsavelDetail?moment(props.responsavelDetail.nascimento).format('DD/MM/YYYY')
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
                                </label><br/><br/>
                                <label>Aceita receber e-mail: &nbsp;<b>
                                    <span>{props.responsavelDetail?Boolean(props.responsavelDetail.aceitaEmail)?"Sim":"Não":""}
                                    </span></b>
                                </label>
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
                            <div key={contato.contatoID?.valueOf()} style={{ backgroundColor: "#fefff8", padding: 8, borderRadius: 4, marginBottom: 2 }}>
                                <label>Principal: <b>{contato.principal ? "Sim" : "Não"}</b></label> | &nbsp;
                                <label>Tipo: <b>{contato.tipoContato}</b></label> | &nbsp;
                                <label>Descrição: <b>{contato.descricao}</b></label><br /><br />
                                <label>Observações: <b>{contato.anotacao}</b></label>
                                <br />-<br />
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
                        <div key={endereco.enderecoID?.valueOf()} style={{backgroundColor:"#fefff8", padding:8, borderRadius:4, marginBottom:2}}>
                            <label>Tipo: <b>{endereco.tipoEndereco}</b></label>&nbsp; | &nbsp;
                            <label>CEP: <b>{endereco.cep}</b></label><br/><br/>
                            <label>Logradouro: <b>{endereco.logradouro}</b></label>&nbsp; | &nbsp;
                            <label>Numero: <b>{endereco.numero}</b></label><br/><br/>
                            <label>Endereço: <b>{endereco.endereco}</b></label><br/><br/>
                            <label>Complemento: <b>{endereco.complemento}</b></label>
                            <label>Bairro: <b>{endereco.bairro}</b></label><br/><br/>
                            <label>Cidade: <b>{endereco.cidade}</b></label>&nbsp; | &nbsp;
                            <label>UF: <b>{endereco.uf}</b></label>
                            <br/>-<br/>
                        </div>
                            )})}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-4">
                    <Accordion.Header className="AccordionHeader">
                    <Accordion.Trigger className='AccordionTrigger'>
                        Pets
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentText">
                        {props.responsavelDetail?.pets?.map(pet => {return(
                        <div key={pet.petID?.valueOf()} style={{backgroundColor:"#fefff8", padding:8, borderRadius:4, marginBottom:2}}>
                            <label>Nome: <b>{pet.nome}</b></label>&nbsp; | &nbsp;
                            <label>Sexo: <b>{pet.genero}</b></label><br/><br/>
                            <label>Especie: <b>{pet.especie}</b></label>&nbsp; | &nbsp;
                            <label>Raça: <b>{pet.raca}</b></label>&nbsp; | &nbsp;
                            <label>Cor: <b>{pet.cor}</b></label><br/><br/>
                            <label>Data de Nascimento: <b>{moment(pet.nascimento).format("DD/MM/YYYY")}</b></label>&nbsp; | &nbsp;
                            <label>Fetirlidade: <b>{pet.fertil?"Sim":"Não"}</b></label>&nbsp; | &nbsp;
                            <label>Pedigree: <b>{pet.pedigree?"Sim":"Não"}</b></label>
                            <br/>-<br/>
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