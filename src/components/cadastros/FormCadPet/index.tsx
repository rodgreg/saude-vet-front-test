import './formCadPet.css';
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import React, { useEffect, useRef, useState } from 'react';
import { Button, Label, Select, Option, InputText, InputDate } from '../../utils/HtmlComponents';
import { Pet, Pet_Resp } from '../../../interfaces/Pet';
import { ApiRegistro } from '../../../services/ApiRegistro';
import { AxiosResponse } from 'axios';
import { Responsavel } from '../../../interfaces/Responsavel';
import { Especie, Raca } from '../../../interfaces/Util';
import { ApiUtil } from '../../../services/ApiUtil';
import { MdRemove, MdUpload } from 'react-icons/md';

interface formCadProps {
    petForm?: Pet_Resp;
}

export function FormCadPet(props:formCadProps) {

    const apiRegistro = ApiRegistro();
    const apiUtil = ApiUtil();
    const inputFileRef = useRef<HTMLInputElement|null>(null);
    const [petR,setPetR] = useState<Pet_Resp>({pet:{petID:null ,nome:"", genero:"", raca:null, cor:"", nascimento:null, fertil:false, pedigree:false},
                                                responsavel:{responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],}});
    const [pet, setPet] = useState<Pet>({petID:null ,nome:"", genero:"", raca:null, cor:"", nascimento:null, fertil:false, pedigree:false});
    const [responsavel, setResponsavel] = useState<Omit<Responsavel,"pets">>({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],});
    const [responsavelList, setResponsavelList] = useState<Omit<Responsavel,"pets">[]>([]);
    const [listEspecie, setListEspecie] = useState<Especie[]>([]);
    const [listRaca, setListRaca] = useState<Raca[]>([]);
    const [listRacaFiltered, setListRacaFiltered] = useState<Raca[]>([]);

    const [petPerfilImg, setPetPerfilImg] = useState<File|null>(null);
    const [imgDefault, setImgDefault] = useState<string>("src\\assets\\Logo exemplo.jpg");

    const listResponsaveis = async () => {
        var list:any = await apiRegistro.listResponsaveis();
        if (list?.status >= 200 && list?.status <= 300){
            let listResponsavelTmp:Omit<Responsavel,"pets">[]= list.data;
            // let listResponsavelTmp = listTeste;
            listResponsavelTmp = listResponsavelTmp.sort((a,b) => {
                        if(a.nome == null || b.nome == null){return 0;}
                        let fa = a.nome.toLowerCase(),
                            fb = b.nome.toLowerCase();

                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        if (fa === fb) {
                        let la = a?.nome?.toLowerCase(),
                            lb = b?.nome?.toLowerCase();
                        
                        if (la < lb) {
                            return -1;
                        }
                        if (la > lb) {
                            return 1;
                        }
                        return 0;
                        }
                        return 0;
                    } 
                );

            // Monta Lista Responsável.
            setResponsavelList(listResponsavelTmp);
        } else {
    
        }
    };

    const getImgPetPerfil = async () => {
        if (props.petForm?.pet.petID!=null) {
            setImgDefault('http://localhost:8765/registro/pet/imgPerfil/'+props.petForm?.pet.petID)
        }
    };

    const formSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasBlank = false;
        for (let i=0; i < e.target.length; i++) {
            if (e.target[i].getAttribute('value') === '' && e.target[i].getAttribute('name') !== '') {
              e.target[i].classList.add("shake")
              hasBlank = true;
            };
        };
        if (!hasBlank) {
            if(pet.petID != null) {
                let result:AxiosResponse<any,any> = await apiRegistro.updatePet(pet, petPerfilImg);
                if(result != null && result?.status >= 200 && result?.status <= 300) {
                    setPet(result?.data);
                    console.log(result.data);
                };
            } else {
                if(responsavel.responsavelID != null) {
                    let result:AxiosResponse<any,any> = await apiRegistro.savePet(pet, responsavel.responsavelID, petPerfilImg);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        setPet(result?.data);
                    };
                }
            };
        };
    };

    const removerPet = async () => {
        if(pet!=null){
            await apiRegistro.deletePet(pet);
           limparForm();
        };
    };

    const inputChangePet = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("shake");
        if(e.target.type === "date") {
            setPet({...pet,[e.target.name]:moment(e.target.value).toISOString()});
        } else if (e.target.type === "file") {
            let file = e.target.files;
            if(file!=null&&file?.length>0){
                let type = file[0].type.split('/')[1];
                let size = file[0].size;
                if((type==="png" || type==="jpg" || type==="jpeg")&&(size<(102400))) {
                    setPetPerfilImg(file[0]);
                    setImgDefault(URL.createObjectURL(file[0]));
                } else {
                    console.log(type+" não é aceito! ou o tamanho está maior que o permitido de 100kb: "+size);
                }
            } else {
            }
        } else {
            setPet({...pet,[e.target.name]:e.target.value});
        };
    };

    const selectItemResp = (select:React.ChangeEvent<HTMLSelectElement>) => {
        select.target.classList.remove("shake");
        if(select.target.value != "") {
            setResponsavel(JSON.parse(select.target.value))
        } else {
            setResponsavel({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],});
        };
    };

    const selectItemPet = (select:React.ChangeEvent<HTMLSelectElement>) => {
        select.target.classList.remove("shake");
        if(select.target.name === 'especie') {
            let filteredRaca = listRaca.filter(raca => raca.especie.nome === select.target.value)
            setListRacaFiltered(filteredRaca);
        } else if(select.target.name === 'raca' && select.target.value!=="") {
            setPet({...pet,[select.target.name]:JSON.parse(select.target.value)});
        } else {
            setPet({...pet,[select.target.name]:select.target.value});
        }
    };

    const limparForm = () => {
        setPet({petID:null ,nome:"", genero:"", raca:null, cor:"", nascimento:null, fertil:false, pedigree:false});
        setResponsavel({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],})
        setPetR({pet:{petID:null ,nome:"", genero:"", raca:null, cor:"", nascimento:null, fertil:false, pedigree:false},
                responsavel:{responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],}
        });
        setPetPerfilImg(null);
        if(inputFileRef.current!=null) {
            inputFileRef.current.value = "src\\assets\\Logo exemplo.jpg";
        }
        setImgDefault("src\\assets\\Logo exemplo.jpg");
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

    const listUtilForm = async () => {
        let espResult:AxiosResponse = await apiUtil.listEspecies();
        if (espResult.status >=200 && espResult.status <=300) {
            setListEspecie(espResult.data);
        }
        let racaResult:AxiosResponse = await apiUtil.listRacas();
        if (racaResult.status >=200 && racaResult.status <=300) {
            setListRaca(racaResult.data);
            if(props.petForm?.pet.raca?.especie.nome!=null) {
                let filteredRaca:Raca[] = racaResult.data;
                filteredRaca = filteredRaca.filter(raca => raca.especie.nome === props.petForm?.pet.raca?.especie.nome);
                setListRacaFiltered(filteredRaca);
            }
        }
    };

    useEffect(() => {
        moment.locale('pt-br');
        if (props.petForm!=null) {
            setPetR(props.petForm);
            setPet(props.petForm.pet);
            setResponsavel(props.petForm.responsavel);
        } else {
            setPetR({
                pet:{petID:null ,nome:"", genero:"", raca:null, cor:"", nascimento:null, fertil:false, pedigree:false},
                responsavel: {responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],},
            });
        }
        listResponsaveis();
        listUtilForm();
        getImgPetPerfil();
    },[props.petForm])

    return (
    <div className='container'>
        <div className='form_container_cad_pet'>
            <form className='form_cad_pet' onSubmit={formSubmit}>
                <h2>Cadastrar Pet</h2> 
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='responsavel' size={'medium'} >Responsável: </Label>
                            <Select size={'big'} onChange={selectItemResp} id='responsavel' name={'responsavel'} value={responsavel?JSON.stringify(responsavel):""}>
                                <Option size={'medium'} key={-1} value={""}>Selecione</Option>
                                {responsavelList.length>0? 
                                    responsavelList.map((resp,idx) => 
                                        <option key={idx} value={JSON.stringify(resp)}>{resp?.nome+' '+resp?.sobrenome}</option>
                                    )
                                    :null
                                } 
                            </Select>
                        </div>              
                        <div className='upload-perfil-img'>
                            <img src={imgDefault} 
                                style={{height:90, width:90,objectFit: 'cover', objectPosition: 'center', borderRadius:5, border:'solid 2px var(--border-color)'}} />
                            <div className='upload-perfil-img-button'>
                                {petPerfilImg == null && imgDefault!=='http://localhost:8765/registro/pet/imgPerfil/'+props.petForm?.pet.petID? 
                                                <>
                                                    <label htmlFor='petPerdilImg' >Adicione <MdUpload size={22} /></label>
                                                    <input ref={inputFileRef} type={'file'} name="petPerdilImg" id="petPerdilImg" onChange={inputChangePet} accept="image/png, image/jpeg, image/jpg"/>
                                                </>
                                                :null
                                }
                                {petPerfilImg != null || imgDefault==='http://localhost:8765/registro/pet/imgPerfil/'+props.petForm?.pet.petID? 
                                                <button type='button' onClick={() => {setPetPerfilImg(null); setImgDefault("src\\assets\\Logo exemplo.jpg");if(inputFileRef.current!=null){inputFileRef.current.value = ""};}}>Remover<MdRemove size={22}/></button>
                                                :null
                                }
                            </div>
                        </div>
                    </div>
                    <Label htmlFor='nome' size={'medium'} >Nome: </Label>
                    <InputText size={'max'} type={'text'} id='nome' name={'nome'} value={pet?.nome?pet.nome.toString():""} onChange={inputChangePet}/>
                    <div style={{display:'grid', gridTemplateColumns:'40% 30% 20%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='genero' size={'medium'} >Sexo: </Label>
                            <Select size={'big'} onChange={selectItemPet} id='genero' name={'genero'} value={pet?.genero?pet.genero.toString():""}>
                                <Option size={'medium'} value={""}>Selecione</Option>
                                <Option size={'medium'} value={"Fêmea"}>Fêmea</Option>
                                <Option size={'medium'} value={"Macho"}>Macho</Option>
                            </Select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='especie'>Espécie: </Label>
                            <Select size={'big'} id='especie' onChange={selectItemPet} name={'especie'} value={pet?.raca?.especie.nome?pet?.raca?.especie.nome.toString():""}>
                                <Option value={""}>Selecione</Option>
                                {listEspecie.map((especie,idx) => {
                                    return (
                                        <Option key={idx} value={especie.nome}>{especie.nome}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='raca' size={'medium'}>Raça: </Label>
                            <Select size={'big'} id='raca' onChange={selectItemPet} name={'raca'} value={pet?.raca?JSON.stringify(pet.raca):""}>
                                <Option value={""}>Selecione</Option>
                                {listRacaFiltered.map((raca,idx) => {
                                    return (
                                        <Option key={idx} value={JSON.stringify(raca)}>{raca.nome}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'40% 50%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='cor'>Cor: </Label>
                            <InputText size={'max'} id='cor' type={'text'} name={'cor'} value={pet?.cor?pet.cor.toString():""} onChange={inputChangePet}/>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='nascimento'>Data de Nascimento: </Label>
                            <InputDate type={'date'} id='nascimento' name={'nascimento'} value={pet?.nascimento?moment(pet?.nascimento).format('yyyy-MM-DD'):""}
                                                                    max={moment().format('yyyy-MM-DD')} onChange={inputChangePet}/>
                        </div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'40% 40%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='fertil'>Fertilidade: </Label>
                            <Select onChange={selectItemPet} id='fertil' name={'fertil'} value={pet?.fertil!=null?pet.fertil.toString():""}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"true"}>Sim</Option>
                                <Option value={"false"}>Não</Option>
                            </Select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='pedigree'>Pedigree: </Label>
                            <Select onChange={selectItemPet} id='pedigree' name={'pedigree'} value={pet?.pedigree!=null?pet.pedigree.toString():""}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"true"}>Sim</Option>
                                <Option value={"false"}>Não</Option>
                            </Select>
                        </div>
                    </div>
                <div style={{display:'flex', flexDirection:'row', marginTop:'30px'}}>
                    
                    <Button type='submit'>{pet?.petID!=null?"Alterar":"Salvar"}</Button>
                    {pet?.petID!=null?
                                    <Button type='button' color={'red'} 
                                            onClick={() => removerPet()}>Remover</Button>:""}
                    <Button type='button' color={'gray'} >Voltar</Button>
                    <Button type='button' color={'gray'} onClick={() => limparForm()} >Limpar</Button>
                </div>
            </form>

        </div>
        <div className='dados_container_pet'>
            <div className='dados_pet'>
                <h2>Dados do Pet</h2>
                <div className='dados_pet_item'>
                    <span>{pet?.nome}</span>
                    <span>{pet?.nome==""?null:pet?.petID!=null?"Salvo":"Não salvo"}</span>
                </div>
                <h2>Responsável</h2>
                {responsavel?.responsavelID != null &&
                    <div className='dados_pet_item'>
                        <span>{responsavel?.nome+" "+responsavel?.sobrenome}</span>
                    </div>
                }
                <h2>Endereços</h2>
                {responsavel?.enderecos?.map((endereco, idx) => {return (
                    <div key={idx} className='dados_pet_item'>
                        <span>{endereco.tipoEndereco}</span>
                        <span>{endereco.cidade}/{endereco.uf}</span>
                    </div>
                )
                })}
                <h2>Contatos</h2>
                {responsavel?.contatos?.map((contato,idx) => {return (
                    <div key={idx} className='dados_pet_item'>
                        <span>{contato.tipoContato}</span>
                        <span>{(contato.tipoContato !== 'E-mail' && contato.tipoContato !== 'Outro')?(contato.descricao?telefone_mask(contato.descricao):""):contato.descricao}</span>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
    )
}