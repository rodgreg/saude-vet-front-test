import React, { useState, useLayoutEffect } from 'react';
import { Pet } from '../../../interfaces/Pet';
import { AplicacaoVacina, CartaoVacina } from '../../../interfaces/Prontuario';
import { Responsavel } from '../../../interfaces/Responsavel';
import { ApiProntuario } from '../../../services/ApiProntuario';
//import { Calendarutil } from '../../calendar/Calendarutil';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './vacinas.css';
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { AxiosResponse } from 'axios';
import { MdAdd, MdDelete, MdEdit, MdRemove } from 'react-icons/md';
import { Button, Label, Select, Option, InputText, InputDate } from '../../utils/HtmlComponents';
import { Vacina } from '../../../interfaces/Util';
import { ApiUtil } from '../../../services/ApiUtil';
import { Veterinario } from '../../../interfaces/Veterinario';
import { ApiRegistro } from '../../../services/ApiRegistro';

interface VacinaProps {
    petProps: Pet | null;
    respProps?: Responsavel;
}

export function Vacinas(props: VacinaProps) {

    const apiUtil = ApiUtil();
    const apiRegistro = ApiRegistro();
    const apiVacina = ApiProntuario();
    const localizer = momentLocalizer(moment);
    const [vacinas, setVacinas] = useState<Vacina[]>([]);
    const [selectedVacina, setSelectedVacina] = useState<string>("");
    const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
    const [selectedVeterinario, setSelectedVeterinario] = useState<string>("");
    const [cartaoVacina, setCartaoVacina] = useState<CartaoVacina>({ aplicacaoVacinaDto: [], pet: null })
    const [aplicacaoVacina, setAplicacaoVacina] = useState<AplicacaoVacina>({ dosagem: "", dtAplicada: null, dtProgramada: null, vacina: null, veterinario: null });
    const [showForm, setShowform] = useState<boolean>(false);
    const [isAplicada, setAplicada] = useState<boolean>(false);

    const getCartaoVacinaByPet = async (petID: number) => {

        var responseCartao: AxiosResponse = await apiVacina.listCartaoVacinaByPet(petID);
        if (responseCartao.status >= 200 && responseCartao.status <= 300) {
            setCartaoVacina(responseCartao.data[0]);
            var aplicacoesTemp: AplicacaoVacina[] = responseCartao.data[0].aplicacaoVacinaDto;

        }
    }

    const listVacinas = async () => {
        if (vacinas.length == 0) {
            let response: AxiosResponse = await apiUtil.listVacinas();
            if (response.status >= 200 && response.status <= 300) {
                setVacinas(response.data);
            }
        }
        if (veterinarios.length == 0) {
            let response: AxiosResponse = await apiRegistro.listVeterinarios();
            if (response.status >= 200 && response.status <= 300) {
                setVeterinarios(response.data);
            }
        }
    }

    const selectVacina = (select: React.ChangeEvent<HTMLSelectElement>) => {
        var registroTmp = null;
        if (select.target.name === 'vacina') {
            setSelectedVacina(select.target.value);
            registroTmp = vacinas[Number(select.target.value)];
        } else if (select.target.name === 'veterinario') {
            setSelectedVeterinario(select.target.value);
            registroTmp = veterinarios[Number(select.target.value)];
        }

        setAplicacaoVacina({ ...aplicacaoVacina, [select.target.name]: registroTmp });
    }

    const inputHandle = (input: React.ChangeEvent<HTMLInputElement>) => {
        if (input.target.type === 'date') {
            setAplicacaoVacina({ ...aplicacaoVacina, [input.target.name]: moment(input.target.value).toDate() });
        } else if (input.target.type === 'checkbox') {
            setAplicada(!isAplicada)
            if (!input.target.checked) {
                setAplicacaoVacina({ ...aplicacaoVacina, dtAplicada: null });
            }
        } else {
            setAplicacaoVacina({ ...aplicacaoVacina, [input.target.name]: input.target.value });
        }
    }

    const addAplicacao = async (button: React.MouseEvent<HTMLButtonElement>) => {

        if (cartaoVacina.cartaoVacinaID != null && aplicacaoVacina.vacina != null) {
            let response: AxiosResponse = await apiVacina.addAplicacaoToCartaoVacina(cartaoVacina.cartaoVacinaID, aplicacaoVacina);
            if (response.status >= 200 && response.status <= 300) {
                setCartaoVacina(response.data);
                setAplicacaoVacina({ dosagem: "", dtAplicada: null, dtProgramada: null, vacina: null, veterinario: null });
                setSelectedVacina("");
                setSelectedVeterinario("");
                setShowform(false);
            }
        }
    }

    const removeAplicacao = async (aplicacaoID: number) => {
        if (aplicacaoID >= 0) {
            let response: AxiosResponse = await apiVacina.removeAplicacaoToCartaoVacina(aplicacaoID);
            console.log(response.status);
            if (response.status >= 200 && response.status <= 300) {
                setCartaoVacina(response.data);
            }
        }
    }

    const editAplicacao = async (aplicacaoIdx: number) => {
        console.log("Edit aplicacao");
        if (cartaoVacina.aplicacaoVacinaDto != null) {
            setAplicacaoVacina(cartaoVacina.aplicacaoVacinaDto[aplicacaoIdx]);
            setShowform(true);
        }
    }

    useLayoutEffect(() => {
        let petid: number = 0;
        if (props.petProps != null) {
            petid = props.petProps.petID!.valueOf();
        }

        getCartaoVacinaByPet(petid);

    }, [props.petProps])

    return (
        <div className='vacina-conteiner'>
            <div className='vacina-table'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>Vacinas</h2>
                    <Button size={'small'} onClick={() => { setShowform(!showForm); listVacinas(); if (!showForm) { setAplicada(false) } }}>{showForm ? <MdRemove style={{ cursor: "pointer" }} /> : <MdAdd style={{ cursor: "pointer" }} onClick={() => setShowform(!showForm)} />}</Button>
                </div>
                {showForm ?
                    <div>
                        <div className='vacina-form-add'>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Label size={'small'} htmlFor={'veterinario'} >Veterinario Responsável:</Label>
                                <Select size={'medium'} id={'veterinario'} name={'veterinario'} value={selectedVeterinario} onChange={selectVacina}>
                                    <Option value={""}>Selecione</Option>
                                    {veterinarios.map((vet, idx) => {
                                        return (
                                            <Option key={idx} value={idx}>Dr(a). {vet.nome + " " + vet.sobrenome}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Label size={'small'} htmlFor={'vacina'} >Vacina:</Label>
                                <Select size={'medium'} id={'vacina'} name={'vacina'} value={selectedVacina} onChange={selectVacina}>
                                    <Option value={""}>Selecione</Option>
                                    {vacinas.map((vacina, idx) => {
                                        return (
                                            <Option key={idx} value={idx}>{vacina.nome}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Label size={'small'} htmlFor={'dosagem'} >Dose:</Label>
                                <InputText type={'text'} size={'small'} id='dosagem' name='dosagem' value={aplicacaoVacina.dosagem ? aplicacaoVacina.dosagem : ""} onChange={inputHandle} />
                            </div>
                        </div>
                        <div className='vacina-form-add'>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Label size={'small'} htmlFor={'dtProgramada'} >Aplicar em:</Label>
                                <InputDate type={'date'} id='dtProgramada' name='dtProgramada' value={aplicacaoVacina.dtProgramada ? moment(aplicacaoVacina.dtProgramada).format('yyyy-MM-DD') : ""} defaultValue={moment(new Date()).format('yyyy-MM-DD')} min={moment(new Date()).format('yyyy-MM-DD')} onChange={inputHandle} />
                            </div>
                            <span style={{ margin: '5px 0px 0px 0px' }}><input type={'checkbox'} onChange={inputHandle} /> <b>Registrar Aplicação?</b></span>
                        </div>
                        <div className='vacina-form-add'>
                            {isAplicada &&
                                <div>
                                    <Label size={'small'} htmlFor={'dtAplicada'} >Data da aplicação:</Label>
                                    <InputDate type={'date'} id='dtAplicada' name='dtAplicada' value={aplicacaoVacina.dtAplicada ? moment(aplicacaoVacina.dtAplicada).format('yyyy-MM-DD') : moment().format('yyyy-MM-DD')} defaultValue={moment(new Date()).format('yyyy-MM-DD')} max={moment(new Date()).format('yyyy-MM-DD')} onChange={inputHandle} />
                                </div>
                            }
                        </div>
                        <div className='vacina-form-add-button'>
                            <Button size={'small'} onClick={addAplicacao}>Registrar</Button>
                        </div>
                    </div> : null}

                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 15 }}>Ação</th>
                            <th>Vacina</th>
                            <th>Dose</th>
                            <th>Programada para</th>
                            <th>Aplicada em</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartaoVacina?.aplicacaoVacinaDto != null && cartaoVacina.aplicacaoVacinaDto.length > 0 ? cartaoVacina.aplicacaoVacinaDto?.map((aplic, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <MdEdit style={{ cursor: "pointer" }} onClick={() => editAplicacao(idx)} />
                                        <MdDelete style={{ cursor: "pointer" }} onClick={() => removeAplicacao(aplic.aplicacaoVacinaID ? aplic.aplicacaoVacinaID : -1)} /></td>
                                    <td>{aplic.vacina?.nome}</td>
                                    <td>{aplic.dosagem}</td>
                                    <td>{aplic.dtProgramada != null ? moment(aplic.dtProgramada).format("DD/MM/YYYY") : "--"}</td>
                                    <td>{aplic.dtAplicada != null ? moment(aplic.dtAplicada).format("DD/MM/YYYY") : "--"}</td>
                                </tr>
                            )
                        }) : <tr><td colSpan={5}>"Sem dados de Aplicações!"</td></tr>}
                    </tbody>
                </table>
            </div>
            <div className='vacina-calendar'>
                {/* {<Calendarutil /> */
                    <Calendar
                        culture="pt-br"
                        messages={{
                            week: 'Semana',
                            work_week: 'Semana de trabalho',
                            day: 'Dia',
                            month: 'Mês',
                            previous: '<<',
                            next: '>>',
                            today: 'Hoje',
                            agenda: 'Agenda',

                            showMore: (total) => `+${total} mais`,
                            noEventsInRange: 'Sem eventos no período.'
                        }}
                        defaultView={Views.WEEK}
                        views={{ week: true, day: true, agenda: true }}
                        dayLayoutAlgorithm="no-overlap"
                        localizer={localizer}
                        events={[]}
                        backgroundEvents={[{
                            id: 0,
                            title: 'Available for Clients',
                            start: new Date(2023, 4, 17, 6),
                            end: new Date(2023, 4, 17, 18),
                        },]}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectSlot={({ start, end }) => console.log()}
                        onSelectEvent={(event) => console.log()}
                        selectable

                    />
                }
            </div>
        </div>
    )
}