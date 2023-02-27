import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { Vacina } from "../../../../interfaces/Util";
import { ApiUtil } from "../../../../services/ApiUtil";
import { Button, InputText, Label, TextArea } from "../../../utils/HtmlComponents";

export function CadVacina() {
    
    const apiUtil = ApiUtil();
    const paginationRef = useRef<React.Component<ReactPaginateProps, any, any>|null>(null);
    const [paginationControl, setPaginationControl] = useState({perPage:10, pages:1});
    const [vacinaListPaginate, setVacinaListPaginate] = useState<Vacina[]>([]);
    const [newVacina, setNewVacina] = useState<Vacina>({nome:'', dataRegistro:null, vacinaID:null, indicacao:'',periodicidade:''});
    const [vacinaList, setVacinaList] = useState<Vacina[]>([]);
    const [cadOpen, setCadOpen] = useState<boolean>(false);

    const getListVacinas = async () => {
        let result = await apiUtil.listVacinas();
        if(result.status >=200 && result.status <=300) {
            let arrayListVacina:Vacina[] = result.data;
            arrayListVacina = arrayListVacina.sort((a,b) => {if(a.nome > b.nome){return 1;} else {return -1;}});
            setVacinaList(arrayListVacina);
            setVacinaListPaginate(arrayListVacina.slice(0,paginationControl.perPage))
        };
    }

    const saveNewVacina = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newVacina.vacinaID == null) {
            console.log("save");
            let temp = {...newVacina, dataRegistro:new Date()};
            let result = await apiUtil.saveVacina(temp);
            if (result.status>=200 && result.status<=300) {
                await getListVacinas();
                setNewVacina({nome:'', dataRegistro:null, vacinaID:null, indicacao:'',periodicidade:''});
            };
        } else {
            console.log("update");
            let result = await apiUtil.updateVacina(newVacina);
            if (result.status>=200 && result.status<=300) {
                await getListVacinas();
                setNewVacina({nome:'', dataRegistro:null, vacinaID:null, indicacao:'',periodicidade:''});
            };
        };
    }

    const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewVacina({...newVacina,[e.target.name]:e.target.value});
    }

    const textAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewVacina({...newVacina,[e.target.name]:e.target.value});
    }

    const deleteVacina = async (vacinaid:number) => {
        await apiUtil.deleteVacina(vacinaid);
        await getListVacinas();
    }

    const handlePageClick = (event:any) => { 
        let page = event.selected;
      
        let start = Math.ceil(paginationControl.perPage*page);
        if(start > vacinaList.length) {
          start = 0;
        };
      
        let finish = Number(start)+Number(paginationControl.perPage);
        if(finish > vacinaList.length) {
          finish = vacinaList.length;
        };
      
        let vacinaPage:Vacina[] = vacinaList.slice(start,finish);
        setVacinaListPaginate(vacinaPage);
    }

    useEffect(() => {
        getListVacinas();
    },[])

    return (
        <div>
            <h5>Cadastro de Vacinas</h5>
            {cadOpen? 
            <form onSubmit={saveNewVacina}>
                <Label htmlFor="nome">Nome</Label><br/>
                <InputText id="nome" name="nome" required value={newVacina.nome} onChange={inputChange} /><br/>
                <Label htmlFor="periodicidade">Periodicidade</Label><br/>
                <TextArea rows={3} id="periodicidade" name="periodicidade" value={newVacina.periodicidade} onChange={textAreaChange} /><br/>
                <Label htmlFor="indicacao">Indicacao</Label><br/>
                <TextArea rows={3} id="indicacao" name="indicacao" value={newVacina.indicacao} onChange={textAreaChange} /><br/>
                <div style={{display:'flex'}}>
                    <Button type="submit" size={'small'}>Salvar</Button>
                    <Button type="button" size={'small'} color={'gray'} onClick={() => setNewVacina({nome:'', dataRegistro:null, vacinaID:null, indicacao:'',periodicidade:''})}>Limpar</Button>
                    <Button type="button" size={'small'} color={'gray'} onClick={() => {setNewVacina({nome:'', dataRegistro:null, vacinaID:null, indicacao:'',periodicidade:''});setCadOpen(false)}}>Cancelar</Button>
                </div>
            </form>
            :
            <>
            <div style={{display:'flex', margin:'10px 0px', alignItems:'center', columnGap:5}}>
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
                        <th>Periodicidade</th>
                        <th>Indicação</th>
                        <th>Data de Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {vacinaListPaginate.map((vacina,idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <MdEdit onClick={() => {setNewVacina(vacina);setCadOpen(true)}} style={{cursor:'pointer'}}/>
                                    &nbsp;
                                    <MdDelete onClick={() => {deleteVacina(Number(vacina.vacinaID)); setNewVacina({nome:'', dataRegistro:null, vacinaID:null, indicacao:'',periodicidade:''})}} style={{cursor:'pointer'}}/>
                                </td>
                                <td>{vacina.nome}</td>
                                <td>{vacina.periodicidade}</td>
                                <td>{vacina.indicacao}</td>
                                <td>{moment(vacina.dataRegistro).format('DD/MM/YYYY')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>}
        </div>
    )
}