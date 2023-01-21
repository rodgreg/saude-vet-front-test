import moment from "moment";
import React, { useEffect, useState } from "react"
import { Pet } from "../../../interfaces/Pet"
import { Anamnese, Consulta } from "../../../interfaces/Prontuario";
import { Responsavel } from "../../../interfaces/Responsavel";
import { Veterinario } from "../../../interfaces/Veterinario";
import { ApiProntuario } from "../../../services/ApiProntuario";
import { AnamneseQuestoes } from "../../utils/AnamneseQuestoes";
import { Button, Select, TextArea, Option, InputDate, InputText, LinkButton } from "../../utils/HtmlComponents";
import { HiEye, HiPrinter } from "react-icons/hi";
import './consulta.css';
import { MdAddCircleOutline, MdArrowBack, MdEdit } from "react-icons/md";
import { AxiosResponse } from "axios";
import { ApiRegistro } from "../../../services/ApiRegistro";

interface ConsultaProps {
    petProps:Pet|null;
    respProps?:Responsavel;
}

export function Consultas(props:ConsultaProps) {

    const api = ApiProntuario();
    const apiRegistro = ApiRegistro();
    const [consulta, setConsulta] = useState<Consulta|null>(null);
    const [consultaList, setConsultaList] = useState<Consulta[]>([]);
    const [showHistConsulta, setShowHistConsulta] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [vetList, setVetList] = useState<Veterinario[]>([]);
    const [anamneseList, setAnamneseList] = useState<Anamnese[]>([]);
    const [anamneseConsulta, setAnamneseConsulta] = useState<Anamnese|null>(null);
    const [showAnamnese, setShowAnamnese] = useState<boolean>(false);

    const registrarConsulta = async () => {
        if(consulta?.anamnese!=null) {

            let result:AxiosResponse
            if(consulta.consultaID == null) {
                result = await api.saveConsultaPet(consulta);
            } else {
                result = await api.updateConsultaPet(consulta);
            }
            if(result.status>=200 && result.status<=300) {
                setShowHistConsulta(true);
                setConsulta({peso:"", registroGeral:"", relatoResponsavel:"", tamanho:"", tipo:"", pet:consulta?.pet});
                setAnamneseConsulta(null);
                if(props.petProps!=null) {
                    findConsultasPet(props.petProps);
                }
            }
        }
    }

    const visualizarConsulta = (consult:Consulta) => {
        setConsulta(consult);
        setAnamneseConsulta(consult.anamnese?consult.anamnese:null);
        setShowHistConsulta(false);
        setIsEditing(false);
    }

    const findConsultasPet = async (petFind:Pet) => {
        if (petFind.petID != null) {
            let result = await api.listConsultasPet(petFind.petID.valueOf());
            if (result.status>=200 && result.status<=300) {
                let consListTemp:Consulta[] = result.data;
                consListTemp = consListTemp.sort((a,b) => {
                    if(a.dtRegistro == null || b.dtRegistro == null){return 0;}
                    let d1 = a.dtRegistro;
                    let d2 = b.dtRegistro;
                    if(d1>d2){
                        return -1;
                    }
                    if(d1<d2){
                        return 1;
                    }
                     return 0;
                })
                setConsultaList(consListTemp);
            }
        }
        let consultaTmp = consultaList?.filter(cons => cons.pet?.petID === petFind.petID)
        if(consultaTmp!=null && consultaTmp.length===1) {
            setConsultaList(consultaTmp);
        }
    }

    const getListVet = async () => {
        let listResult:AxiosResponse = await apiRegistro.listVeterinarios();
        if(listResult.status>=200 && listResult.status<=300) {
            setVetList(listResult.data);
        }
    }

    const getListAnamense = async () => {
        let listResult:AxiosResponse = await api.listTemplateAnamnese();
        if(listResult.status>=200 && listResult.status<=300) {
            setAnamneseList(listResult.data);
        }
    }

    const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === 'date') {
            setConsulta({...consulta,[e.target.name]:moment(e.target.value).toISOString()});
        } else {
            setConsulta({...consulta,[e.target.name]:e.target.value});
        }
    }

    const textAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setConsulta({...consulta,[e.target.name]:e.target.value});
    }

    const selectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.name === "veterinario" && e.target.value !== "") {
            let vetSelected = vetList.find(vet => vet.veterinarioID == Number(e.target.value));
            setConsulta({...consulta, [e.target.name]:vetSelected});
        } else {
            setConsulta({...consulta, [e.target.name]:e.target.value})
        }
    }

    const selectAnamneseTemplate = (e:React.ChangeEvent<HTMLSelectElement>) => {
        let anamneseSelected:Anamnese = anamneseList.filter(anamn => anamn.titulo === e.target.value)[0];
        setAnamneseConsulta(anamneseSelected);
    } 

    const btnNovaConsulta = async () => {
        setShowHistConsulta(false);
        setIsEditing(true);
        await getListVet();
        await getListAnamense();
        setConsulta({...consulta,pet:props.petProps})
    }

    const btnEditConsulta = async () => {
        if(isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
            await getListVet();
            await getListAnamense();
        }
    }

    useEffect(() => {
        if(props.petProps!=null) {
            if(consulta?.consultaID != null) {
                if(isEditing) {
                    setShowHistConsulta(false);
                    setConsulta({...consulta, pet:props.petProps});
                    getListVet();
                    getListAnamense();
                }
            } else {
                if(isEditing) {
                    setConsulta({peso:"", registroGeral:"", relatoResponsavel:"", tamanho:"", tipo:"", pet:props.petProps});
                    getListVet();
                    getListAnamense();
                }
                findConsultasPet(props.petProps);
            }
        }

    },[props.petProps])

    return (
        <div className="container-geral">
            {showHistConsulta?
                <div className="lista-consulta-container">
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginBottom:10}}>
                        <span><b>Histórico de consultas</b></span> &nbsp;
                        <Button onClick={() => {btnNovaConsulta()}} ><MdAddCircleOutline size={20} /></Button>
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
                                {consultaList?.map((consulta,idx) => {
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
                    <div style={{display:'flex'}}>
                        <Button size={'small'} onClick={() => {setShowHistConsulta(true);setConsulta({peso:"", registroGeral:"", relatoResponsavel:"", tamanho:"", tipo:"", pet:consulta?.pet});setAnamneseConsulta(null)}}><MdArrowBack size={18}/></Button>
                        {consulta?.consultaID!=null && <Button size={'small'} onClick={() => {btnEditConsulta()}}><MdEdit size={18}/></Button>}
                    </div>
                    <br/>
                    <span>Tipo de Consulta:&nbsp;
                        {isEditing? 
                            <Select id="tipo" name="tipo" value={consulta!=null?consulta.tipo:""} onChange={selectChange}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"Clínica Geral"}>Clínica Geral</Option>
                                <Option value={"Dermato"}>Dermato</Option>
                                <Option value={"Odonto"}>Odonto</Option>
                            </Select>
                            :
                            <b>{consulta!=null?consulta.tipo:""}</b>
                        }
                        &nbsp;&nbsp;&nbsp;
                        Data de Regitro:&nbsp;
                        {isEditing?
                            <InputDate id="dtRegistro" name="dtRegistro" type={'date'} max={moment(new Date()).format('yyyy-MM-DD')} onChange={inputChange}
                                    value={consulta?.dtRegistro!=null?moment(consulta?.dtRegistro).format("yyyy-MM-DD"):moment(new Date()).format("yyyy-MM-DD")}/>
                            :
                            <b>{consulta!=null?moment(consulta?.dtRegistro).format("DD/MM/yyyy HH:mm"):""}</b>
                        }
                        
                    </span>
                    <span>Médico Veterinário:&nbsp;
                    {isEditing? 
                        <Select id="veterinario" name="veterinario" value={consulta?.veterinario?.veterinarioID?.valueOf()} onChange={selectChange}>
                            <Option value={""}>Selecione</Option>
                            {vetList.map((vet,idx) => {
                                return ( <Option key={idx} value={vet.veterinarioID?.valueOf()}>{vet.nome} {vet.sobrenome}</Option> )
                            })}
                        </Select>
                        :
                        <b>{consulta!=null?consulta?.veterinario?.nome+" "+consulta?.veterinario?.sobrenome:""}</b>
                    }
                    &nbsp;&nbsp;
                    Peso: &nbsp;
                    {isEditing?
                        <InputText type={'number'} min={0} size={'verysmall'} id={'peso'} name={'peso'} style={{textAlign:'center'}} value={consulta?.peso?consulta.peso:""} onChange={inputChange}/>
                        :
                        <b>{consulta?.peso}</b>
                    }
                    &nbsp;kg

                    &nbsp;&nbsp;|&nbsp;&nbsp;

                    Tamanho: &nbsp;
                    {isEditing?
                        <InputText type={'number'} min={0} size={'verysmall'} id={'tamanho'} name={'tamanho'} style={{textAlign:'center'}} value={consulta?.tamanho?consulta.tamanho:""} onChange={inputChange}/>
                        :
                        <b>{consulta?.tamanho}</b>
                    }
                    &nbsp;cm</span>
                    <span>Queixa do Responsável:</span>
                    <TextArea disabled={!isEditing} id={'relatoResponsavel'} name={'relatoResponsavel'} rows={3} value={consulta?.relatoResponsavel} onChange={textAreaChange} />
                    <span>Registro de Veterinário:</span>
                    <TextArea disabled={!isEditing} id={'registroGeral'} name={'registroGeral'} rows={3} value={consulta?.registroGeral} onChange={textAreaChange} />
                    <span style={{marginBottom:0}}><b>Anamnese:</b>&nbsp;&nbsp;
                    {anamneseConsulta!=null?<button onClick={() => setShowAnamnese(true)}>Ver/Responder</button>:null}
                    </span><br/>
                    {isEditing? 
                        <div style={{display:'flex'}}>
                            <Select value={anamneseConsulta?.titulo} onChange={selectAnamneseTemplate}>
                                <Option value={""}>Selecione</Option>
                                {anamneseList.map((anamnese,idx) => {
                                    return (<Option key={idx} value={anamnese.titulo}>{anamnese.titulo}</Option>)
                                })}
                            </Select>
                        </div>
                        :
                        null
                    }
                    {showAnamnese &&
                        <div style={{display:'flex', position:'absolute', width:'100vw', height:'100vh', top:0, left:0, alignItems:'center', justifyContent:'center', backgroundColor:'rgb(200,200,200,0.4)'}}>
                            <AnamneseQuestoes 
                                anamnese={anamneseConsulta}
                                updateAnamnese={(e,newAnamnese) => {if(newAnamnese!=null){setConsulta({...consulta, anamnese:newAnamnese});setShowAnamnese(false)}}}
                                construindo={false} respondendo={isEditing}
                                anyAction={() => setShowAnamnese(false)}
                                />
                        </div>
                    }
                    {isEditing && <Button size={'small'} onClick={() => registrarConsulta()}>Salvar</Button>}

                </div>
            }
        </div>
    )
}

