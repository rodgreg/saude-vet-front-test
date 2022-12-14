import './formCadResponsavel.css';
import { Responsavel, Endereco, Contato } from '../../interfaces/Responsavel';
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from 'react';
import { Button } from '../HtmlComponents';
import { Pet } from '../../interfaces/Pet';
import { MdEdit, MdDeleteOutline } from "react-icons/md";


interface formCadProps {
    responsavelForm?: Responsavel;
}

export function FormCadResponsavel(props:formCadProps) {

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

    const formSubmit = (e:any) => {
        e.preventDefault();
        setResponsavel({...responsavel, responsavelID:0})
        console.log('submit: '+JSON.stringify(responsavel));
    };

    const removeResponsavel = () => {
        setResponsavel({...responsavel, responsavelID:null})

    };

    const addPetToResponsavel = (idx:number) => {
        if(idx>=0){
            responsavel?.pets?.splice(idx,1,pet);
            setIndexPet(-1);
        } else {
            if (responsavel?.pets != null && pet != null) {
                responsavel?.pets.push(pet);
            } else if (pet != null) {
                setResponsavel({...responsavel,pets:[pet]});
            }
        }
        setPet({petID:null ,nome:"", genero:"", especie:"", raca:"", cor:"", nascimento:null, fertil:false, pedigree:false})
        setAddPet(false);
    };

    const addEnderecoResponsavel = (idx:number) => {
        if(idx>=0){
            responsavel?.enderecos?.splice(idx,1,endereco);
            setIndexPet(-1);
        } else {
            if (responsavel?.enderecos != null && endereco != null) {
                responsavel?.enderecos.push(endereco);
            } else if (endereco != null) {
                setResponsavel({...responsavel,enderecos:[endereco]});
            }
        }
        setEndereco({enderecoID:null, tipoEndereco:"", cep:"", logradouro:"", numero:"", endereco:"", complemento:"", bairro:"", cidade:"", uf:""})
        setAddEndereco(false);
    };

    const addContatoToResponsavel = (e:any) => {
        e.preventDefault()
        if(indexContato>=0){
            responsavel?.contatos?.splice(indexContato,1,contato);
            setIndexPet(-1);
        } else {
            if (responsavel?.contatos != null && contato != null) {
                responsavel?.contatos.push(contato);
            } else if (contato != null) {
                setResponsavel({...responsavel,contatos:[contato]});
            }
        }
        setContato({contatoID:null, tipoContato:"", principal:false, descricao:"", anotacao:""})
        setAddContato(false);
    };

    const removerPet = (idx:number) => {
        if(responsavel?.pets != null) {
            let petsTmp = responsavel?.pets.filter((petI,idxI) => idxI != idx);
            setResponsavel({...responsavel, pets: petsTmp});
        } 
    };

    const removerEndereco = (idx:number) => {
        if(responsavel?.enderecos != null) {
            let endTmp = responsavel?.enderecos.filter((endI,idxI) => idxI != idx);
            setResponsavel({...responsavel, enderecos: endTmp});
        } 
    };

    const removerContato = (idx:number) => {
        if(responsavel?.contatos != null) {
            let contTmp = responsavel?.contatos.filter((contI,idxI) => idxI != idx);
            setResponsavel({...responsavel, contatos: contTmp});
        } 
    };

    const inputChange = (e:any) => {
        if(e.target.name === "registroNum") {
            let regex = /\D/g;
            let registroNum = e.target.value.replace(regex,"");
            if((responsavel?.tipoPessoa==="Física" && registroNum.length<=11)||
                (responsavel?.tipoPessoa==="Jurídica" && registroNum.length<=14)) {
                    setResponsavel({...responsavel,[e.target.name]:registroNum});

            } else {
            }
        } else {
            setResponsavel({...responsavel,[e.target.name]:e.target.value});
        }
    };

    const inputChangePet = (e:any) => {
        setPet({...pet,[e.target.name]:e.target.value});
    };

    const inputChangeEndereco = (e:any) => {
        setEndereco({...endereco,[e.target.name]:e.target.value});
    };

    const inputChangeContato = (e:any) => {
        if(e.target.name === "descricao" && contato.tipoContato !== 'E-mail' && contato.tipoContato !== 'Outro') {
            let regex = /\D/g;
            let numero = e.target.value.replace(regex,"");
            if(numero.length <=11) {
                    setContato({...contato,[e.target.name]:numero});
            } 
        } else {
            setContato({...contato,[e.target.name]:e.target.value});
        }
    };

    const selectItem = (select:any) => {
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

    const selectItemPet = (select:any) => {
        setPet({...pet,[select.target.name]:select.target[select.target.selectedIndex].value})
    };

    const selectItemEndereco = (select:any) => {
        setEndereco({...endereco,[select.target.name]:select.target[select.target.selectedIndex].value})
    };

    const selectItemContato = (select:any) => {
        setContato({...contato,[select.target.name]:select.target[select.target.selectedIndex].value})
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

    },[])

    return (
    <div className='container'>
        <div className='form_container_cad_responsavel'>
            <form className='form_cad_responsavel' onSubmit={formSubmit}>
                <h2>Cadastrar Responsável de Pet</h2>
                <span>Nome: </span>
                <input type={'text'} name={'nome'} value={responsavel?.nome?responsavel.nome.toString():""} onChange={inputChange}/>
                {(!addEndereco && !addContato && !addPet) && <>
                    <span>Sobrenome: </span>
                    <input type={'text'} name={'sobrenome'} value={responsavel?.sobrenome?responsavel.sobrenome.toString():""} onChange={inputChange}/>
                    <span>Sexo:</span>
                    <select onChange={selectItem} name={'genero'} value={responsavel?.genero?responsavel.genero.toString():""}>
                        <option value={""}>Selecione</option>
                        <option value={"Feminino"}>Feminino</option>
                        <option value={"Masculino"}>Masculino</option>
                    </select>

                    <span>Tipo de Pessoa:</span>
                    <select onChange={selectItem} name={'tipoPessoa'} value={responsavel?.tipoPessoa?responsavel.tipoPessoa.toString():""}>
                        <option value={""}>Selecione</option>
                        <option value={"Física"}>Física</option>
                        <option value={"Jurídica"}>Jurídica</option>
                    </select>
                    {responsavel?.tipoPessoa != "" &&
                        <>
                            <span>{responsavel?.tipoRegistro}: </span>
                            <input type={'text'} name={'registroNum'} 
                                                value={responsavel?.tipoRegistro && responsavel?.registroNum?cpf_cnpj_mask(responsavel?.tipoRegistro,responsavel?.registroNum):""} 
                                                onChange={inputChange}/>
                        </>
                    }
                
                    <span>Data de nascimento: </span>
                    <input type={'date'} name={'nascimento'} value={responsavel?.nascimento?moment(responsavel?.nascimento).format('yyyy-MM-DD'):""}
                                                            max={moment().subtract(16,'year').format('yyyy-MM-DD')} onChange={inputChange}/>
                    <span>Aceita receber e-mails?</span>
                    <select onChange={selectItem} name={'aceitaEmail'} value={responsavel?.aceitaEmail? responsavel.aceitaEmail.toString():""}>
                        <option value={""}>Selecione</option>
                        <option value={"true"}>Sim</option>
                        <option value={"false"}>Não</option>
                    </select>
                </>}
                <div>
                    <Button type='submit'>{responsavel?.responsavelID!=null?"Alterar":"Salvar"}</Button>
                    {responsavel?.responsavelID!=null?
                                    <Button type='button' color={'light_danger'} 
                                            onClick={() => removeResponsavel()}>Remover</Button>:""}
                    <Button type='button' color={'light_cancel'} >Voltar</Button>
                </div>
                {responsavel?.responsavelID!=null?
                    <div>
                        <Button type='button' onClick={() => setAddEndereco(!addEndereco)}>+ Endereço</Button>
                        <Button type='button' onClick={() => setAddContato(!addContato)}>+ Contato</Button>
                        <Button type='button' onClick={() => setAddPet(!addPet)}>+ Pet</Button>
                    </div>
                :""}
            </form>
            
            {addEndereco && 
                <div className='form_cad_responsavel'>
                    <h2>Cadastrar Endereço</h2>
                    <Button type='button'>Adicionar</Button>
                </div>
            }

            {addContato && 
                <form className='form_cad_responsavel' onSubmit={addContatoToResponsavel}>
                    <h2>Cadastrar Contato</h2>
                    <span>Tipo: </span>
                    <select onChange={selectItemContato} name={'tipoContato'} value={contato?.tipoContato?contato.tipoContato.toString():""}>
                        <option value={""}>Selecione</option>
                        <option value={"E-mail"}>E-mail</option>
                        <option value={"Celular"}>Celular</option>
                        <option value={"Residencial"}>Telefone Residencial</option>
                        <option value={"Comercial"}>Telefone Comercial</option>
                        <option value={"Outro"}>outro</option>
                    </select>
                    <span>Descrição: </span>
                    <input type={contato.tipoContato=='E-mail'?'email':'text'} name={'descricao'} 
                           value={contato?.descricao?(contato.tipoContato !== 'E-mail' && contato.tipoContato !== 'Outro')?telefone_mask(contato.descricao):contato.descricao.toString():""} 
                           onChange={inputChangeContato}/>
                    <span>Observações: </span>
                    <input type={'text'} name={'anotacao'} value={contato?.anotacao?contato.anotacao.toString():""} onChange={inputChangeContato}/>
                    <span>Contato principal? 
                        <select onChange={selectItemContato} name={'principal'} value={contato?.principal? contato.principal.toString():""}>
                            <option value={""}>Selecione</option>
                            <option value={"true"}>Sim</option>
                            <option value={"false"}>Não</option>
                        </select>
                    </span>
                    <Button type='submit'>{indexContato>=0?"Alterar":"Adicionar"}</Button>
                </form>
            }

            {addPet &&
                <div className='form_cad_responsavel'>
                    <h2>Cadastrar Pet</h2>
                    <span>Nome: </span>
                    <input type={'text'} name={'nome'} value={pet?.nome?pet.nome.toString():""} onChange={inputChangePet}/>
                    <span>Sexo: </span>
                    <select onChange={selectItemPet} name={'genero'} value={pet?.genero?pet.genero.toString():""}>
                        <option value={""}>Selecione</option>
                        <option value={"Feminino"}>Feminino</option>
                        <option value={"Masculino"}>Masculino</option>
                    </select>
                    <span>Espécie: </span>
                    <input type={'text'} name={'especie'} value={pet?.especie?pet.especie.toString():""} onChange={inputChangePet}/>
                    <span>Raça: </span>
                    <input type={'text'} name={'raca'} value={pet?.raca?pet.raca.toString():""} onChange={inputChangePet}/>
                    <span>Cor: </span>
                    <input type={'text'} name={'cor'} value={pet?.cor?pet.cor.toString():""} onChange={inputChangePet}/>
                    <span>Data de Nascimento: </span>
                    <input type={'date'} name={'nascimento'} value={pet?.nascimento?moment(pet?.nascimento).format('yyyy-MM-DD'):""}
                                                            max={moment().format('yyyy-MM-DD')} onChange={inputChangePet}/>
                    <div style={{display:'flex', columnGap:20}}>
                        <span>Fertilidade: 
                            <select onChange={selectItemPet} name={'fertil'} value={pet?.fertil? pet.fertil.toString():""}>
                                <option value={""}>Selecione</option>
                                <option value={"true"}>Sim</option>
                                <option value={"false"}>Não</option>
                            </select>
                        </span>
                        <span>Pedigree: 
                            <select onChange={selectItemPet} name={'pedigree'} value={pet?.pedigree? pet.pedigree.toString():""}>
                                <option value={""}>Selecione</option>
                                <option value={"true"}>Sim</option>
                                <option value={"false"}>Não</option>
                            </select>
                        </span>
                    </div>
                    <Button type='button' onClick={() => addPetToResponsavel(indexPet)}>{indexPet>=0?"Alterar":"Adicionar"}</Button>
                </div>
            }

        </div>
        <div className='dados_container_responsavel'>
            <div className='dados_responsavel'>
                <h2>Dados do Responsável do Pet</h2>
                {responsavel?.responsavelID != null &&
                    <div className='dados_responsavel_item'>
                        <span>{responsavel?.nome+" "+responsavel?.sobrenome}</span>
                        {/* <span>Sexo: {responsavel?.genero}</span>
                        <span>Tipo de Pessoa: {responsavel?.tipoPessoa}</span>
                        <span>{responsavel?.tipoRegistro}: {responsavel?.registroNum}</span>
                        <span>Data de Nasc: {responsavel?.nascimento?moment(responsavel?.nascimento).format('DD/MM/YYYY'):""}</span> */}
                         <span>{responsavel.responsavelID!=null?"Salvo":"Não salvo"}</span>
                    </div>
                }
                <h2>Endereços</h2>
                {responsavel?.enderecos?.map((endereco, idx) => {return (
                    <div key={idx} className='dados_responsavel_item'>
                        <span>{endereco.tipoEndereco}</span>
                        {/* <span>CEP: {endereco.cep}</span>
                        <span>Logradouro: {endereco.logradouro}</span>
                        <span>Numero: {endereco.numero}</span>
                        <span>Endereço: {endereco.endereco}</span>
                        <span>Complemento: {endereco.complemento}</span>
                        <span>Bairro: {endereco.bairro}</span>
                        <span>Cidade: {endereco.cidade}</span>
                        <span>UF: {endereco.uf}</span> */}
                        <span>{endereco.enderecoID?"Salvo":"Não salvo"}</span>
                    </div>
                )
                })}
                <h2>Contatos</h2>
                {responsavel?.contatos?.map((contato,idx) => {return (
                    <div key={idx} className='dados_responsavel_item'>
                        <span>{contato.tipoContato}</span>
                        <span>{(contato.tipoContato !== 'E-mail' && contato.tipoContato !== 'Outro')?telefone_mask(contato.descricao):contato.descricao}</span>
                        {/* <span>Principal: {contato.principal?"Sim":"Não"}</span>
                        <span>Observações: {contato.anotacao}</span> */}
                        <span>{contato.contatoID?"Salvo":"Não salvo"}</span>
                    </div>
                )
                })}
                <h2>Pets</h2>
                {responsavel?.pets?.map((petItem,idx) => {return (
                    <div key={idx} className='dados_responsavel_item'>
                        <span>- {petItem.nome}</span>
                        <span>{petItem.especie}</span>
                        {/* <span>Sexo: {petItem.genero}</span>
                        
                        <span>Raça: {petItem.raca}</span>
                        <span>cor: {petItem.cor}</span>
                        <span>Data de nasc: {petItem.nascimento?moment(petItem.nascimento).format("DD/MM/YYYY"):""}</span>
                        <span>Fertil? {petItem.fertil?"Sim":"Não"}</span>
                        <span>Pedigree? {petItem.pedigree?"Sim":"Não"}</span> */}
                        <span>{petItem.petID?"Salvo":"Não salvo"}
                        {petItem.petID==null && 
                            <>
                                <MdEdit size={20} style={{marginLeft:10, marginRight:5, cursor:'pointer'}}
                                    onClick={()=>{setPet(petItem); setIndexPet(idx); setAddPet(true); }} />
                                <MdDeleteOutline size={20} color={'red'} style={{marginLeft:5, marginRight:5, cursor:'pointer'}}
                                    onClick={()=>removerPet(idx)} />
                            </>
                                }
                        </span>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
    )
}