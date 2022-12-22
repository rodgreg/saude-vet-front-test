import './formCadPet.css';
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from 'react';
import { Button } from '../utils/HtmlComponents';
import { Pet, Pet_Resp } from '../../interfaces/Pet';
import { ApiRegistro } from '../../services/ApiRegistro';
import { AxiosResponse } from 'axios';
import { Responsavel } from '../../interfaces/Responsavel';


interface formCadProps {
    petForm?: Pet_Resp;
}

export function FormCadPet(props:formCadProps) {

    const apiRegistro = ApiRegistro();
    const [petR,setPetR] = useState<Pet_Resp>({pet:{petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false},
                                                responsavel:{responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],}});
    const [pet, setPet] = useState<Pet>({petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false});
    const [responsavel, setResponsavel] = useState<Omit<Responsavel,"pets">>({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],});
    const [responsavelList, setResponsavelList] = useState<Omit<Responsavel,"pets">[]>([]);

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

    const formSubmit = async (e:any) => {
        e.preventDefault();
        let hasBlank = false;
        for (let i=0; i < e.target.length; i++) {
            if (e.target[i].value === '' && e.target[i].name !== '') {
              e.target[i].classList.add("shake")
              hasBlank = true;
            };
        };
        if (!hasBlank) {
            if(pet.petID != null) {
                let result:AxiosResponse<any,any> = await apiRegistro.updatePet(pet);
                if(result != null && result?.status >= 200 && result?.status <= 300) {
                    setPet(result?.data);
                };
            } else {
                if(responsavel.responsavelID != null) {
                    let result:AxiosResponse<any,any> = await apiRegistro.savePet(pet, responsavel.responsavelID);
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
            setPetR({pet:{petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false},
                    responsavel:{responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],}
                });
        };
    };

    const inputChangePet = (e:any) => {
        e.target.classList.remove("shake");
        if(e.target.type === "date") {
            setPet({...pet,[e.target.name]:moment(e.target.value).toISOString()});
        } else {
            setPet({...pet,[e.target.name]:e.target.value});
        };
    };

    const selectItemResp = (select:any) => {
        select.target.classList.remove("shake");
        if(select.target[select.target.selectedIndex].value != "") {
            setResponsavel(JSON.parse(select.target[select.target.selectedIndex].value))
        } else {
            setResponsavel({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],});
        };
    };

    const selectItemPet = (select:any) => {
        select.target.classList.remove("shake");
        setPet({...pet,[select.target.name]:select.target[select.target.selectedIndex].value})
    };

    const limparForm = () => {
        setPet({petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false});
        setResponsavel({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],})
        setPetR({pet:{petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false},
                responsavel:{responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],}
            });
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
        if (props.petForm!=null) {
            setPetR(props.petForm);
            setPet(props.petForm.pet);
            setResponsavel(props.petForm.responsavel);
        } else {
            setPetR({
                pet:{petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false},
                responsavel: {responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],},
            });
        }
        listResponsaveis();
    },[])

    return (
    <div className='container'>
        <div className='form_container_cad_pet'>
            <form className='form_cad_pet' onSubmit={formSubmit}>
                <h2>Cadastrar Pet</h2>
                    <span>Responsável: </span>
                    <select onChange={selectItemResp} name={'responsavel'} value={responsavel?JSON.stringify(responsavel):""}>
                        <option key={-1} value={""}>Selecione</option>
                        {responsavelList.length>0? 
                            responsavelList.map((resp,idx) => 
                                <option key={idx} value={JSON.stringify(resp)}>{resp?.nome+' '+resp?.sobrenome}</option>
                            )
                            :null
                        } 
                            </select>
                    <span>Nome: </span>
                    <input type={'text'} name={'nome'} value={pet?.nome?pet.nome.toString():""} onChange={inputChangePet}/>
                    <div style={{display:'grid', gridTemplateColumns:'40% 30% 20%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Sexo: </span>
                            <select onChange={selectItemPet} name={'genero'} value={pet?.genero?pet.genero.toString():""}>
                                <option value={""}>Selecione</option>
                                <option value={"Fêmea"}>Fêmea</option>
                                <option value={"Macho"}>Macho</option>
                            </select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Espécie: </span>
                            <select onChange={selectItemPet} name={'especie'} value={pet?.especie?pet.especie.toString():""}>
                                <option value={""}>Selecione</option>
                                <option value={"Cachorro"}>Cachorro</option>
                                <option value={"Gato"}>Gato</option>
                            </select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Raça: </span>
                            <select onChange={selectItemPet} name={'raca'} value={pet?.raca?pet.raca.toString():""}>
                                <option value={""}>Selecione</option>
                                <option value={"Vira-Lata"}>Vira-Lata</option>
                                <option value={"Labrador"}>Labrador</option>
                                <option value={"BullTerrie"}>Bullterrie</option>
                                <option value={"Teste"}>Teste</option>
                                <option value={"Sei não"}>Sei não</option>
                            </select>
                        </div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'40% 50%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Cor: </span>
                            <input type={'text'} name={'cor'} value={pet?.cor?pet.cor.toString():""} onChange={inputChangePet}/>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Data de Nascimento: </span>
                            <input type={'date'} name={'nascimento'} value={pet?.nascimento?moment(pet?.nascimento).format('yyyy-MM-DD'):""}
                                                                    max={moment().format('yyyy-MM-DD')} onChange={inputChangePet}/>
                        </div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'40% 40%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Fertilidade: </span>
                            <select onChange={selectItemPet} name={'fertil'} value={pet?.fertil!=null?pet.fertil.toString():""}>
                                <option value={""}>Selecione</option>
                                <option value={"true"}>Sim</option>
                                <option value={"false"}>Não</option>
                            </select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Pedigree: </span>
                            <select onChange={selectItemPet} name={'pedigree'} value={pet?.pedigree!=null?pet.pedigree.toString():""}>
                                <option value={""}>Selecione</option>
                                <option value={"true"}>Sim</option>
                                <option value={"false"}>Não</option>
                            </select>
                        </div>
                    </div>
                <div>
                    <Button type='submit'>{pet?.petID!=null?"Alterar":"Salvar"}</Button>
                    {pet?.petID!=null?
                                    <Button type='button' color={'light_danger'} 
                                            onClick={() => removerPet()}>Remover</Button>:""}
                    <Button type='button' color={'light_cancel'} >Voltar</Button>
                    <Button type='button' color={'light_cancel'} onClick={() => limparForm()} >Limpar</Button>
                </div>
            </form>

        </div>
        <div className='dados_container_pet'>
            <div className='dados_pet'>
                <h2>Dados do Pet</h2>
                <div className='dados_pet_item'>
                    <span>{pet?.nome}</span>
                    <span>{pet?.nome==null?null:pet?.petID!=null?"Salvo":"Não salvo"}</span>
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