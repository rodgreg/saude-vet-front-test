import { useEffect, useRef, useState } from "react";
import { Especie } from "../../../../interfaces/Util";
import { Button, InputText, Label, TextArea } from "../../../utils/HtmlComponents";
import { ApiUtil } from "../../../../services/ApiUtil";
import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";

export function CadEspecie ()  {
    
    const apiUtil = ApiUtil();
    const [newEspecie, setNewEspecie] = useState<Especie>({nome:"", caracteristica:""});
    const [especieList, setEspecieList] = useState<Especie[]>([]);
    
    const getListEspecies = async() => {
        let result = await apiUtil.listEspecies();
        if(result.status >=200 && result.status <=300) {
            let arrayListEspecie:Especie[] = result.data;
            setEspecieList(arrayListEspecie.sort((a,b) => {if(a.nome > b.nome){return 1;} else {return -1;}}));
        };
    }

    const saveNewEspecie = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newEspecie.especieID == null) {
            let tempEspecie = {...newEspecie, dataRegistro:new Date()};
            let result = await apiUtil.saveEspecie(tempEspecie);
            if (result.status>=200 && result.status<=300) {
                await getListEspecies();
                setNewEspecie({nome:'', caracteristica:''});
            };
        } else {
            let result = await apiUtil.updateEspecie(newEspecie);
            if (result.status>=200 && result.status<=300) {
                await getListEspecies();
                setNewEspecie({nome:'', caracteristica:''});
            };
        };
    }

    const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEspecie({...newEspecie, [e.target.name]:e.target.value});
    }

    const setTextArea = (txt:React.FocusEvent<HTMLTextAreaElement, Element>) => {
        setNewEspecie({...newEspecie, caracteristica:txt.target.value});
    }

    const deleteEspecie = async (especieID:number) => {
        await apiUtil.deleteEspecie(especieID);
        await getListEspecies();
    }

    useEffect(() => {
        getListEspecies();
    },[])

    return (
        <div>
            <h2>Cadastro de Espécies</h2>
                <form onSubmit={saveNewEspecie}>
                    <Label htmlFor="nome">Nome</Label> <br/>
                    <InputText name="nome" id="nome" required onChange={inputChange} value={newEspecie.nome} /><br/>
                    <Label htmlFor="caracteristica">Característica</Label> <br/>
                    <TextArea name="caracteristica" id="caracteristica" 
                                rows={4} onChange={setTextArea}
                                value={newEspecie.caracteristica} ></TextArea>
                    <div style={{display:'flex'}}>
                        <Button type="submit" size={'small'}>Salvar</Button>
                        <Button type="button" size={'small'} color={'gray'} onClick={() => setNewEspecie({nome:'', caracteristica:''})}>Limpar</Button>
                    </div>
                </form>
                <table style={{tableLayout:'fixed', width:'60%'}}>
                    <thead>
                        <tr style={{textAlign:'center'}}>
                            <th style={{width:'65px'}}>Ação</th>
                            <th>Nome</th>
                            <th>Data de Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especieList.map((especie,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <MdEdit onClick={() => {setNewEspecie(especie)}}/>
                                        &nbsp;
                                        <MdDelete onClick={() => {deleteEspecie(Number(especie.especieID)); setNewEspecie({nome:'', caracteristica:''})}} />
                                    </td>
                                    <td>{especie.nome}</td>
                                    <td>{moment(especie.dataRegistro).format('DD/MM/YYYY')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
        
    )

} 