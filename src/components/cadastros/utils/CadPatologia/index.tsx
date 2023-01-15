import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { Patologia } from "../../../../interfaces/Util";
import { ApiUtil } from "../../../../services/ApiUtil";
import { Button, InputText, Label, TextArea } from "../../../utils/HtmlComponents";

export function CadPatologia() {

    const apiUtil = ApiUtil();
    const paginationRef = useRef<React.Component<ReactPaginateProps, any, any>|null>(null);
    const [paginationControl, setPaginationControl] = useState({perPage:10, pages:1});
    const [patologiaListPaginate, setPatologiaListPaginate] = useState<Patologia[]>([]);
    const [newPatologia, setNewPatologia] = useState<Patologia>({nome:'', codigo:'', descricao:'', dataRegistro:null, patologiaID:null});
    const [patologiaList, setPatologiaList] = useState<Patologia[]>([]);
    const [cadOpen, setCadOpen] = useState<boolean>(false);

    const getListPatologia = async () => {
        let result = await apiUtil.listPatologias();
        if(result.status >=200 && result.status <=300) {
            let arrayListPatologia:Patologia[] = result.data;
            arrayListPatologia = arrayListPatologia.sort((a,b) => {if(a.nome > b.nome){return 1;} else {return -1;}});
            setPatologiaList(arrayListPatologia);
            setPatologiaListPaginate(arrayListPatologia.slice(0,paginationControl.perPage))
        };
    }

    const saveNewPatologia = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPatologia.patologiaID == null) {
            let tempPatologia = {...newPatologia, dataRegistro:new Date()};
            let result = await apiUtil.savePatologia(tempPatologia);
            if (result.status>=200 && result.status<=300) {
                await getListPatologia();
                setNewPatologia({nome:'', codigo:'', descricao:'', dataRegistro:null, patologiaID:null});
            };
        } else {
            let result = await apiUtil.updatePatologia(newPatologia);
            if (result.status>=200 && result.status<=300) {
                await getListPatologia();
                setNewPatologia({nome:'', codigo:'', descricao:'', dataRegistro:null, patologiaID:null});
            };
        };
    }

    const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewPatologia({...newPatologia,[e.target.name]:e.target.value});
    }

    const textAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPatologia({...newPatologia,[e.target.name]:e.target.value});
    }

    const deletePatologia = async (patologiaid:number) => {
        await apiUtil.deletePatologia(patologiaid);
        await getListPatologia();
    }

    const handlePageClick = (event:any) => { 
        let page = event.selected;
      
        let start = Math.ceil(paginationControl.perPage*page);
        if(start > patologiaList.length) {
          start = 0;
        };
      
        let finish = Number(start)+Number(paginationControl.perPage);
        if(finish > patologiaList.length) {
          finish = patologiaList.length;
        };
      
        let patologiaPage:Patologia[] = patologiaList.slice(start,finish);
        setPatologiaListPaginate(patologiaPage);
    }

    useEffect(() => {
        getListPatologia();
    },[])

    return (
        <div>
            <h5>Cadastro de Patologias</h5>
            {cadOpen? 
            <form onSubmit={saveNewPatologia}>
                <Label htmlFor="nome">Nome</Label><br/>
                <InputText id="nome" name="nome" required value={newPatologia.nome} onChange={inputChange} /><br/>
                <Label htmlFor="codigo">Código</Label><br/>
                <InputText id="codigo" name="codigo" value={newPatologia.codigo} size={'small'} onChange={inputChange} /><br/>
                <Label htmlFor="descricao">Descrição</Label><br/>
                <TextArea rows={3} id="descricao" name="descricao" value={newPatologia.descricao} onChange={textAreaChange} />
                <div style={{display:'flex'}}>
                    <Button type="submit" size={'small'}>Salvar</Button>
                    <Button type="button" size={'small'} color={'gray'} onClick={() => setNewPatologia({nome:'', codigo:'', descricao:'', dataRegistro:null, patologiaID:null})}>Limpar</Button>
                    <Button type="button" size={'small'} color={'gray'} onClick={() => {setNewPatologia({nome:'', codigo:'', descricao:'', dataRegistro:null, patologiaID:null});setCadOpen(false)}}>Cancelar</Button>
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
                        <th>Código</th>
                        <th>Data de Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {patologiaListPaginate.map((patologia,idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <MdEdit onClick={() => {setNewPatologia(patologia);setCadOpen(true)}} style={{cursor:'pointer'}}/>
                                    &nbsp;
                                    <MdDelete onClick={() => {deletePatologia(Number(patologia.patologiaID)); setNewPatologia({nome:'', codigo:'', descricao:'', dataRegistro:null, patologiaID:null})}} style={{cursor:'pointer'}}/>
                                </td>
                                <td>{patologia.nome}</td>
                                <td>{patologia.codigo}</td>
                                <td>{moment(patologia.dataRegistro).format('DD/MM/YYYY')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>}
        </div>
    )
}