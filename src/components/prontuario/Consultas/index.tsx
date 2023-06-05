import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pet } from "../../../interfaces/Pet"
import { Anamnese, Consulta } from "../../../interfaces/Prontuario";
import { Responsavel } from "../../../interfaces/Responsavel";
import { Veterinario } from "../../../interfaces/Veterinario";
import { ApiProntuario } from "../../../services/ApiProntuario";
import { AnamneseQuestoes } from "../../utils/AnamneseQuestoes";
import { Button, Select, TextArea, Option, InputDate, InputText, Label } from "../../utils/HtmlComponents";
import { HiEye, HiPrinter } from "react-icons/hi";
import './consulta.css';
import { MdAddCircleOutline, MdArrowBack, MdEdit } from "react-icons/md";
import { AxiosResponse } from "axios";
import { ApiRegistro } from "../../../services/ApiRegistro";
import CKEditorA from '../../utils/CKEditor';
import { Chart } from "react-google-charts";

interface ConsultaProps {
    petProps: Pet | null;
    respProps?: Responsavel;
    editing: boolean | null;
}

interface HistPesoTam {
    data: Date | null;
    peso: string | null;
    tamanho: string | null;
}


export function Consultas(props: ConsultaProps) {

    const api = ApiProntuario();
    const apiRegistro = ApiRegistro();
    const [consulta, setConsulta] = useState<Consulta | null>(null);
    const [ultimaConsulta, setUltimaConsulta] = useState<Consulta | null>(null);
    const [consultaList, setConsultaList] = useState<Consulta[]>([]);
    const [showHistConsulta, setShowHistConsulta] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [vetList, setVetList] = useState<Veterinario[]>([]);
    const [anamneseList, setAnamneseList] = useState<Anamnese[]>([]);
    const [anamneseConsulta, setAnamneseConsulta] = useState<Anamnese | null>(null);
    const [showAnamnese, setShowAnamnese] = useState<boolean>(false);
    const [dataChart, setDataChart] = useState<any[][]>([]);

    const [pesoHist, setPesoHist] = useState<HistPesoTam[]>([]);
    const [registroConsultaHist, setRegistroConsultaHist] = useState<string>("");

    const registrarConsulta = async () => {
        if (consulta?.anamnese != null) {
            if (consulta.dtRegistro == null) {
                consulta.dtRegistro = new Date();
            }
            let result: AxiosResponse;
            if (consulta.consultaID == null) {
                result = await api.saveConsultaPet(consulta);
            } else {
                result = await api.updateConsultaPet(consulta);
            }
            if (result.status >= 200 && result.status <= 300) {
                setShowHistConsulta(true);
                setConsulta({ peso: "", registroGeral: "", tamanho: "", tipo: "", pet: consulta?.pet });
                setAnamneseConsulta(null);
                if (props.petProps != null) {
                    findConsultasPet(props.petProps);
                }
            }
        }
    }

    const visualizarConsulta = (consult: Consulta) => {
        setConsulta(consult);
        setAnamneseConsulta(consult.anamnese ? consult.anamnese : null);
        setShowHistConsulta(false);
        setIsEditing(false);
    }

    const findConsultasPet = async (petFind: Pet) => {
        if (petFind.petID != null) {
            let result: AxiosResponse = await api.listConsultasPet(petFind.petID.valueOf());
            if (result.status >= 200 && result.status <= 300) {
                let consListTemp: Consulta[] = result.data;
                if (consListTemp.length > 0) {
                    consListTemp = consListTemp.sort((a, b) => {
                        if (a.dtRegistro == null || b.dtRegistro == null) { return 0; }
                        let d1 = a.dtRegistro;
                        let d2 = b.dtRegistro;
                        if (d1 > d2) {
                            return -1;
                        }
                        if (d1 < d2) {
                            return 1;
                        }
                        return 0;
                    })
                    setConsultaList(consListTemp);
                    setUltimaConsulta(consListTemp[0]);
                    var tempPesoHist: any[] = consListTemp.map(cons => {
                        var pesoH: HistPesoTam = {
                            data: cons.dtRegistro ? cons.dtRegistro : null,
                            peso: cons.peso ? cons.peso : null,
                            tamanho: cons.tamanho ? cons.tamanho : null
                        }; return (pesoH)
                    });
                    setPesoHist(tempPesoHist);

                    // Popula dados do gráfico
                    var dataTmpchart: any[][] = [["Data", "Peso", "Tamanho"]];
                    tempPesoHist.sort((a, b) => { if (a.data > b.data) { return 1; } else if (a.data < b.data) { return -1; } else { return 0; } });
                    for (let i = 0; i < tempPesoHist.length; i++) {
                        dataTmpchart.push([moment(tempPesoHist[i].data).format("DD/MM/YYYY"), Number(tempPesoHist[i].peso), Number(tempPesoHist[i].tamanho)])
                    }
                    setDataChart(dataTmpchart);

                    var registroHist: string = "";
                    for (let i = 0; i < consListTemp.length; i++) {
                        registroHist = registroHist + `<h3>Registro de: <b>${moment(consListTemp[i].dtRegistro).format("DD/MM/YYYY HH:mm")}</b></h3><br/>` + consListTemp[i].registroGeral + "<br/><br/>";
                    }
                    setRegistroConsultaHist(registroHist);
                } else {
                var dataTmpchart: any[][] = [["Data", "Peso", "Tamanho"],[moment().format("DD/MM/YYYY"),0,0]];
                    
                    setDataChart(dataTmpchart);
                }
            }
        }
        let consultaTmp = consultaList?.filter(cons => cons.pet?.petID === petFind.petID)
        if (consultaTmp != null && consultaTmp.length === 1) {
            setConsultaList(consultaTmp);
        }
    }

    const getListVet = async () => {
        let listResult: AxiosResponse = await apiRegistro.listVeterinarios();
        if (listResult.status >= 200 && listResult.status <= 300) {
            setVetList(listResult.data);
        }
    }

    const getListAnamense = async () => {
        let listResult: AxiosResponse = await api.listTemplateAnamnese();
        if (listResult.status >= 200 && listResult.status <= 300) {
            setAnamneseList(listResult.data);
        }
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === 'date') {
            setConsulta({ ...consulta, [e.target.name]: moment(e.target.value).toISOString() });
        } else {
            setConsulta({ ...consulta, [e.target.name]: e.target.value });
        }
    }

    const textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setConsulta({ ...consulta, [e.target.name]: e.target.value });
    }

    const ckeditorChange = (htmlText: string) => {
        setConsulta({ ...consulta, registroGeral: htmlText });
    }

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === "veterinario" && e.target.value !== "") {
            let vetSelected = vetList.find(vet => vet.veterinarioID == Number(e.target.value));
            setConsulta({ ...consulta, [e.target.name]: vetSelected });
        } else {
            setConsulta({ ...consulta, [e.target.name]: e.target.value })
        }
    }

    const selectAnamneseTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let anamneseSelected: Anamnese = anamneseList.filter(anamn => anamn.titulo === e.target.value)[0];
        setAnamneseConsulta(anamneseSelected);
    }

    const btnNovaConsulta = async () => {
        setShowHistConsulta(false);
        setIsEditing(true);
        await getListVet();
        await getListAnamense();
        setConsulta({ ...consulta, pet: props.petProps })
    }

    const btnEditConsulta = async () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
            await getListVet();
            await getListAnamense();
        }
    }

    useEffect(() => {
        if (props.petProps != null) {
            if (consulta?.consultaID != null) {
                if (isEditing) {
                    setShowHistConsulta(false);
                    setConsulta({ ...consulta, pet: props.petProps });
                    getListVet();
                    getListAnamense();
                }
            } else {
                if (isEditing) {
                    setConsulta({ peso: "", registroGeral: "", tamanho: "", tipo: "", pet: props.petProps });
                    getListVet();
                    getListAnamense();
                }
                findConsultasPet(props.petProps);
            }
        }
        if (props.editing != null && props.petProps != null) {
            setIsEditing(props.editing);
            setShowHistConsulta(false);
            //findConsultasPet(props.petProps);
        }

    }, [props.petProps])

    return (
        <div className="container-geral">
            {showHistConsulta ?
                <div className="lista-consulta-container">
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 }}>
                        <span><b>Histórico de consultas</b></span> &nbsp;
                        <Button onClick={() => { btnNovaConsulta() }} ><MdAddCircleOutline size={20} /></Button>
                    </div>
                    <div className="tabela-lista-consulta">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ação</th>
                                    <th>Data de Registro</th>
                                    <th>Tipo</th>
                                    <th>Veterinario</th>
                                    <th>Peso</th>
                                    <th>Tamanho</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultaList?.map((consulta, idx) => {
                                    return (<tr key={idx}>
                                        <td>
                                            <button ><HiPrinter /></button>&nbsp;
                                            <button onClick={() => visualizarConsulta(consulta)}><HiEye /></button>
                                        </td>
                                        <td>{moment(consulta.dtRegistro).format('DD/MM/yyyy HH:mm')}</td>
                                        <td>{consulta.tipo}</td>
                                        <td>{consulta.veterinario?.nome}</td>
                                        <td>{consulta.peso}</td>
                                        <td>{consulta.tamanho}</td>
                                    </tr>)
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div className="consulta-detail-container">
                    <div className="consulta-detail-form-container">
                        <div style={{ display: 'flex' }}>
                            <Button size={'small'} onClick={() => { setShowHistConsulta(true); setConsulta({ peso: "", registroGeral: "", tamanho: "", tipo: "", pet: consulta?.pet }); setAnamneseConsulta(null) }}><MdArrowBack size={18} /></Button>
                            {consulta?.consultaID != null && <Button size={'small'} onClick={() => { btnEditConsulta() }}><MdEdit size={18} /></Button>}
                        </div>
                        <div className="consulta-detail-form">
                            <span>Tipo de Consulta:&nbsp;
                                {isEditing ?
                                    <Select id="tipo" name="tipo" value={consulta != null ? consulta.tipo : ""} onChange={selectChange}>
                                        <Option value={""}>Selecione</Option>
                                        <Option value={"Clínica Geral"}>Clínica Geral</Option>
                                        <Option value={"Dermato"}>Dermato</Option>
                                        <Option value={"Odonto"}>Odonto</Option>
                                    </Select>
                                    :
                                    <b>{consulta != null ? consulta.tipo : ""}</b>
                                }
                                &nbsp;&nbsp;
                                Médico Veterinário:&nbsp;
                                {isEditing ?
                                    <Select id="veterinario" name="veterinario" value={consulta?.veterinario?.veterinarioID?.valueOf()} onChange={selectChange}>
                                        <Option value={""}>Selecione</Option>
                                        {vetList.map((vet, idx) => {
                                            return (<Option key={idx} value={vet.veterinarioID?.valueOf()}>{vet.nome} {vet.sobrenome}</Option>)
                                        })}
                                    </Select>
                                    :
                                    <b>{consulta != null ? consulta?.veterinario?.nome + " " + consulta?.veterinario?.sobrenome : ""}</b>
                                }
                                &nbsp;&nbsp;&nbsp;
                                Data de Regitro:&nbsp;
                                {isEditing ?
                                    <InputDate id="dtRegistro" name="dtRegistro" type={'datetime-local'} max={moment(new Date()).format('yyyy-MM-DD')} onChange={inputChange}
                                        value={consulta?.dtRegistro != null ? moment(consulta?.dtRegistro).format("yyyy-MM-DD HH:mm") : moment(new Date()).format("yyyy-MM-DD HH:mm")} />
                                    :
                                    <b>{consulta != null ? moment(consulta?.dtRegistro).format("DD/MM/yyyy HH:mm") : ""}</b>
                                }

                            </span>
                            <span>
                                Peso: &nbsp;
                                {isEditing ?
                                    <InputText type={'number'} min={0} size={'verysmall'} id={'peso'} name={'peso'} style={{ textAlign: 'center' }} value={consulta?.peso ? consulta.peso : ""} onChange={inputChange} />
                                    :
                                    <b>{consulta?.peso}</b>
                                }
                                &nbsp;kg

                                &nbsp;&nbsp;|&nbsp;&nbsp;

                                Tamanho: &nbsp;
                                {isEditing ?
                                    <InputText type={'number'} min={0} size={'verysmall'} id={'tamanho'} name={'tamanho'} style={{ textAlign: 'center' }} value={consulta?.tamanho ? consulta.tamanho : ""} onChange={inputChange} />
                                    :
                                    <b>{consulta?.tamanho}</b>
                                }
                                &nbsp;cm
                                &nbsp;&nbsp;
                                {isEditing ?
                                    <>
                                        <b>Anamnese:</b>&nbsp;&nbsp;
                                        <Select value={anamneseConsulta?.titulo} onChange={selectAnamneseTemplate}>
                                            <Option value={""}>Selecione</Option>
                                            {anamneseList.map((anamnese, idx) => {
                                                return (<Option key={idx} value={anamnese.titulo}>{anamnese.titulo}</Option>)
                                            })}
                                        </Select>
                                        &nbsp;&nbsp;
                                        {anamneseConsulta != null ? <button onClick={() => setShowAnamnese(true)}>Ver/Responder</button> : null}
                                    </>
                                    :
                                    <>
                                        <b>Anamnese:</b>&nbsp;&nbsp;
                                        <b>{anamneseConsulta?.titulo}</b>
                                        &nbsp;&nbsp;
                                        {anamneseConsulta != null ? <button onClick={() => setShowAnamnese(true)}>Ver/Responder</button> : null}
                                    </>
                                }
                            </span>
                            {showAnamnese &&
                                <div style={{ display: 'flex', position: 'absolute', width: '100vw', height: '100vh', top: 0, left: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(200,200,200,0.4)', zIndex: 2 }}>
                                    <AnamneseQuestoes
                                        anamnese={anamneseConsulta}
                                        updateAnamnese={(e, newAnamnese) => { if (newAnamnese != null) { setConsulta({ ...consulta, anamnese: newAnamnese }); setShowAnamnese(false) } }}
                                        construindo={false} respondendo={isEditing}
                                        anyAction={() => setShowAnamnese(false)}
                                    />
                                </div>
                            }
                            <br />
                            <span>Registro Clínico:</span>
                            {isEditing ?

                                <CKEditorA content={consulta?.registroGeral?.toString()}
                                    onChange={(event: any, editor: any) => ckeditorChange(editor.getData())} />
                                : <div
                                    style={{ backgroundColor: "var(--bg-input)", borderRadius: 4, paddingInline: 10, overflow: 'auto', maxHeight: 700, minWidth: 1000, }}
                                    dangerouslySetInnerHTML={{ __html: consulta != null && consulta.registroGeral != null ? consulta.registroGeral : "<p>Sem registro</p>" }} />
                            }

                        </div>
                        {isEditing && <Button size={'small'} onClick={() => registrarConsulta()}>Salvar</Button>}
                    </div>
                    <div className="consulta-detail-historico">
                        <div className="consulta-detail-historico-title">
                            <p>Histórico</p>
                        </div>
                        <div className="consulta-detail-historico-content">
                            {consultaList.length>0 && <Chart
                                style={{ boxShadow: '0 0 5px hsla(0,0%,0%,.1)' }}
                                chartType="LineChart"
                                data={dataChart}
                                width="100%"
                                height="200px"
                                options={{
                                    title: "Histórico de Peso e Altura",
                                    curveType: "function",
                                    legend: { position: "bottom" },
                                }}
                                legendToggle
                            />}
                            {/* {pesoHist.map(hist => (<>
                                                    <span>data: {moment(hist.data).format('DD/MM/YYYY')} </span>
                                                    <span>Peso: {hist.peso} kg </span>
                                                    <span>Tamanho: {hist.tamanho} cm </span><br/>
                                                </>)
                                    )} */}
                            {ultimaConsulta != null ? <>
                                <br />
                                <Label size={'small'} >Ultimo registro em: </Label>
                                <span> {moment(ultimaConsulta?.dtRegistro).format('DD/MM/YYYY HH:mm')}</span><br />
                                {/* <Label size={'small'} >Tipo de Consulta: </Label>
                            <span> {ultimaConsulta?.tipo}</span><br/>
                            <Label size={'small'} >Veterinário: </Label>
                            <span> {ultimaConsulta?.veterinario?.nome + " " + ultimaConsulta?.veterinario?.sobrenome}</span><br/>
                            <Label size={'small'} >Peso: </Label>
                            <span> {ultimaConsulta?.peso} kg</span><span> | </span>
                            <Label size={'small'} >Tamanho: </Label>
                            <span> {ultimaConsulta?.tamanho} cm</span><br/> */}
                                <Label size={'small'} >Histórico Veterinário: </Label><br />
                                <div style={{ backgroundColor: '#ffffff', padding: 6, borderRadius: 3, margin: 3, overflow: 'auto', maxHeight: 400, boxShadow: '0 0 5px hsla(0,0%,0%,.1)' }}
                                    dangerouslySetInnerHTML={{ __html: registroConsultaHist }} ></div>
                                <Label size={'small'} >Anamnese: </Label><br />
                                {ultimaConsulta?.anamnese != null ? <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <AnamneseQuestoes anamnese={ultimaConsulta.anamnese}
                                        construindo={false}
                                        respondendo={false}
                                        updateAnamnese={() => console.log()}
                                    />
                                </div>
                                    : null}
                            </>
                                :
                                <h5>Sem dados para apresentar.</h5>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}