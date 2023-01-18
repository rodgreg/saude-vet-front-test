import './formCadResponsavel.css';
import { Responsavel, Endereco, Contato } from '../../../interfaces/Responsavel';
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from 'react';
import { Button, InputText, Label, Select, Option, InputDate } from '../../utils/HtmlComponents';
import { Pet } from '../../../interfaces/Pet';
import { MdEdit, MdDeleteOutline, MdSearch } from "react-icons/md";
import { ApiConsultaCep } from '../../../services/ApiConsultaCep';
import { ApiRegistro } from '../../../services/ApiRegistro';
import { AxiosResponse } from 'axios';
import { ApiUtil } from '../../../services/ApiUtil';
import { Especie, Raca } from '../../../interfaces/Util';


interface formCadProps {
    responsavelForm?: Responsavel;
}

export function FormCadResponsavel(props:formCadProps) {

    const apiCep = ApiConsultaCep();
    const apiRegistro = ApiRegistro();
    const apiUtil = ApiUtil();
    const [responsavel, setResponsavel] = useState<Responsavel>({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, pets: [], enderecos: [], contatos: [],});
    const [pet,setPet] = useState<Pet>({petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false});
    const [endereco, setEndereco] = useState<Endereco>({enderecoID:null, tipoEndereco:"", cep:"", logradouro:"", numero:"", endereco:"", complemento:"", bairro:"", cidade:"", uf:""});
    const [contato, setContato] = useState<Contato>({contatoID:null, tipoContato:"", principal:false, descricao:"", anotacao:""});
    const [addEndereco, setAddEndereco] = useState<Boolean>(false);
    const [addContato, setAddContato] = useState<Boolean>(false);
    const [addPet, setAddPet] = useState<Boolean>(false);
    const [indexPet, setIndexPet] = useState<number>(-1)
    const [indexContato, setIndexContato] = useState<number>(-1)
    const [indexEndereco, setIndexEndereco] = useState<number>(-1)
    const [listEspecie, setListEspecie] = useState<Especie[]>([]);
    const [listRaca, setListRaca] = useState<Raca[]>([]);
    const [listRacaFiltered, setListRacaFiltered] = useState<Raca[]>([]);

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
            if(responsavel.responsavelID == null) {
                let result:AxiosResponse<any,any> = await apiRegistro.saveResponsavel(responsavel);
                if(result != null && result?.status >= 200 && result?.status <= 300) {
                    setResponsavel(result?.data);
                };
            } else {
                let result:AxiosResponse<any,any> = await apiRegistro.updateResponsavel(responsavel);
                if(result != null && result?.status >= 200 && result?.status <= 300) {
                    setResponsavel(result?.data);
                };
            };
        };
    };

    const removeResponsavel = async () => {
        let result:AxiosResponse<any,any> = await apiRegistro.deleteResponsavel(responsavel);
        setResponsavel({
            responsavelID:null,
            nome: "",
            sobrenome: "",
            genero:"",
            tipoPessoa:"",
            tipoRegistro:"",
            registroNum:"",
            nascimento:null,
            aceitaEmail:false,
            pets: [],
            enderecos: [],
            contatos: [],

        })
    };

    const addPetToResponsavel = async (e:any) => {
        e.preventDefault();
        let hasBlank = false;
        for (let i=0; i < e.target.length; i++) {
            if (e.target[i].value === '' && e.target[i].name !== '') {
              e.target[i].classList.add("shake")
              hasBlank = true;
            } else {
                e.target[i].classList.remove("shake")
            };
        };
        if (!hasBlank) {
            if(responsavel.responsavelID != null) {
                if(pet.petID == null) {
                    let result:AxiosResponse<any,any> = await apiRegistro.savePet(pet, responsavel.responsavelID);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        responsavel.pets?.push(result.data)
                    };
                } else {
                    let result:AxiosResponse<any,any> = await apiRegistro.updatePet(pet);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        let petTmp:any = responsavel.pets?.filter(petI => petI.petID === pet.petID);
                        responsavel.pets?.splice(responsavel.pets.indexOf(petTmp[0]),1,result.data);
                    };
                };
            };
            setPet({petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false})
            setAddPet(false);
            setIndexPet(-1);
        }
    };

    const addEnderecoToResponsavel = async (e:any) => {
        e.preventDefault();
        let hasBlank = false;
        for (let i=0; i < e.target.length; i++) {
            if (e.target[i].value === '' && e.target[i].name !== ''  && e.target[i].name !== 'complemento') {
              e.target[i].classList.add("shake")
              hasBlank = true;
            } else {
                e.target[i].classList.remove("shake")
            };
        };
        if (!hasBlank) {
            if(responsavel.responsavelID != null) {
                if(endereco.enderecoID==null) {
                    let result:AxiosResponse<any,any> = await apiRegistro.addEnderecoToResponsavel(responsavel.responsavelID, endereco);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        setResponsavel(result?.data);
                    };
                } else {
                    let result:AxiosResponse<any,any> = await apiRegistro.addEnderecoToResponsavel(responsavel.responsavelID, endereco);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        setResponsavel(result?.data);
                    };
                };
            };
            setEndereco({enderecoID:null, tipoEndereco:"", cep:"", logradouro:"", numero:"", endereco:"", complemento:"", bairro:"", cidade:"", uf:""})
            setAddEndereco(false);
            setIndexEndereco(-1);
        }
    };

    const addContatoToResponsavel = async (e:any) => {
        e.preventDefault()
        let hasBlank = false;
        for (let i=0; i < e.target.length; i++) {
            if (e.target[i].value === '' && e.target[i].name !== '') {
              e.target[i].classList.add("shake")
              hasBlank = true;
            } else {
                e.target[i].classList.remove("shake")
            };
        };
        if (!hasBlank) {
            if(responsavel.responsavelID != null) {
                if(contato.contatoID==null) {
                    let result:AxiosResponse<any,any> = await apiRegistro.addContatoToResponsavel(responsavel.responsavelID, contato);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        setResponsavel(result?.data);
                    };
                } else {
                    let result:AxiosResponse<any,any> = await apiRegistro.addContatoToResponsavel(responsavel.responsavelID, contato);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        setResponsavel(result?.data);
                    };
                };
            };
            setContato({contatoID:null, tipoContato:"", principal:false, descricao:"", anotacao:""})
            setAddContato(false);
            setIndexContato(-1);
        }
    };

    const removerPet = async (petDelete:Pet) => {
        await apiRegistro.deletePet(petDelete);
        setPet({petID:null,
                nome:"",
                genero:"",
                especie:"",
                raca:"",
                cor:"",
                nascimento:null,
                fertil:false,
                pedigree:false})
        if(responsavel.responsavelID) {
            let result:AxiosResponse<any,any> = await apiRegistro.getResponsavelById(responsavel.responsavelID);
            if(result.status>=200 && result.status<=300){
                setResponsavel(result.data);
            }
        }
    };

    const removerEndereco = (idx:number) => {

    };

    const removerContato = (idx:number) => {

    };

    const inputChange = (e:any) => {
        e.target.classList.remove("shake");
        if(e.target.name === "registroNum") {
            let regex = /\D/g;
            let registroNum = e.target.value.replace(regex,"");
            if((responsavel?.tipoPessoa==="Física" && registroNum.length<=11)||
                (responsavel?.tipoPessoa==="Jurídica" && registroNum.length<=14)) {
                    setResponsavel({...responsavel,[e.target.name]:registroNum});

            } else {
            }
        } else {
            if(e.target.type === "date") {
                setResponsavel({...responsavel,[e.target.name]:moment(e.target.value).toISOString()});
            } else {
                setResponsavel({...responsavel,[e.target.name]:e.target.value});
            }
        }
    };

    const inputChangePet = (e:any) => {
        e.target.classList.remove("shake");
        if(e.target.type === "date") {
            setPet({...pet,[e.target.name]:moment(e.target.value).toISOString()});
        } else {
            setPet({...pet,[e.target.name]:e.target.value});
        }
    };

    const inputChangeEndereco = (e:any) => {
        e.target.classList.remove("shake");
        if(e.target.name === 'cep') {
            let regex = /\D/g;
            let numero = e.target.value.replace(regex,"");
            if(numero.length <=8) {
                setEndereco({...endereco,[e.target.name]:numero});
            } 
        } else {
            setEndereco({...endereco,[e.target.name]:e.target.value});
        }
    };

    const inputChangeContato = (e:any) => {
        e.target.classList.remove("shake");
        if(e.target.name === "descricao" && contato.tipoContato !== 'E-mail' && contato.tipoContato !== 'Outro') {
            let regex = /\D/g;
            let numero = e.target.value.replace(regex,"");
            if(numero.length <=11) {
                    setContato({...contato,[e.target.name]:numero});
            } 
        } else {
            setContato({...contato,[e.target.name]:e.target.value});
        }
    };;

    const selectItem = (select:any) => {
        select.target.classList.remove("shake");
        if(select.target.name === "tipoPessoa") {
            if(select.target[select.target.selectedIndex].value === "Física") {
                setResponsavel({...responsavel,
                                    [select.target.name]:select.target[select.target.selectedIndex].value,
                                    tipoRegistro:"CPF",
                                    registroNum:""})
            } else if (select.target[select.target.selectedIndex].value === "Jurídica") {
                setResponsavel({...responsavel,
                    [select.target.name]:select.target[select.target.selectedIndex].value,
                    tipoRegistro:"CNPJ",
                    registroNum:""})
            } else {
                setResponsavel({...responsavel,
                    [select.target.name]:select.target[select.target.selectedIndex].value,
                    tipoRegistro:"",
                    registroNum:""})
            }
        } else {
            setResponsavel({...responsavel,[select.target.name]:select.target[select.target.selectedIndex].value})
        }
    };

    const selectItemPet = (select:React.ChangeEvent<HTMLSelectElement>) => {
        select.target.classList.remove("shake");
        setPet({...pet,[select.target.name]:select.target.value});
        if(select.target.name === 'especie') {
            let filteredRaca = listRaca.filter(raca => raca.especie.nome === select.target.value)
            setListRacaFiltered(filteredRaca);
        }
    };

    const selectItemEndereco = (select:any) => {
        select.target.classList.remove("shake");
        setEndereco({...endereco,[select.target.name]:select.target[select.target.selectedIndex].value})
    };

    const selectItemContato = (select:any) => {
        select.target.classList.remove("shake");
        setContato({...contato,[select.target.name]:select.target[select.target.selectedIndex].value,descricao:""});

    };

    const cpf_cnpj_mask = (tipo:String,numero:String) => {
        let mask = "";
        if(tipo === "CPF" && numero.length==11) {
            mask = numero.substring(0,3)
            +"."+
            numero.substring(3,6)
            +"."+
            numero.substring(6,9)
            +"-"+
            numero.substring(9,11)
        } else if (tipo === "CNPJ" && numero.length==14) {
            mask = numero.substring(0,2)
            +"."+
            numero.substring(2,5)
            +"."+
            numero.substring(5,8)
            +"/"+
            numero.substring(8,12)
            +"-"+
            numero.substring(12,14)
        } else {
            mask=numero.toString();
        }
        return mask;
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

    const cep_mask = (numero:String) => {
        let mask = "";
        if(numero.length==8) {
            mask = 
            numero.substring(0,2)
            +"."+
            numero.substring(2,5)
            +"-"+
            numero.substring(5,9)
         } else {
            mask=numero.toString();
        }
        return mask;
    };

    const consultarCep = async () => {
        let cepMask = cep_mask(endereco.cep).replace(".","");
        let result = await apiCep.getEndereco(cepMask);
        if (result?.status == 200) {
            setEndereco({...endereco,
                    cidade:result.data.city,
                    uf: result.data.state,
                    bairro: result.data.district,
                    endereco: result.data.address       
            })
        } else {
            console.log("Cep não encontrado!")
        }
    };

    const limparForm = () => {
        setResponsavel({responsavelID:null,
                        nome: "", 
                        sobrenome: "", 
                        genero:"", 
                        tipoPessoa:"", 
                        tipoRegistro:"", 
                        registroNum:"", 
                        nascimento:null, 
                        aceitaEmail:false, 
                        pets: [], 
                        enderecos: [], 
                        contatos: [],
                    });
    };

    const listUtilForm = async () => {
        let espResult:AxiosResponse = await apiUtil.listEspecies();
        if (espResult.status >=200 && espResult.status <=300) {
            setListEspecie(espResult.data);
        }
        let racaResult:AxiosResponse = await apiUtil.listRacas();
        if (racaResult.status >=200 && racaResult.status <=300) {
            setListRaca(racaResult.data);
        }
    };

    useEffect(() => {
        moment.locale('pt-br');
        if (props.responsavelForm) {
            setResponsavel(props.responsavelForm);
        } else {
            setResponsavel({
                responsavelID:null,
                nome: "",
                sobrenome: "",
                genero:"",
                tipoPessoa:"", // Física ou Jurídica
                tipoRegistro:"", // CPF ou CNPJ
                registroNum:"",
                nascimento:null,
                aceitaEmail:false,
                pets: [],
                enderecos: [],
                contatos: [],
            })
        }
        listUtilForm();
    },[])

    return (
    <div className='container'>
        <div className='form_container_cad_responsavel'>
            <form className='form_cad_responsavel' onSubmit={formSubmit}>
                <h2>Cadastrar Responsável</h2>
                <Label htmlFor='nome'>Nome: </Label>
                <InputText size={'max'} type={'text'} id='nome' name={'nome'} value={responsavel?.nome?responsavel.nome.toString():""} onChange={inputChange}/>
                {(!addEndereco && !addContato && !addPet) && <>
                    <Label htmlFor='sobrenome'>Sobrenome: </Label>
                    <InputText size={'max'} id='sobrenome' type={'text'} name={'sobrenome'} value={responsavel?.sobrenome?responsavel.sobrenome.toString():""} onChange={inputChange}/>
                    <div style={{display:'grid', gridTemplateColumns:'45% 40%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='genero'>Sexo:</Label>
                            <Select id='genero' onChange={selectItem} name={'genero'} value={responsavel?.genero?responsavel.genero.toString():""}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"Feminino"}>Feminino</Option>
                                <Option value={"Masculino"}>Masculino</Option>
                            </Select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='tipoPessoa'>Tipo de Pessoa:</Label>
                            <Select id='tipoPessoa' onChange={selectItem} name={'tipoPessoa'} value={responsavel?.tipoPessoa?responsavel.tipoPessoa.toString():""}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"Física"}>Física</Option>
                                <Option value={"Jurídica"}>Jurídica</Option>
                            </Select>
                        </div>
                    </div>
                    {responsavel?.tipoPessoa != "" &&
                        <>
                            <Label htmlFor='registroNum'>{responsavel?.tipoRegistro}: </Label>
                            <InputText size={'max'} type={'text'} id='registroNum' name={'registroNum'} 
                                                value={responsavel?.tipoRegistro && responsavel?.registroNum?cpf_cnpj_mask(responsavel?.tipoRegistro,responsavel?.registroNum):""} 
                                                onChange={inputChange}/>
                        </>
                    }
                    <div style={{display:'grid', gridTemplateColumns:'45% 50%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='nascimento'>Data de nascimento: </Label>
                            <InputDate type={'date'} name={'nascimento'} value={responsavel?.nascimento?moment(responsavel?.nascimento).format('yyyy-MM-DD'):""}
                                                                    max={moment().subtract(16,'year').format('yyyy-MM-DD')} onChange={inputChange}/>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label htmlFor='aceitaEmail'>Aceita receber e-mails?</Label>
                            <Select onChange={selectItem} id='aceitaEmail' name={'aceitaEmail'} value={responsavel?.aceitaEmail!=null? responsavel.aceitaEmail.toString():""}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"true"}>Sim</Option>
                                <Option value={"false"}>Não</Option>
                            </Select>
                        </div>
                    </div>
                </>}
                <div style={{display:'flex', flexDirection:'row', marginTop:'20px'}}>
                    <Button type='submit'>{responsavel?.responsavelID!=null?"Alterar":"Salvar"}</Button>
                    {responsavel?.responsavelID!=null?
                                    <Button type='button' color={'red'} 
                                            onClick={() => removeResponsavel()}>Remover</Button>:""}
                    <Button type='button' color={'gray'} >Voltar</Button>
                    <Button type='button' color={'gray'} onClick={() => limparForm()} >Limpar</Button>
                </div>
                {responsavel?.responsavelID!=null?
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Button type='button' onClick={() => {setAddEndereco(!addEndereco);setAddContato(false);setAddPet(false)}}>+ Endereço</Button>
                        <Button type='button' onClick={() => {setAddContato(!addContato); setAddEndereco(false);setAddPet(false)}}>+ Contato</Button>
                        <Button type='button' onClick={() => {setAddPet(!addPet);setAddEndereco(false);setAddContato(false)}}>+ Pet</Button>
                    </div>
                :""}
            </form>
            
            {addEndereco && 
                <form className='form_cad_responsavel' onSubmit={addEnderecoToResponsavel}>
                    <h2>Cadastrar Endereço</h2>
                    <Label>Tipo:</Label>
                    <Select onChange={selectItemEndereco} name={'tipoEndereco'} value={endereco?.tipoEndereco?endereco.tipoEndereco.toString():""}>
                        <Option value={""}>Selecione</Option>
                        <Option value={"Residencial"}>Residencial</Option>
                        <Option value={"Comercial"}>Comercial</Option>
                        <Option value={"Outro"}>outro</Option>
                    </Select>
                    <div>
                        <Label>CEP: </Label>
                        <MdSearch size={20} style={{cursor:'pointer'}} type='button' onClick={() => consultarCep()} />
                    </div>
                    <InputText type={'text'} name={'cep'} value={endereco?.cep?cep_mask(endereco.cep):""} onChange={inputChangeEndereco}/>
                    <Label>Logradouro: </Label>
                    <InputText type={'text'} name={'logradouro'} value={endereco?.logradouro?endereco.logradouro.toString():""} onChange={inputChangeEndereco}/>
                    <Label>Número: </Label>
                    <InputText type={'text'} name={'numero'} value={endereco?.numero?endereco.numero.toString():""} onChange={inputChangeEndereco}/>
                    <Label>Endereço: </Label>
                    <InputText type={'text'} name={'endereco'} value={endereco?.endereco?endereco.endereco.toString():""} onChange={inputChangeEndereco}/>
                    <Label>Complemento: </Label>
                    <InputText type={'text'} name={'complemento'} value={endereco?.complemento?endereco.complemento.toString():""} onChange={inputChangeEndereco}/>
                    <Label>Bairro: </Label>
                    <InputText type={'text'} name={'bairro'} value={endereco?.bairro?endereco.bairro.toString():""} onChange={inputChangeEndereco}/>
                    <Label>Cidade: </Label>
                    <InputText type={'text'} name={'cidade'} value={endereco?.cidade?endereco.cidade.toString():""} onChange={inputChangeEndereco}/>
                    <Label>UF: </Label>
                    <InputText type={'text'} name={'uf'} value={endereco?.uf?endereco.uf.toString():""} onChange={inputChangeEndereco}/>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Button type='submit'>{indexEndereco>=0?"Alterar":"Adicionar"}</Button>
                        <Button type='button' color={'gray'} onClick={() => {setAddEndereco(false); setIndexEndereco(-1);
                                                                                    setEndereco({enderecoID:null, tipoEndereco:"", cep:"", logradouro:"", numero:"", endereco:"", complemento:"", bairro:"", cidade:"", uf:""})
                                                                                    }}>Cancelar</Button>
                    </div>
                </form>
            }

            {addContato && 
                <form className='form_cad_responsavel' onSubmit={addContatoToResponsavel}>
                    <h2>Cadastrar Contato</h2>
                    <Label>Tipo: </Label>
                    <Select onChange={selectItemContato} name={'tipoContato'} value={contato?.tipoContato?contato.tipoContato.toString():""}>
                        <Option value={""}>Selecione</Option>
                        <Option value={"E-mail"}>E-mail</Option>
                        <Option value={"Celular"}>Celular</Option>
                        <Option value={"Residencial"}>Telefone Residencial</Option>
                        <Option value={"Comercial"}>Telefone Comercial</Option>
                        <Option value={"Outro"}>outro</Option>
                    </Select>
                    <Label>{contato.tipoContato=='E-mail'?"Endereço:":contato.tipoContato=='Outro'?"Descrição:":"Número:"}</Label>
                    <InputText type={contato.tipoContato=='E-mail'?'email':'text'} name={'descricao'} 
                           value={contato?.descricao?(contato.tipoContato !== 'E-mail' && contato.tipoContato !== 'Outro')?telefone_mask(contato.descricao):contato.descricao.toString():""} 
                           onChange={inputChangeContato}/>
                    <Label>Observações: </Label>
                    <InputText type={'text'} name={'anotacao'} value={contato?.anotacao?contato.anotacao.toString():""} onChange={inputChangeContato}/>
                    <Label>Contato principal? &nbsp;
                        <Select onChange={selectItemContato} name={'principal'} value={contato?.principal!=null? contato.principal.toString():""}>
                            <Option value={""}>Selecione</Option>
                            <Option value={"true"}>Sim</Option>
                            <Option value={"false"}>Não</Option>
                        </Select>
                    </Label>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Button type='submit'>{indexContato>=0?"Alterar":"Adicionar"}</Button>
                        <Button type='button' color={'gray'} onClick={() => {setAddContato(false); setIndexContato(-1);
                                                                                    setContato({contatoID:null, tipoContato:"", principal:false, descricao:"", anotacao:""})
                                                                                    }}>Cancelar</Button>
                    </div>
                </form>
            }

            {addPet &&
                <form className='form_cad_responsavel' onSubmit={addPetToResponsavel}>
                    <h2>Cadastrar Pet</h2>
                    <Label>Nome: </Label>
                    <InputText type={'text'} name={'nome'} value={pet?.nome?pet.nome.toString():""} onChange={inputChangePet}/>
                    <div style={{display:'grid', gridTemplateColumns:'40% 25% 25%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label>Sexo: </Label>
                            <Select onChange={selectItemPet} name={'genero'} value={pet?.genero?pet.genero.toString():""}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"Fêmea"}>Fêmea</Option>
                                <Option value={"Macho"}>Macho</Option>
                            </Select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label>Espécie: </Label>
                            <Select onChange={selectItemPet} name={'especie'} value={pet?.especie?pet.especie.toString():""}>
                                <Option value={""}>Selecione</Option>
                                {listEspecie.map((especie,idx) => {
                                    return (
                                        <Option key={idx} value={especie.nome}>{especie.nome}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label>Raça: </Label>
                            <Select onChange={selectItemPet} name={'raca'} value={pet?.raca?pet.raca.toString():""}>
                                <Option value={""}>Selecione</Option>
                                {listRacaFiltered.map((raca,idx) => {
                                    return (
                                        <Option key={idx} value={raca.nome}>{raca.nome}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'40% 50%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label>Cor: </Label>
                            <InputText size={'small'} type={'text'} name={'cor'} value={pet?.cor?pet.cor.toString():""} onChange={inputChangePet}/>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label>Data de Nascimento: </Label>
                            <InputDate type={'date'} name={'nascimento'} value={pet?.nascimento?moment(pet?.nascimento).format('yyyy-MM-DD'):""}
                                                                    max={moment().format('yyyy-MM-DD')} onChange={inputChangePet}/>
                        </div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'30% 30%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label>Fertilidade: </Label>
                            <Select onChange={selectItemPet} name={'fertil'} value={pet?.fertil!=null? pet.fertil.toString():""}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"true"}>Sim</Option>
                                <Option value={"false"}>Não</Option>
                            </Select>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Label>Pedigree: </Label>
                            <Select onChange={selectItemPet} name={'pedigree'} value={pet?.pedigree!=null?pet.pedigree.toString():""}>
                                <Option value={""}>Selecione</Option>
                                <Option value={"true"}>Sim</Option>
                                <Option value={"false"}>Não</Option>
                            </Select>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Button type='submit'>{indexPet>=0?"Alterar":"Adicionar"}</Button>
                        <Button type='button' color={'gray'} onClick={() => {setAddPet(false); setIndexPet(-1);
                                                                                setPet({petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false})
                                                                            }}>Cancelar</Button>
                    </div>
                </form>
            }

        </div>
        <div className='dados_container_responsavel'>
            <div className='dados_responsavel'>
                <h2>Dados do Responsável</h2>
                {responsavel?.responsavelID != null &&
                    <div className='dados_responsavel_item'>
                        <span>{responsavel?.nome+" "+responsavel?.sobrenome}</span>
                        <span>{responsavel.responsavelID!=null?"Salvo":"Não salvo"}</span>
                    </div>
                }
                <h2>Endereços</h2>
                {responsavel?.enderecos?.map((endereco, idx) => {return (
                    <div key={idx} className='dados_responsavel_item'>
                        <span>{endereco.tipoEndereco}</span>
                        <span>{endereco.cidade}/{endereco.uf}</span>
                        <span>
                            <MdEdit size={20} style={{marginLeft:10, marginRight:5, cursor:'pointer'}}
                                onClick={()=>{setEndereco(endereco); setIndexEndereco(idx); setAddEndereco(true); setAddContato(false); setAddPet(false)}} />
                            <MdDeleteOutline size={20} color={'red'} style={{marginLeft:5, marginRight:5, cursor:'pointer'}}
                                onClick={()=>removerEndereco(idx)} />
                        </span>
                    </div>
                )
                })}
                <h2>Contatos</h2>
                {responsavel?.contatos?.map((contato,idx) => {return (
                    <div key={idx} className='dados_responsavel_item'>
                        <span>{contato.tipoContato}</span>
                        <span>{(contato.tipoContato !== 'E-mail' && contato.tipoContato !== 'Outro')?(contato.descricao?telefone_mask(contato.descricao):""):contato.descricao}</span>
                        <span>
                            <MdEdit size={20} style={{marginLeft:10, marginRight:5, cursor:'pointer'}}
                                onClick={()=>{setContato(contato); setIndexContato(idx); setAddContato(true); setAddEndereco(false); setAddPet(false)}} />
                            <MdDeleteOutline size={20} color={'red'} style={{marginLeft:5, marginRight:5, cursor:'pointer'}}
                                onClick={()=>removerContato(idx)} />
                        </span>
                    </div>
                )
                })}
                <h2>Pets</h2>
                {responsavel?.pets?.map((petItem,idx) => {return (
                    <div key={idx} className='dados_responsavel_item'>
                        <span>- {petItem.nome}</span>
                        <span>{petItem.especie}</span>
                        <span>
                            <MdEdit size={20} style={{marginLeft:10, marginRight:5, cursor:'pointer'}}
                                onClick={()=>{setPet(petItem); setIndexPet(idx); setAddPet(true); setAddEndereco(false); setAddContato(false)}} />
                            <MdDeleteOutline size={20} color={'red'} style={{marginLeft:5, marginRight:5, cursor:'pointer'}}
                                onClick={()=>removerPet(petItem)} />
                        </span>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
    )
}