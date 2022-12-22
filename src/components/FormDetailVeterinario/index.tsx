import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import './formDetailVeterinario.css';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '../utils/HtmlComponents';
import { Veterinario } from '../../interfaces/Veterinario';

interface propsFormVeterinario {
    cancelFormClick:(event: React.MouseEvent<HTMLButtonElement>) => void;
    editFormClick:(event: React.MouseEvent<HTMLButtonElement>, veterinario:Veterinario) => void;
    veterinarioDetail: Veterinario;
}

export function FormDetailVeterinario(props: propsFormVeterinario) {

    const [veterinario, setVeterinario] = useState<Veterinario>(props.veterinarioDetail);

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
        if(props.veterinarioDetail!=null){
            setVeterinario(props.veterinarioDetail);
        }
    },[props])

    return (
        <div id='form_veterinario'>
           <div>
                <Button color={'light_cancel'} type="button"
                        onClick={(e) => props.cancelFormClick(e)}> {"Fechar"} </Button>
                <Button color={'light'} type="button"
                        onClick={(e) => props.editFormClick(e, veterinario)}> {"Editar"} </Button>
            </div>
            <p><b>{props.veterinarioDetail?.veterinarioID?props.veterinarioDetail.nome.toString()+" "+props.veterinarioDetail.sobrenome.toString():""}</b></p>
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
                                <span>Sexo: <b>{props.veterinarioDetail?props.veterinarioDetail.genero.toString():""}</b></span>
                                <span>CPF: <b>{props.veterinarioDetail?cpf_cnpj_mask('CPF', props.veterinarioDetail.cpf):""}</b></span>
                                <span>Cidade: <b>{props.veterinarioDetail?props.veterinarioDetail.cidade.toString():""}</b></span>
                                <span>UF: <b>{props.veterinarioDetail?props.veterinarioDetail.uf.toString():""}</b></span>
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item className='AccordionItem' value="item-2">
                    <Accordion.Header className="AccordionHeader">
                    <Accordion.Trigger className='AccordionTrigger'>
                        CRMVs
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentText">
                        {props.veterinarioDetail?.crmvs?.map(crmv => (
                            <div key={crmv.crmvID?.valueOf()} className='AccordionCard' >
                                <span>Numero: <b>{crmv.numero}</b> | &nbsp;
                                      UF: <b>{crmv.uf}</b> | &nbsp;
                                      Área: <b>{crmv.area}</b></span>
                                <span>Data de Registro: <b>{moment(crmv.dataRegistro).format('DD/MM/YYYY')}</b></span>
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