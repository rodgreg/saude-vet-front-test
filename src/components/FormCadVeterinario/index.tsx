import './formCadVeterinario.css';
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from 'react';
import { Button } from '../HtmlComponents';
import { MdEdit, MdDeleteOutline, MdFindInPage, MdSearch } from "react-icons/md";
import { ApiRegistro } from '../../services/ApiRegistro';
import { AxiosResponse } from 'axios';
import { Veterinario, Crmv } from '../../interfaces/Veterinario';


interface formCadProps {
    veterinarioForm?: Veterinario;
}

export function FormCadVeterinario(props:formCadProps) {

    const apiRegistro = ApiRegistro();
    const [veterinario, setVeterinario] = useState<Veterinario>({veterinarioID:null, nome:"", sobrenome:"", genero:"", cpf:"", cidade:"", uf:"",crmvs:[]});
    const [crmv,setCrmv] = useState<Crmv>({crmvID:null, numero:"", dataRegistro:null, uf:"", area:""});
    const [addCrmv, setAddCrmv] = useState<Boolean>(false);
    const [indexCrmv, setIndexCrmv] = useState<number>(-1)

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
            if(veterinario.veterinarioID == null) {
                let result:AxiosResponse<any,any> = await apiRegistro.saveVeterinario(veterinario);
                if(result != null && result?.status >= 200 && result?.status <= 300) {
                    setVeterinario(result?.data);
                };
            } else {
                let result:AxiosResponse<any,any> = await apiRegistro.updateVeterinario(veterinario);
                if(result != null && result?.status >= 200 && result?.status <= 300) {
                    setVeterinario(result?.data);
                };
            };
        };
    };

    const removeVeterinario = async () => {
        let result:AxiosResponse<any,any> = await apiRegistro.deleteVeterinario(veterinario);
        setVeterinario({
            veterinarioID:null,
            nome: "",
            sobrenome: "",
            genero:"",
            cpf:"",
            cidade:"",
            uf:"",
            crmvs: [],
        })
    };

    const addCrmvToVeterinario = async (e:any) => {
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
            if(veterinario.veterinarioID != null) {
                if(crmv.crmvID == null) {
                    let result:AxiosResponse<any,any> = await apiRegistro.addCrmvToVeterinario([crmv], veterinario.veterinarioID);
                    console.log(result.data);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        // veterinario.crmvs?.push(result.data)
                        let vetTmp:AxiosResponse<any,any> = await apiRegistro.getVeterinarioById(veterinario.veterinarioID);
                        setVeterinario(vetTmp.data);
                    };
                } else {
                    let result:AxiosResponse<any,any> = await apiRegistro.addCrmvToVeterinario([crmv],veterinario.veterinarioID);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        // let crmvTmp:any = veterinario.crmvs?.filter(crmvI => crmvI.crmvID === crmv.crmvID);
                        // veterinario.crmvs?.splice(veterinario.crmvs.indexOf(crmvTmp[0]),1,result.data);
                        let vetTmp:AxiosResponse<any,any> = await apiRegistro.getVeterinarioById(veterinario.veterinarioID);
                        setVeterinario(vetTmp.data);
                    };
                };
            };
            setCrmv({crmvID:null, numero:"", dataRegistro:null, uf:"", area:""})
            setAddCrmv(false);
            setIndexCrmv(-1);
        }
    };

    const removerCrmv = async (crmvDelete:Crmv) => {
        await apiRegistro.deleteCrmv(crmvDelete);
        setCrmv({crmvID:null, numero:"", dataRegistro:null, uf:"", area:""})

        if(veterinario.veterinarioID) {
            let result:AxiosResponse<any,any> = await apiRegistro.getVeterinarioById(veterinario.veterinarioID);
            if(result.status>=200 && result.status<=300){
                setVeterinario(result.data);
            }
        }
    };

    const inputChange = (e:any) => {
        e.target.classList.remove("shake");
        setVeterinario({...veterinario,[e.target.name]:e.target.value});
    };

    const inputChangeCrmv = (e:any) => {
        e.target.classList.remove("shake");
        if(e.target.type === "date") {
            setCrmv({...crmv,[e.target.name]:moment(e.target.value).toISOString()});
        } else {
            setCrmv({...crmv,[e.target.name]:e.target.value});
        };
    };

    const selectItem = (select:any) => {
        select.target.classList.remove("shake");
        setVeterinario({...veterinario,[select.target.name]:select.target[select.target.selectedIndex].value})
    };

    const selectItemCrmv = (select:any) => {
        select.target.classList.remove("shake");
        setCrmv({...crmv,[select.target.name]:select.target[select.target.selectedIndex].value})
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

    const limparForm = () => {
        setVeterinario({veterinarioID:null, nome:"", sobrenome:"", genero:"", cpf:"", cidade:"", uf:"",crmvs:[]});
    };

    useEffect(() => {
        moment.locale('pt-br');
        if (props.veterinarioForm) {
            setVeterinario(props.veterinarioForm);
        } else {
            setVeterinario({veterinarioID:null, nome:"", sobrenome:"", genero:"", cpf:"", cidade:"", uf:"",crmvs:[]})
        };
    },[])

    return (
    <div className='container'>
        <div className='form_container_cad_veterinario'>
            <form className='form_cad_veterinario' onSubmit={formSubmit}>
                <h2>Cadastrar Responsável de Pet</h2>
                <span>Nome: </span>
                <input type={'text'} name={'nome'} value={veterinario?.nome?veterinario.nome.toString():""} onChange={inputChange}/>
                {(!addCrmv) && <>
                    <span>Sobrenome: </span>
                    <input  type={'text'} name={'sobrenome'} value={veterinario?.sobrenome?veterinario.sobrenome.toString():""} onChange={inputChange}/>
                    <div style={{display:'grid', gridTemplateColumns:'35% 40%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Sexo:</span>
                            <select onChange={selectItem} name={'genero'} value={veterinario?.genero?veterinario.genero.toString():""}>
                                <option value={""}>Selecione</option>
                                <option value={"Feminino"}>Feminino</option>
                                <option value={"Masculino"}>Masculino</option>
                            </select>
                        </div>
                    </div>
                    <span>CPF: </span>
                    <input type={'text'} name={'cpf'} 
                                        value={veterinario?.cpf?cpf_cnpj_mask('CPF',veterinario?.cpf):""} 
                                        onChange={inputChange}/>
                    <div style={{display:'grid', gridTemplateColumns:'35% 50%'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>Cidade: </span>
                            <input type={'text'} name={'cidade'} value={veterinario?.cidade?veterinario?.cidade.toString():""} onChange={inputChange}/>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <span>UF: </span>
                            <input type={'text'} name={'uf'} value={veterinario?.uf?veterinario?.uf.toString():""} onChange={inputChange}/>
                        </div>
                    </div>
                </>}
                <div>
                    <Button type='submit'>{veterinario?.veterinarioID!=null?"Alterar":"Salvar"}</Button>
                    {veterinario?.veterinarioID!=null?
                                    <Button type='button' color={'light_danger'} 
                                            onClick={() => removeVeterinario()}>Remover</Button>:""}
                    <Button type='button' color={'light_cancel'} >Voltar</Button>
                    <Button type='button' color={'light_cancel'} onClick={() => limparForm()} >Limpar</Button>
                </div>
                {veterinario?.veterinarioID!=null?
                    <div>
                        <Button type='button' onClick={() => {setAddCrmv(!addCrmv);}}>+ Crmv</Button>
                    </div>
                :""}
            </form>
            
            {addCrmv && 
                <form className='form_cad_veterinario' onSubmit={addCrmvToVeterinario}>
                    <h2>Cadastrar CRMV</h2>
                    <span>Numero:</span>
                    <input type={'text'} name={'numero'} value={crmv?.numero?crmv.numero.toString():""} onChange={inputChangeCrmv}/>
                    <span>UF: </span>
                    <input type={'text'} name={'uf'} value={crmv?.uf?crmv.uf.toString():""} onChange={inputChangeCrmv}/>
                    <span>Area: </span>
                    <input type={'text'} name={'area'} value={crmv?.area?crmv.area.toString():""} onChange={inputChangeCrmv}/>
                    <span>Data de Registro: </span>
                    <input type={'date'} name={'dataRegistro'} value={crmv?.dataRegistro?moment(crmv.dataRegistro).format('yyyy-MM-DD'):""} onChange={inputChangeCrmv}/>
                    <div>
                        <Button type='submit'>{indexCrmv>=0?"Alterar":"Adicionar"}</Button>
                        <Button type='button' color={'light_cancel'} onClick={() => {setCrmv({crmvID:null, numero:"", dataRegistro:null, uf:"", area:""}); setAddCrmv(false); setIndexCrmv(-1);}}>
                            Cancelar</Button>
                    </div>
                </form>
            }
        </div>
        <div className='dados_container_veterinario'>
            <div className='dados_veterinario'>
                <h2>Dados do Veterinário</h2>
                {veterinario?.veterinarioID != null &&
                    <div className='dados_veterinario_item'>
                        <span>{veterinario?.nome+" "+veterinario?.sobrenome}</span>
                         <span>{veterinario.veterinarioID!=null?"Salvo":"Não salvo"}</span>
                    </div>
                }
                <h2>CRMV</h2>
                {veterinario?.crmvs?.map((crmv, idx) => {return (
                    <div key={idx} className='dados_veterinario_item'>
                        <span>{crmv.numero}</span>
                        <span>{crmv.uf}</span>
                        <span>{crmv.area}</span>
                        <span>
                            <MdEdit size={20} style={{marginLeft:10, marginRight:5, cursor:'pointer'}}
                                onClick={()=>{setCrmv(crmv); setIndexCrmv(idx); setAddCrmv(true);}} />
                            <MdDeleteOutline size={20} color={'red'} style={{marginLeft:5, marginRight:5, cursor:'pointer'}}
                                onClick={()=>removerCrmv(crmv)} />
                        </span>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
    )
}