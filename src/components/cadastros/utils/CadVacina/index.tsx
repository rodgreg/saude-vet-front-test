import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { Medicamento } from "../../../../interfaces/Util";
import { ApiUtil } from "../../../../services/ApiUtil";
import { Button, InputText, Label, TextArea } from "../../../utils/HtmlComponents";

export function CadVacina() {
    
    // const apiUtil = ApiUtil();
    // const paginationRef = useRef<React.Component<ReactPaginateProps, any, any>|null>(null);
    // const [paginationControl, setPaginationControl] = useState({perPage:10, pages:1});
    // const [medicamentoListPaginate, setMedicamentoListPaginate] = useState<Medicamento[]>([]);
    // const [newMedicamento, setNewMedicamento] = useState<Medicamento>({nome:'', descricao:'', dataRegistro:null, medicamentoID:null, indicacao:'',posologia:''});
    // const [medicamentoList, setMedicamentoList] = useState<Medicamento[]>([]);

    // const getListMedicamento = async () => {
    //     let result = await apiUtil.listMedicamentos();
    //     if(result.status >=200 && result.status <=300) {
    //         let arrayListMedicamento:Medicamento[] = result.data;
    //         arrayListMedicamento = arrayListMedicamento.sort((a,b) => {if(a.nome > b.nome){return 1;} else {return -1;}});
    //         setMedicamentoList(arrayListMedicamento);
    //         setMedicamentoListPaginate(arrayListMedicamento.slice(0,paginationControl.perPage))
    //     };
    // }

    // const saveNewMedicamento = async (e:React.ChangeEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (newMedicamento.medicamentoID == null) {
    //         let tempMedicamento = {...newMedicamento, dataRegistro:new Date()};
    //         let result = await apiUtil.saveMedicamento(tempMedicamento);
    //         if (result.status>=200 && result.status<=300) {
    //             await getListMedicamento();
    //             setNewMedicamento({nome:'', descricao:'', dataRegistro:null, medicamentoID:null, indicacao:'',posologia:''});
    //         };
    //     } else {
    //         let result = await apiUtil.updateMedicamento(newMedicamento);
    //         if (result.status>=200 && result.status<=300) {
    //             await getListMedicamento();
    //             setNewMedicamento({nome:'', descricao:'', dataRegistro:null, medicamentoID:null, indicacao:'',posologia:''});
    //         };
    //     };
    // }

    // const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     setNewMedicamento({...newMedicamento,[e.target.name]:e.target.value});
    // }

    // const textAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setNewMedicamento({...newMedicamento,[e.target.name]:e.target.value});
    // }

    // const deleteMedicamento = async (medicamentoid:number) => {
    //     await apiUtil.deleteMedicamento(medicamentoid);
    //     await getListMedicamento();
    // }

    // const handlePageClick = (event:any) => { 
    //     let page = event.selected;
      
    //     let start = Math.ceil(paginationControl.perPage*page);
    //     if(start > medicamentoList.length) {
    //       start = 0;
    //     };
      
    //     let finish = Number(start)+Number(paginationControl.perPage);
    //     if(finish > medicamentoList.length) {
    //       finish = medicamentoList.length;
    //     };
      
    //     let medicamentoPage:Medicamento[] = medicamentoList.slice(start,finish);
    //     setMedicamentoListPaginate(medicamentoPage);
    // }

    // useEffect(() => {
    //     getListMedicamento();
    // },[])

    return (
        <div>
            <h5>Cadastro de Vacinas</h5>
            {/* <form onSubmit={saveNewMedicamento}>
                <Label htmlFor="nome">Nome</Label><br/>
                <InputText id="nome" name="nome" required value={newMedicamento.nome} onChange={inputChange} /><br/>
                <Label htmlFor="descricao">Descrição</Label><br/>
                <TextArea rows={3} id="descricao" name="descricao" value={newMedicamento.descricao} onChange={textAreaChange} /><br/>
                <Label htmlFor="posologia">Posologia</Label><br/>
                <TextArea rows={3} id="posologia" name="posologia" value={newMedicamento.posologia} onChange={textAreaChange} /><br/>
                <Label htmlFor="indicacao">Indicação</Label><br/>
                <TextArea rows={3} id="indicacao" name="indicacao" value={newMedicamento.indicacao} onChange={textAreaChange} /><br/>
                <div style={{display:'flex'}}>
                    <Button type="submit" size={'small'}>Salvar</Button>
                    <Button type="button" size={'small'} color={'gray'} onClick={() => setNewMedicamento({nome:'', descricao:'', dataRegistro:null, medicamentoID:null, indicacao:'',posologia:''})}>Limpar</Button>
                </div>
            </form>
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
                    {medicamentoListPaginate.map((medicamento,idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <MdEdit onClick={() => {setNewMedicamento(medicamento)}}/>
                                    &nbsp;
                                    <MdDelete onClick={() => {deleteMedicamento(Number(medicamento.medicamentoID)); setNewMedicamento({nome:'', descricao:'', dataRegistro:null, medicamentoID:null, indicacao:'',posologia:''})}} />
                                </td>
                                <td>{medicamento.nome}</td>
                                <td>{medicamento.indicacao}</td>
                                <td>{moment(medicamento.dataRegistro).format('DD/MM/YYYY')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
        </div>
    )
}