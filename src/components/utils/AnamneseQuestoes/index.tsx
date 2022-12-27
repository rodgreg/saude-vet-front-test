import moment from "moment";
import { useEffect, useState } from "react";
import { Anamnese } from "../../../interfaces/Prontuario";
import { Select, Option, InputDate, TextArea, Button } from "../HtmlComponents";
import './anamneseQuestoes.css';

interface AnamneseQuestoesProps {
    anamnese:Anamnese |null;
    updateAnamnese: (event: React.MouseEvent<HTMLButtonElement>, anamnese:Anamnese|null) => void;
}

export function AnamneseQuestoes (props:AnamneseQuestoesProps) {
    const [anamneseTemp, setAnamneseTemp] = useState<Anamnese|null>(null);

    const selectAnamneseItem = (e:any, index:number) => {
        if(anamneseTemp!=null){
            let questoesTmp = anamneseTemp.questoes;
            questoesTmp[index].resposta = e.target.value;
            setAnamneseTemp({...anamneseTemp, questoes:questoesTmp});
        }
    }

    const inputAnamneseItem = (e:any, index:number) => {
        if(anamneseTemp!=null){
            let questoesTmp = anamneseTemp.questoes;
            questoesTmp[index].resposta = e.target.value;
            setAnamneseTemp({...anamneseTemp, questoes:questoesTmp});
        }
    }

    useEffect (() => {
        if(props.anamnese!=null){
            setAnamneseTemp(props.anamnese);
        }
    },[])
    
    return (
        <div className="anamnese-container">
        <Button onClick={(e) => props.updateAnamnese(e, anamneseTemp)}>Salvar</Button><br/>
        {anamneseTemp?.questoes.map((quest,idx) => {

            if (quest.tipo === 'select') {

                return (
                    <div key={idx} className="questao-item">
                        <span className="questao-item-label">{quest.label}</span>
                        <span className="questao-item-descricao">{quest.descricao}</span>
                        <Select value={quest.resposta} onChange={(e) => selectAnamneseItem(e,idx)}>
                            <Option value={''}>Selecione</Option>
                            {quest.options?.map((opt, idx) =>
                                <Option key={idx} value={opt}>{opt}</Option> )}
                        </Select>
                    </div>
                )

            } else if (quest.tipo==='text') {
                return (
                    <div key={idx} className="questao-item">
                        <span className="questao-item-label">{quest.label}</span>
                        <span className="questao-item-descricao">{quest.descricao}</span>
                        <TextArea value={quest.resposta} rows={2} maxLength={255} onChange={(e)=>inputAnamneseItem(e,idx)} />
                    </div>
                )
            } else {
                return (
                    <div key={idx} className="questao-item">
                        <span className="questao-item-label">{quest.label}</span>
                        <span className="questao-item-descricao">{quest.descricao}</span>
                        <InputDate type={quest.tipo} value={quest.resposta} onChange={(e)=>inputAnamneseItem(e,idx)} />
                    </div>
                )
            }
        }
        )}

    </div>
    )
}