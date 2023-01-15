import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { Especie, Raca } from "../../../../interfaces/Util";
import { ApiUtil } from "../../../../services/ApiUtil";
import { InputText, Label, Select, Option, Button } from "../../../utils/HtmlComponents";

export function CadRaca() {

    const apiUtil = ApiUtil();
    const paginationRef = useRef<React.Component<ReactPaginateProps, any, any>|null>(null);
    const [paginationControl, setPaginationControl] = useState({perPage:10, pages:1});
    const [newRaca, setNewRaca] = useState<Raca>({nome:'', especie:{nome:''}})
    const [racaList, setRacaList] = useState<Raca[]>([]);
    const [racaListPaginate, setRacaListPaginate] = useState<Raca[]>([]);
    const [especieList, setEspecieList] = useState<Especie[]>([]);
    const [cadOpen, setCadOpen] = useState<boolean>(false);

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
            arrayListRaca = arrayListRaca.sort((a,b) => {if(a.nome > b.nome){return 1;} else {return -1;}});
            setRacaList(arrayListRaca);
            setRacaListPaginate(arrayListRaca.slice(0,paginationControl.perPage));
            setPaginationControl({...paginationControl, pages:Math.ceil(arrayListRaca.length/paginationControl.perPage)})
        };
    }

    const saveNewRaca = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newRaca.racaID == null) {
            let tempRaca = {...newRaca, dataRegistro:new Date()};
            let result = await apiUtil.saveRaca(tempRaca);
            if (result.status>=200 && result.status<=300) {
                await getListRacas();
                setNewRaca({...newRaca,nome:'', dataRegistro:null , racaID:null});
            };
        } else {
            let result = await apiUtil.updateRaca(newRaca);
            if (result.status>=200 && result.status<=300) {
                await getListRacas();
                setNewRaca({...newRaca,nome:'', dataRegistro:null , racaID:null});
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

    const handlePageClick = (event:any) => { 
        let page = event.selected;
      
        let start = Math.ceil(paginationControl.perPage*page);
        if(start > racaList.length) {
          start = 0;
        };
      
        let finish = Number(start)+Number(paginationControl.perPage);
        if(finish > racaList.length) {
          finish = racaList.length;
        };
      
        let racaPage:Raca[] = racaList.slice(start,finish);
        setRacaListPaginate(racaPage);
    }

    const filterPerEspecie = (e: React.ChangeEvent<HTMLSelectElement>) => {
        paginationRef.current?.setState({selected:0});
        if(e.target.value === '') {
            setRacaListPaginate(racaList.slice(0,paginationControl.perPage));
            setPaginationControl({...paginationControl, pages:Math.ceil(racaList.length/paginationControl.perPage)})
        } else {
            let racaListFiltered = racaList.filter(raca => raca.especie.especieID == Number(e.target.value))
            setRacaListPaginate(racaListFiltered);
            setPaginationControl({...paginationControl, pages:Math.ceil(racaListFiltered.length/paginationControl.perPage)})
        }
    }

    useEffect(() => {
        getListEspecies();
        getListRacas();
    },[])
    
    return (
        <div>
            <h5>Cadastro de Raças</h5>
            {cadOpen? 
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
                        <Button type="button" size={'small'} color={'gray'} onClick={() => {setNewRaca({nome:'', especie:{nome:''}});setCadOpen(false)}}>Cancelar</Button>
                    </div>
                </form>
                :
                <>
                <div style={{display:'flex', margin:'10px 0px', alignItems:'center', columnGap:5}}>
                    <span><b>Filtro: </b></span>
                    <Select name="filtro" onChange={filterPerEspecie} defaultValue={''} >
                        <Option key={-1} value={''}>Selecione</Option>
                        {especieList.map((esp,idx) => (
                            <Option key={idx} value={esp.especieID?.valueOf()}>{esp.nome}</Option>
                        ))} 
                    </Select>
                    <ReactPaginate
                          ref={paginationRef}
                          breakLabel={'...'}
                          previousLabel={'<<'}
                          nextLabel={'>>'}
                          pageCount={paginationControl.pages}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                      />
                    <Button size={'small'} onClick={() => setCadOpen(true)}>Novo</Button>
                </div>
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
                        {racaListPaginate.map((raca,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <MdEdit onClick={() => {setNewRaca(raca);setCadOpen(true)}} style={{cursor:'pointer'}}/>
                                        &nbsp;
                                        <MdDelete onClick={() => {deleteRaca(Number(raca.racaID)); setNewRaca({nome:'', especie:{nome:''}})}} style={{cursor:'pointer'}}/>
                                    </td>
                                    <td>{raca.nome}</td>
                                    <td>{raca.especie.nome}</td>
                                    <td>{moment(raca.dataRegistro).format('DD/MM/YYYY')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </>}
        </div>
    )
}