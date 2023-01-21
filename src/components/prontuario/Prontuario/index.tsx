// @ts-ignore
import moment from "moment/min/moment-with-locales";
import React, { useEffect, useState } from 'react';
import { Pet_Resp } from '../../../interfaces/Pet';
import { LinkButton, Select, Option, Label, Button } from '../../utils/HtmlComponents';
import { Cirurgias } from '../Cirurgias';
import { Consultas } from '../Consultas';
import { Internacoes } from '../Internacoes';
import { Vacinas } from '../Vacinas';
import { ApiRegistro } from "../../../services/ApiRegistro";
import './prontuario.css';
import { Responsavel } from "../../../interfaces/Responsavel";
import { MdOutlineChangeCircle } from "react-icons/md";

interface ProntuarioProps {
    petR?:Pet_Resp
}

export function Prontuario(props:ProntuarioProps) {

    const api = ApiRegistro();
    const [selectedTab, setSelectedTab] = useState<string>("consultas");
    const [petExist, setPetExist] = useState<boolean>(true);
    const [petR, setPetR] = useState<Pet_Resp|null>(null);
    const [petList, setPetList] = useState<Pet_Resp[]>([]);
    const [showContatos, setShowContatos] = useState<boolean>(false);

    const getListPets = async () => {
        var list:any = await api.listResponsaveis();
        if (list != null && list?.status >= 200 && list?.status <= 300){
            let listRespTmp:Responsavel[] = list.data;
            let listPetTmp:any[] = listRespTmp.map(resp => resp.pets?.map(pet => {let pets:Pet_Resp = {pet:pet, responsavel:resp}; return(pets)}))
            let listTmpConcat:any[] = [];
            for (let i=0; i<listPetTmp.length; i++) {
                listTmpConcat = listTmpConcat.concat(listPetTmp[i]);
            };
            listTmpConcat = listTmpConcat.sort((a,b) => {
                        if(a.pet.nome == null || b.pet.nome == null){return 0;}
                        let fa = a.pet.nome.toLowerCase(),
                            fb = b.pet.nome.toLowerCase();

                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        if (fa === fb) {
                        return 0;
                        }
                        return 0;
                    } 
                );
            setPetList(listTmpConcat);
        } 
    };

    const selectPet = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(petR == null && e.target.value !== "") {
            setPetR(JSON.parse(e.target.value));
            setPetExist(true);
        } else {
            setPetR(null);
        }
    };

    const telefone_mask = (numero:String) => {
        let mask = "";
        if(numero.length==11) {
            mask = 
            "("+
            numero.substring(0,2)
            +") "+
            numero.substring(2,3)
            +" "+
            numero.substring(3,7)
            +"-"+
            numero.substring(7,12)
        } else if (numero.length==10) {
            mask = "("+
            numero.substring(0,2)
            +") "+
            numero.substring(2,6)
            +"-"+
            numero.substring(6,11)
        } else {
            mask=numero.toString();
        }
        return mask;
    };

    useEffect(() => {
        moment.locale('pt-br');
        if(props.petR?.pet == null && petR == null) {
            setPetExist(false);
            getListPets();
        } else {
            setPetExist(true)
            getListPets();
        };

    },[])

    return (
        <>
        {!petExist?
            <div className='modal-select-pet-overlay'>
                <div className='modal-select-pet'>
                    <p>Selecione o Pet!</p>
                    <Select onChange={selectPet} value={petR!=null?JSON.stringify(petR):""}>
                        <Option value={""}>Selecione o Pet</Option>
                        {petList.map((petr,idx) => { return (
                            <Option key={idx} value={JSON.stringify(petr)}>{petr.pet.nome + " - " + petr.responsavel.nome}</Option>
                        )})}
                    </Select>
                </div>
            </div>
        :
        <>
        <div className='consulta-container'>
            <div className='consulta-title'>
                <div className="consulta-title-responsavel">
                    <div style={{display:'flex', columnGap:15}}>
                        <Button size={'small'} onClick={() => {setPetR(null);setPetExist(false);setShowContatos(false)}}><MdOutlineChangeCircle size={22}/></Button>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
                            <span style={{marginTop:0, marginBottom:0}}>Responsável:</span>
                            <span style={{marginTop:0, marginBottom:8}}><b>{petR?.responsavel.nome + " " + petR?.responsavel.sobrenome}</b></span>
                            <Button size={'small'} onClick={() => setShowContatos(!showContatos)}>Ver Contatos</Button>  
                        </div>
                    </div>
                    <div>
                        {petR?.responsavel!=null && petR?.responsavel.contatos!=null && petR?.responsavel.contatos?.length>0?
                            <>
                            {showContatos && 
                                <div className="consulta-title-responsavel-contatos">
                                    <Label size={'small'} style={{marginTop:0, marginBottom:8}}><u>Contatos:</u></Label>
                                    {petR.responsavel.contatos.map((contato,idx) => {
                                        return (
                                            <div key={idx} style={{margin:'0px 0px 5px 0px'}}>
                                                {contato.principal?
                                                <div>
                                                    <b>
                                                    <span><b>{(idx+1)+"- "}</b>{contato.tipoContato}: </span>
                                                    <span><b>{Number(contato.descricao)&&contato.descricao!=null?telefone_mask(contato.descricao):contato.descricao}</b></span>
                                                    </b>
                                                </div> : 
                                                <div>
                                                    <span><b>{(idx+1)+"- "}</b>{contato.tipoContato}: </span>
                                                    <span><b>{Number(contato.descricao)&&contato.descricao!=null?telefone_mask(contato.descricao):contato.descricao}</b></span>
                                                </div>}
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            </>:
                            <Label size={'small'}>Sem contato registrado</Label>
                        }
                    </div>
                </div>
                <div className="consulta-title-pet">
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <img src="https://resources.diariolibre.com/images/binrepository/perro-labrador_14531788_20200809181008.jpg"
                             style={{height:90, width:90,objectFit: 'cover', objectPosition: '25% 25%', borderRadius:5, border:'solid 2px var(--border-color)'}}
                        />
                        <Label size={'big'} ><b>{petR?.pet.nome}</b></Label>
                    </div>
                    <div>
                        <Label size={'small'}>{petR?.pet.genero}</Label><span> de cor </span><Label size={'small'}>{petR?.pet.cor}</Label><br/>
                        <span>Nascimento: </span><Label size={'small'}>{moment(petR?.pet.nascimento).format('DD/MM/yyyy')} ({moment(petR?.pet.nascimento).add(1,'year').fromNow(true)})</Label><br/>
                        <Label size={'small'}>{petR?.pet.especie} ({petR?.pet.raca})</Label><br/>
                        <Label size={'small'}>{petR?.pet.fertil?"Fertil":"Estéril"}</Label><span> e </span><Label size={'small'}>{petR?.pet.pedigree?"Com Pedigree":"Sem Pedigree"}</Label>
                    </div>
                </div>
            </div>
            <div className='tab-container'>
                <div className={selectedTab==='consultas'?'tab-selected':'tab'}>
                    <LinkButton color={'dark'} size={'small'} onClick={() => setSelectedTab('consultas')}>Consultas</LinkButton>
                </div>
                <div className={selectedTab==='vacinas'?'tab-selected':'tab'}>
                    <LinkButton color={'dark'} size={'small'} onClick={() => setSelectedTab('vacinas')}>Vacinas</LinkButton>
                </div>
                <div className={selectedTab==='internacoes'?'tab-selected':'tab'}>
                    <LinkButton color={'dark'} size={'small'} onClick={() => setSelectedTab('internacoes')}>Internações</LinkButton>
                </div>
                <div className={selectedTab==='cirurgias'?'tab-selected':'tab'}>
                    <LinkButton color={'dark'} size={'small'} onClick={() => setSelectedTab('cirurgias')}>Cirurgias</LinkButton>
                </div>
            </div>
                <div className='tab-content'>
                    {selectedTab==='consultas'?<Consultas petProps={petR?.pet?petR.pet:null} />:null}
                    {selectedTab==='vacinas'?<Vacinas />:null}
                    {selectedTab==='internacoes'?<Internacoes />:null}
                    {selectedTab==='cirurgias'?<Cirurgias />:null}
                </div>
        </div>
        </>
        }
    </>
    )
}