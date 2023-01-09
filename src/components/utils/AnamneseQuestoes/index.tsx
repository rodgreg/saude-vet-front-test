import moment from "moment";
import { useEffect, useState } from "react";
import { MdRemove } from "react-icons/md";
import { Anamnese, Questao } from "../../../interfaces/Prontuario";
import { Select, Option, InputDate, TextArea, Button, InputText, Label, Descricao } from "../HtmlComponents";
import './anamneseQuestoes.css';

interface AnamneseQuestoesProps {
    anamnese:Anamnese |null;
    construindo:boolean;
    updateAnamnese: (event: React.MouseEvent<HTMLButtonElement>, anamnese:Anamnese|null) => void;
    removeQuestao?: (event: React.MouseEvent<HTMLButtonElement>, questao:Questao|null) => void;
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
        {!props.construindo && <><Button onClick={(e) => props.updateAnamnese(e, anamneseTemp)}>Salvar</Button><br/> </>}
        {anamneseTemp?.questoes.map((quest,idx) => {

            if (quest.tipo === 'select') {

                return (
                    <div key={idx} className="questao-item">
                        <Label className="questao-item-label">{quest.label}</Label>
                        <Descricao className="questao-item-descricao">{quest.descricao}</Descricao>
                        <div>
                            <Select value={quest.resposta} onChange={(e) => selectAnamneseItem(e,idx)}>
                                <Option value={''}>Selecione</Option>
                                {quest.options?.map((opt, idx) =>
                                    <Option key={idx} value={opt}>{opt}</Option> )}
                            </Select>
                            {props.construindo && <button onClick={(e) => props.removeQuestao!(e,quest)}><MdRemove color="red"/></button>}
                        </div>
                    </div>
                )

            } else if (quest.tipo==='text') {
                return (
                    <div key={idx} className="questao-item">
                        <Label className="questao-item-label">{quest.label}</Label>
                        <Descricao className="questao-item-descricao">{quest.descricao}</Descricao>
                        <div>
                            <InputText type={quest.tipo} value={quest.resposta} onChange={(e)=>inputAnamneseItem(e,idx)} />
                            {props.construindo && <button onClick={(e) => props.removeQuestao!(e,quest)}><MdRemove color="red"/></button>}
                        </div>
                    </div>
                )
            } else if (quest.tipo==='textArea') {
                return (
                    <div key={idx} className="questao-item">
                        <Label className="questao-item-label">{quest.label}</Label>
                        <Descricao className="questao-item-descricao">{quest.descricao}</Descricao>
                        <div>
                            <TextArea rows={2} value={quest.resposta} onChange={(e)=>inputAnamneseItem(e,idx)} />
                            {props.construindo && <button onClick={(e) => props.removeQuestao!(e,quest)}><MdRemove color="red"/></button>}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={idx} className="questao-item">
                        <Label className="questao-item-label">{quest.label}</Label>
                        <Descricao className="questao-item-descricao">{quest.descricao}</Descricao>
                        <div>
                            <InputDate type={quest.tipo} value={quest.resposta} onChange={(e)=>inputAnamneseItem(e,idx)} />
                            {props.construindo && <button onClick={(e) => props.removeQuestao!(e,quest)}><MdRemove color="red"/></button>}
                        </div>
                    </div>
                )
            }
        }
        )}

    </div>
    )
}