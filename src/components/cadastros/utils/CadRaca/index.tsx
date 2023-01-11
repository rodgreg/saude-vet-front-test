import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Especie, Raca } from "../../../../interfaces/Util";
import { ApiUtil } from "../../../../services/ApiUtil";
import { InputText, Label, Select, Option, TextArea, Button } from "../../../utils/HtmlComponents";

export function CadRaca() {

    const apiUtil = ApiUtil();
    const [newRaca, setNewRaca] = useState<Raca>({nome:'', especie:{nome:''}})
    const [racaList, setRacaList] = useState<Raca[]>([]);
    const [especieList, setEspecieList] = useState<Especie[]>([]);

    const getListEspecies = async() => {
        let result = await apiUtil.listEspecies();
        if(result.status >=200 && result.status <=300) {
            let arrayListEspecie:Especie[] = result.data;
            setEspecieList(arrayListEspecie.sort((a,b) => {if(a.nome > b.nome){return 1;} else {return -1;}}));
        };
    }

    const getListRacas = async() => {
        let result = await apiUtil.listRacas();
        if(result.status >=200 && result.status <=300) {
            let arrayListRaca:Raca[] = result.data;
            setRacaList(arrayListRaca.sort((a,b) => {if(a.nome > b.nome){return 1;} else {return -1;}}));
        };
    }

    const saveNewRaca = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newRaca.racaID == null) {
            let tempRaca = {...newRaca, dataRegistro:new Date()};
            let result = await apiUtil.saveRaca(tempRaca);
            if (result.status>=200 && result.status<=300) {
                await getListRacas();
                setNewRaca({nome:'', especie:{nome:''}});
            };
        } else {
            let result = await apiUtil.updateRaca(newRaca);
            if (result.status>=200 && result.status<=300) {
                await getListRacas();
                setNewRaca({nome:'', especie:{nome:''}});
            };
        };
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRaca({...newRaca, [e.target.name]:e.target.value});
    }

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== '') {
            setNewRaca({...newRaca, [e.target.name]:JSON.parse(e.target.value)});
        } else {
            setNewRaca({nome:'', especie:{nome:''}});
        }
    }

    const deleteRaca = async (racaid: number) => {
        await apiUtil.deleteRaca(racaid);
        await getListRacas();
    }

    useEffect(() => {
        getListEspecies();
        getListRacas();
    },[])
    
    return (
        <div>
            <h2>Cadastro de Raças</h2>
            <form onSubmit={saveNewRaca}>
                    <Label htmlFor="nome">Nome</Label> <br/>
                    <InputText name="nome" id="nome" required onChange={inputChange} value={newRaca.nome} /><br/>
                    <Label htmlFor="especie">Especie</Label> <br/>
                    <Select name="especie" id="especie" onChange={selectChange} value={JSON.stringify(newRaca.especie)} >
                        <Option key={-1} value={''}>Selecione</Option>
                        {especieList.map((esp,idx) => (
                            <Option key={idx} value={JSON.stringify(esp)}>{esp.nome}</Option>
                        ))} 
                    </Select>
                    <div style={{display:'flex', margin:'10px 0px'}}>
                        <Button type="submit" size={'small'}>Salvar</Button>
                        <Button type="button" size={'small'} color={'gray'} onClick={() => setNewRaca({nome:'', especie:{nome:''}})}>Limpar</Button>
                    </div>
                </form>
                <table style={{tableLayout:'fixed', width:'60%'}}>
                    <thead>
                        <tr style={{textAlign:'center'}}>
                            <th style={{width:'65px'}}>Ação</th>
                            <th>Nome</th>
                            <th>Espécie</th>
                            <th>Data de Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {racaList.map((raca,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <MdEdit onClick={() => {setNewRaca(raca);}}/>
                                        &nbsp;
                                        <MdDelete onClick={() => {deleteRaca(Number(raca.racaID)); setNewRaca({nome:'', especie:{nome:''}})}} />
                                    </td>
                                    <td>{raca.nome}</td>
                                    <td>{raca.especie.nome}</td>
                                    <td>{moment(raca.dataRegistro).format('DD/MM/YYYY')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}