// Teste
const petToto:Pet = {
    petID:88,
    nome:'Totó',
    cor:'Pardo',
    especie:'Cachorro',
    fertil:true,
    genero:'Macho',
    nascimento:new Date(2020,2,24),
    pedigree:false,
    raca:'Vira-Lata',
    dataRegistro:new Date(2022,11,26),
}

const vetPedro:Veterinario = {
    veterinarioID:1,
    nome:'Pedro',
    sobrenome:'Gomes',
    cidade:'Brasília',
    cpf:'87493202343',
    genero:'Masculino',
    uf:'DF',
    dataRegistro:new Date(2022,11,26),
    crmvs:[{area:'Medicina Veterinária', crmvID:1, dataRegistro:new Date(2013,3,21), numero:'123332', uf:'DF'}]
}

const consultaTeste:Consulta = {
    consultaID:1,
    tipo:'Clínica Geral',
    dtRegistro:new Date(),
    anamnese:{
                dtRegistro: new Date(),
                questoes: [{
                            tipo:'text',
                            label:'Qual a queixa?',
                            descricao:'',
                            options:[],
                            resposta:'',
                        },
                        {
                            tipo:'date',
                            label:'Quando iniciou?',
                            descricao:'',
                            options:[],
                            resposta:'',
                        },
                        {
                            tipo:'select',
                            label:'Realizou terapia?',
                            descricao:'',
                            options:['sim','não'],
                            resposta:'',
                        },
                        {
                            tipo:'select',
                            label:'Realizou terapia?',
                            descricao:'Teste Descrição.',
                            options:['sim','não', 'talvez'],
                            resposta:'',
                        },
                        ],
            },
    peso:'13 kg',
    tamanho:'34 cm',
    relatoResponsavel:'Diarreia e prostação.',
    registroGeral:'Cachorro com sinais de desidratação e suspeita de infecção intestinal.',
    pet:petToto,
    veterinario:vetPedro,  
}
