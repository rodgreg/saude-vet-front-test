import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { MdAdd, MdArrowDropUp, MdClose } from 'react-icons/md';
import { Anamnese, Questao } from '../../../../interfaces/Prontuario';
import { ApiProntuario } from '../../../../services/ApiProntuario';
import { AnamneseQuestoes } from '../../../utils/AnamneseQuestoes';
import { Button, InputText, Label, Select, Option } from '../../../utils/HtmlComponents';
import './cadAnamnese.css';

export function CadAnamnese() {

    const api = ApiProntuario();
    const [newAnamn, setNewAnamn] = useState<Anamnese>({titulo:"", dtRegistro:new Date(), questoes:[]});
    const [AnamneseList, setAnamneseList] = useState<Anamnese[]>([{titulo:"", dtRegistro:new Date(), questoes:[]}]);
    const [addQuestion, setAddQuestion] = useState<boolean>(false);
    const [newQuest, setNewQuest] = useState<Questao>({label:"", descricao:"",tipo:"",options:[], resposta:""})
    const [option, setOption] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(false);

    const listAnamnese = async () => {
        var result:AxiosResponse<any,any> = await api.listTemplateAnamnese();
        if(result != null && result?.status >= 200 && result?.status <= 300) {
            setAnamneseList(result?.data);
        };
    }

    const selectAnamnese = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== '') {
            setNewAnamn(JSON.parse(e.target.value));
            setShowForm(true);
        } else {
            setNewAnamn({titulo:"", dtRegistro:new Date(), questoes:[]});
            setShowForm(false);
        }
        
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasBlank = false;
        if(e.currentTarget) {
            for (let i=0; i < e.currentTarget.length; i++) {
                // @ts-ignore
                if (e.currentTarget[i].value === '' && e.currentTarget[i].tagName === 'INPUT') { 
                    e.currentTarget[i].classList.add("shake")
                    hasBlank = true;
                };
            };
            if (!hasBlank) {
                if(newAnamn.templateID == null) {
                    let result:AxiosResponse<any,any> = await api.saveTemplateAnamnese(newAnamn);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        setNewAnamn({titulo:"", dtRegistro:new Date(), questoes:[]});
                        setShowForm(false);
                        await listAnamnese();
                    };
                } else {
                    let result:AxiosResponse<any,any> = await api.saveTemplateAnamnese(newAnamn);
                    if(result != null && result?.status >= 200 && result?.status <= 300) {
                        setNewAnamn({titulo:"", dtRegistro:new Date(), questoes:[]});
                        setShowForm(false);
                        await listAnamnese();
                    };
                };
            };
        };
    }

    const inputChangeAnamnese = (e: React.ChangeEvent<HTMLInputElement>) => {
         setNewAnamn({...newAnamn, [e.target.name]:e.target.value})
    }

    const inputChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'option') {
            setOption(e.target.value);
        } else {
            setNewQuest({...newQuest, [e.target.name]:e.target.value});
        }
    }

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
       
        if (e.target.value !== 'select') {
            setNewQuest({...newQuest, options:[]})
            setNewQuest({...newQuest, [e.target.name]:e.target.value});
        } else {
            setNewQuest({...newQuest, [e.target.name]:e.target.value});
        }
    }

    const addQuestao = () => {
        newAnamn.questoes.push(newQuest);
        setNewQuest({label:"", descricao:"",tipo:"",options:[], resposta:""});
        setAddQuestion(false);
    }

    const removeQuestao = (quest:Questao|null) => {
        if(quest!=null) {
            newAnamn.questoes?.splice(newAnamn.questoes.indexOf(quest),1);
            newAnamn.questoes?.sort();
            setNewAnamn({...newAnamn, questoes:newAnamn.questoes});
        }
    }

    const addOption = () => {
        if (option != ""){
            newQuest.options?.push(option);
        }
        setOption("");        
    }

    const removeOption = (opt:string) => {
        newQuest.options?.splice(newQuest.options.indexOf(opt),1);
        setNewQuest({...newQuest,options:newQuest.options});
    }

    const reorderOption = (from:number, to:number) => {
        newQuest.options?.splice(to,0, newQuest.options?.splice(from,1)[0]);
        setNewQuest({...newQuest,options:newQuest.options});
    }

    useEffect(() => {
        listAnamnese();
    },[])

    return (
        <div className='container-cadAnamnese'>
            <div className='cadAnamnese-form'>
                <h5>Cadastro de Templates de Anamnese</h5>
                {!showForm &&   <>
                                <Select onChange={selectAnamnese} value={JSON.stringify(newAnamn)}>
                                    <Option value={''}>Selecione</Option>
                                    {AnamneseList.map((anamn,idx) => <Option key={idx} value={JSON.stringify(anamn)}>{anamn.titulo}</Option>)}
                                </Select>
                                <Button size={'small'} type={'button'} onClick={() => { setNewAnamn({titulo:"", dtRegistro:new Date(), questoes:[]}); setShowForm(true);}} >Novo</Button>
                                </>
                }
                {showForm && <form onSubmit={submitForm} >
                    <Label htmlFor='titulo'>Título</Label><br/>
                    <InputText size={'medium'} value={newAnamn?.titulo} id={'titulo'} name={'titulo'} onChange={inputChangeAnamnese}/><br/>
                    <div style={{display:'flex'}}>
                        <Button size={'small'} color={'default'} type='submit' >Salvar</Button>
                        {!addQuestion && <Button size={'small'} color={'gray'} type='button' onClick={() => { setNewAnamn({titulo:"", dtRegistro:new Date(), questoes:[]}); setShowForm(false); }}>Cancelar</Button>}
                        <Button size={'small'} color={addQuestion?'gray':'default'} type='button' onClick={() => setAddQuestion(!addQuestion)}>{addQuestion?'Cancelar':'Adicionar Pergunta'}</Button>
                        {addQuestion && <Button size={'small'} type='button' onClick={() => addQuestao()}><MdAdd size={19} /></Button>}
                    </div>
                    {addQuestion && <div>   
                                        <Label>Pergunta</Label><br/>
                                        <InputText value={newQuest?.label} name={'label'} onChange={inputChangeQuestion} /><br/>
                                        <Label>Descrição da pergunta</Label><br/>
                                        <InputText value={newQuest?.descricao} name={'descricao'} onChange={inputChangeQuestion} /><br/>
                                        <Label>Tipo de Campo</Label><br/>
                                        <Select value={newQuest?.tipo} name={'tipo'} onChange={selectChange}>
                                            <Option value={''}>Selecione</Option>
                                            <Option value={'date'} >Data</Option>
                                            <Option value={'text'}>Texto</Option>
                                            <Option value={'textArea'}>Texto Longo</Option>
                                            <Option value={'select'}>Lista de seleção</Option>
                                        </Select><br/>
                                        {newQuest?.tipo === 'select' &&
                                                                    <div style={{display:'flex', gap:20, alignItems:'flex-start', justifyContent:'flex-start'}}>
                                                                        <div style={{display:'flex', flexDirection:'column'}}>
                                                                            <Label>Adicione uma opção</Label>
                                                                            <div style={{display:'flex', gap:10}}>
                                                                                <InputText size={'small'} value={option} name={'option'} onChange={inputChangeQuestion}/>
                                                                                <Button size={'small'} type='button' onClick={() => addOption()} > + </Button>
                                                                            </div>
                                                                        </div>
                                                                        {newQuest.options!=null && newQuest.options?.length>0 && <div style={{display:'flex', flexDirection:'column', overflow:'auto', padding:'4px 8px', border:'solid 1px var(--border-color)', borderRadius:'4px', backgroundColor:'var(--bg-input)', maxHeight:110}}>
                                                                        {newQuest.options?.map((opt,idx) => {return (
                                                                                <div key={idx} style={{display:'grid', gridTemplateColumns:'minMax(50px,200px) 30px 30px', gap:5, borderBottom:'solid 1px var(--border-color)'}}>
                                                                                    <Label size={'small'} style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}> {idx+" - "+opt}</Label>
                                                                                    {idx>0 ? <Button size={'small'} color={'gray'} onClick={() => reorderOption(idx, idx-1)}><MdArrowDropUp /></Button>:<br/>}
                                                                                    <Button size={'small'} color={'red'} type='button' onClick={() => removeOption(opt)}><MdClose /></Button>
                                                                                </div>
                                                                        ) })}
                                                                        </div>}

                                                                    </div>

                                        }
                                    </div>
                    }
                    
                </form>}
            </div>
            <div className='cadAnamnese-view'>
                {newAnamn.questoes?.length>0 && 
                                                <AnamneseQuestoes 
                                                    construindo={true} 
                                                    anamnese={newAnamn} 
                                                    updateAnamnese={() => console.log(newAnamn)}
                                                    removeQuestao={(e,quest) => removeQuestao(quest)}
                                                />
                }
            </div>
        </div>
        
    )
}