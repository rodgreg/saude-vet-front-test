import { useEffect, useRef, useState } from "react";
import { Especie } from "../../../../interfaces/Util";
import { Button, InputText, Label, TextArea } from "../../../utils/HtmlComponents";
import { ApiUtil } from "../../../../services/ApiUtil";
import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

export function CadEspecie ()  {
    
    const apiUtil = ApiUtil();
    const paginationRef = useRef<React.Component<ReactPaginateProps, any, any>|null>(null);
    const [paginationControl, setPaginationControl] = useState({perPage:10, pages:1});
    const [especieListPaginate, setEspecieListPaginate] = useState<Especie[]>([]);
    const [newEspecie, setNewEspecie] = useState<Especie>({nome:"", caracteristica:""});
    const [especieList, setEspecieList] = useState<Especie[]>([]);
    const [cadOpen, setCadOpen] = useState<boolean>(false);
    
    const getListEspecies = async() => {
        let result = await apiUtil.listEspecies();
        if(result.status >=200 && result.status <=300) {
            let arrayListEspecie:Especie[] = result.data;
            arrayListEspecie = arrayListEspecie.sort((a,b) => {if(a.nome > b.nome){return 1;} else {return -1;}});
            setEspecieList(arrayListEspecie);
            setEspecieListPaginate(arrayListEspecie.slice(0,paginationControl.perPage));
            setPaginationControl({...paginationControl, pages:Math.ceil(arrayListEspecie.length/paginationControl.perPage)});
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

    const handlePageClick = (event:any) => { 
        let page = event.selected;
      
        let start = Math.ceil(paginationControl.perPage*page);
        if(start > especieList.length) {
          start = 0;
        };
      
        let finish = Number(start)+Number(paginationControl.perPage);
        if(finish > especieList.length) {
          finish = especieList.length;
        };
      
        let racaPage:Especie[] = especieList.slice(start,finish);
        setEspecieListPaginate(racaPage);
    };

    useEffect(() => {
        getListEspecies();
    },[])

    return (
        <div>
            <h5>Cadastro de Espécies</h5>
               {cadOpen? 
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
                        <Button type="button" size={'small'} color={'gray'} onClick={() => {setNewEspecie({nome:'', caracteristica:''});setCadOpen(false)}}>Cancelar</Button>
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
                            <th>Data de Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especieListPaginate.map((especie,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <MdEdit onClick={() => {setNewEspecie(especie);setCadOpen(true)}} style={{cursor:'pointer'}}/>
                                        &nbsp;
                                        <MdDelete onClick={() => {deleteEspecie(Number(especie.especieID)); setNewEspecie({nome:'', caracteristica:''})}} style={{cursor:'pointer'}}/>
                                    </td>
                                    <td>{especie.nome}</td>
                                    <td>{moment(especie.dataRegistro).format('DD/MM/YYYY')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table></>}
        </div>
        
    )

} 