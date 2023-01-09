import moment from "moment";
import { useEffect, useState } from "react"
import { Pet } from "../../../interfaces/Pet"
import { Consulta } from "../../../interfaces/Prontuario";
import { Responsavel } from "../../../interfaces/Responsavel";
import { Veterinario } from "../../../interfaces/Veterinario";
import { ApiProntuario } from "../../../services/ApiProntuario";
import { AnamneseQuestoes } from "../../utils/AnamneseQuestoes";
import { Button, TextArea } from "../../utils/HtmlComponents";
import './geral.css';

interface GeralProps {
    petProps:Pet|null;
    respProps?:Responsavel;
}

export function Geral(props:GeralProps) {

    const api = ApiProntuario();
    const [consulta, setConsulta] = useState<Consulta|null>(null);
    const [consultaList, setConsultaList] = useState<Consulta[]>();
    const [showHistConsulta, setShowHistConsulta] = useState<boolean>(true);

    const visualizarConsulta = (consult:Consulta) => {
        setConsulta(consult);
        setShowHistConsulta(false);
    }

    const findConsultasPet = async (petFind:Pet) => {
        setConsultaList([consultaTeste]);
        console.log(petFind.petID);
        if (petFind.petID != null) {
            let result = await api.listConsultasPet(petFind.petID.valueOf());
            console.log(result);
            if (result.status>=200 && result.status<=300) {
                setConsultaList(result.data);
            }
        }
        let consultaTmp = consultaList?.filter(cons => cons.petC?.petID === petFind.petID)
        console.log(petFind);
        if(consultaTmp!=null && consultaTmp.length===1) {
            setConsultaList(consultaTmp);
        }
    }

    useEffect(() => {
        if(props.petProps!=null) {
            findConsultasPet(props.petProps);
        }

    },[props.petProps])

    return (
        <div className="container-geral">
            {showHistConsulta?
                <div className="lista-consulta-container">
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginBottom:10}}>
                        <span><b>Histórico de consultas</b></span>&nbsp;
                        <Button>Novo Atendimento</Button>
                    </div>
                    <div className="tabela-lista-consulta">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ação</th>
                                    <th>Data de Registro</th>
                                    <th>Veterinario</th>
                                    <th>Peso</th>
                                    <th>Tamanho</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultaList?.map((consulta,idx) => {
                                                return (<tr key={idx}>
                                                            <td>    
                                                                <button >Imprimir</button>&nbsp;
                                                                <button onClick={() => visualizarConsulta(consulta)}>Visualizar</button>
                                                            </td>
                                                            <td>{moment(consulta.dtRegistro).format('DD/MM/yyyy')}</td>
                                                            <td>{consulta.veterinarioC?.nome}</td>
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
                    <Button onClick={() => setShowHistConsulta(true)}>Voltar</Button>
                    <br/>
                    <span>Tipo de Consulta:&nbsp;
                        <b>{consulta!=null?consulta.tipo:""}</b></span>
                    <span>Data de Regitro:&nbsp;
                        <b>{moment(consulta?.dtRegistro).format('DD/MM/yyyy')}</b></span>
                    <span>Paciente:&nbsp;<b>{consulta?.petC?.nome}</b></span>
                    <span>Médico Veterinário:&nbsp;<b>{consulta?.veterinarioC?.nome}</b></span>
                    <div>
                        <span>Peso: &nbsp;<b>{consulta?.peso}</b></span>&nbsp;|&nbsp;
                        <span>Tamanho: &nbsp;<b>{consulta?.tamanho}</b></span>
                    </div>
                    <span>Queixa do Responsável:</span>
                    <TextArea readOnly rows={3} value={consulta?.relatoResponsavel} />
                    <span>Registro de Veterinário:</span>
                    <TextArea readOnly rows={3} value={consulta?.registroGeral} />
                    <span style={{marginBottom:0}}><b>Anamnese:</b></span>
                    <AnamneseQuestoes 
                        anamnese={consulta?.anamnese!=null?consulta.anamnese:null}
                        updateAnamnese={(e,newAnamnese) => {if(newAnamnese!=null){setConsulta({...consulta, anamnese:newAnamnese})}}}
                        construindo={false}
                        />
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
    petC:petToto,
    veterinarioC:vetPedro,  
}
