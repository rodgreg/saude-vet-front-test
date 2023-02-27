import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ApiRegistro } from '../../../services/ApiRegistro';
import { Responsavel } from '../../../interfaces/Responsavel';
import './listCadastros.css';
import { FormDetailResponsavel } from '../FormDetailResponsavel';
import { Button, LinkButton, Option, Select } from '../../utils/HtmlComponents';
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import 'moment/locale/pt-br';
import { Veterinario } from '../../../interfaces/Veterinario';
import { FormDetailVeterinario } from '../FormDetailVeterinario';
import { FormDetailPet } from '../FormDetailPet';
import { MdAdd, MdRefresh } from 'react-icons/md';
import { Loading } from '../../utils/Loading';
import { Pet, Pet_Resp } from '../../../interfaces/Pet';

interface listCadastrosProps {
  editResFormClick:(event: React.MouseEvent<HTMLButtonElement>, responsavel:Responsavel|null) => void;
  editVetFormClick:(event: React.MouseEvent<HTMLButtonElement>, veterinario:Veterinario|null) => void;
  editPetFormClick:(event: React.MouseEvent<HTMLButtonElement>, petR:Pet_Resp|null) => void;
}

export function ListCadastros (props:listCadastrosProps) {

  const api = ApiRegistro();
  const paginationRef = useRef<any>();
  const paginationPetRef = useRef<any>();
  const paginationVetRef = useRef<any>();
  const [listResponsaveis, setListResponsaveis] = useState<Responsavel[]>([]);
  const [listPets, setListPets] = useState<Pet_Resp[]>([]);
  const [listVeterinario, setListVeterinario] = useState<Veterinario[]>([]);
  const [respSelected, setRespSelected] = useState<Responsavel>({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, pets: [], enderecos: [], contatos: [],});
  const [petSelected, setPetSelected] = useState<Pet_Resp>({pet:{petID:null, nome:"", cor:"", fertil:false, genero:"", nascimento:null, pedigree:false, raca:null, dataRegistro:null} ,
                                                            responsavel:{responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],}});
  const [vetSelected, setVetSelected] = useState<Veterinario>({veterinarioID:null, nome:"", sobrenome:"", genero:"", cpf:"", cidade:"", uf:"",crmvs:[]});
  const [paginateList, setPaginateList] = useState({list: listResponsaveis, perPage:10, page:0, pages:1});
  const [paginateListPet, setPaginateListPet] = useState({list: listPets, perPage:10, page:0, pages:1});
  const [paginateListVet, setPaginateListVet] = useState({list: listVeterinario, perPage:10, page:0, pages:1});
  const [showCadResp, setShowCadResp] = useState<Boolean>(false);
  const [showCadPet, setShowCadPet] = useState<Boolean>(false);
  const [showCadVet, setShowCadVet] = useState<Boolean>(false);
  const [showList, SetShowList] = useState<String>('responsavel');
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getListResponsaveis = async () => {
    setIsLoading(true);
    var list:any = await api.listResponsaveis();
    if (list?.status >= 200 && list?.status <= 300){
        setListResponsaveis(list.data);
        let listResponsavelTmp:Responsavel[] = list.data;
        // let listResponsavelTmp = listTeste;
        listResponsavelTmp = listResponsavelTmp.sort((a,b) => {
                      if(a.nome == null || b.nome == null){return 0;}
                      let fa = a.nome.toLowerCase(),
                          fb = b.nome.toLowerCase();

                      if (fa < fb) {
                          return -1;
                      }
                      if (fa > fb) {
                          return 1;
                      }
                      if (fa === fb) {
                      let la = a?.nome?.toLowerCase(),
                          lb = b?.nome?.toLowerCase();
                      
                      if (la < lb) {
                          return -1;
                      }
                      if (la > lb) {
                          return 1;
                      }
                      return 0;
                      }
                      return 0;
                  } 
              );

        // Monta Lista Responsável.
        setListResponsaveis(listResponsavelTmp);

        let pages = 1;    
        if(paginateList.perPage < listResponsavelTmp.length) {
          pages = Math.ceil(listResponsavelTmp.length/paginateList.perPage);
        };
        let listPage = listResponsavelTmp.slice(0,paginateList.perPage);
        setPaginateList({...paginateList, pages: pages, list: listPage});

        getListPets(listResponsavelTmp);
    } else {
      setIsLoading(false);
    }
    
    setIsLoading(false);
  };

  const getListPets = async (list:Responsavel[]) => {
    // Monta Lista Pet a partir da lista de Responsáveis.
    let petListTemp:Pet[] | any[] = list.map(resp => resp.pets?.map(pet => {let pets:Pet_Resp = {pet:pet, responsavel:resp}; return(pets)}))
    
    let listTmpConcat:any[] = [];
    for (let i=0; i<petListTemp.length; i++) {
     listTmpConcat = listTmpConcat.concat(petListTemp[i]);
    };

    listTmpConcat = listTmpConcat.sort((a,b) => {
                                              if(a.pet.nome == null || b.pet.nome == null){return 0;}
                                              let fa = a.pet.nome.toLowerCase(),
                                                  fb = b.pet.nome.toLowerCase();

                                              if (fa < fb) {
                                                  return -1;
                                              }
                                              if (fa > fb) {
                                                  return 1;
                                              }
                                              if (fa === fb) {
                                              let la = a.responsavel.nome.toLowerCase(),
                                                  lb = b.responsavel.nome.toLowerCase();
                                              
                                              if (la < lb) {
                                                  return -1;
                                              }
                                              if (la > lb) {
                                                  return 1;
                                              }
                                              return 0;
                                              }
                                              return 0;
                                            })

    setListPets(listTmpConcat);

    let pagesPet = 1;    
    if(paginateListPet.perPage < listTmpConcat.length) {
      pagesPet = Math.ceil(listTmpConcat.length/paginateListPet.perPage);
    };
    let listPagePet = listTmpConcat.slice(0,paginateListPet.perPage);
    setPaginateListPet({...paginateListPet, pages: pagesPet, list: listPagePet});

  }

  const getListVeterinarios = async () => {
    setIsLoading(true);
    var list:any = await api.listVeterinarios();
      if (list?.status >= 200 && list?.status <= 300){
          setListVeterinario(list.data);
          let listVeterinarioTmp:Veterinario[] = list.data;
          // let listVeterinarioTmp = listTesteVet;
          listVeterinarioTmp = listVeterinarioTmp.sort((a,b) => {
                        let fa = a?.nome?.toLowerCase(),
                            fb = b?.nome?.toLowerCase();
    
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        if (fa === fb) {
                        let la = a?.nome?.toLowerCase(),
                            lb = b?.nome?.toLowerCase();
                        
                        if (la < lb) {
                            return -1;
                        }
                        if (la > lb) {
                            return 1;
                        }
                        return 0;
                        }
                        return 0;
                    } 
                );
          setListVeterinario(listVeterinarioTmp);
          let pages = 1;
          
          if(paginateListVet.perPage < listVeterinarioTmp.length) {
          pages = Math.ceil(listVeterinarioTmp.length/paginateListVet.perPage);
          };
          let listPage = listVeterinarioTmp.slice(0,paginateListVet.perPage);
          setPaginateListVet({...paginateListVet, pages: pages, list: listPage});
      } else {
        setIsLoading(false);
      }
    setIsLoading(false);
  };

  const handlePageClick = (event:any) => { 
      let page = event.selected;
    
      let start = Math.floor(paginateList.perPage*page);
      if(start > listResponsaveis.length) {
        start = 0;
      };
    
      let finish = Number(start)+Number(paginateList.perPage);
      if(finish > listResponsaveis.length) {
        finish = listResponsaveis.length;
      };
    
      let respPage:Responsavel[] = listResponsaveis.slice(start,finish);
      setPaginateList({...paginateList, page:page, list:respPage})
  };

  const handlePagePetClick = (event:any) => { 
    let page = event.selected;
    
    let start = Math.floor(paginateListPet.perPage*page);
    if(start > listPets.length) {
      start = 0;
    };
  
    let finish = Number(start)+Number(paginateListPet.perPage);
    if(finish > listPets.length) {
      finish = listPets.length;
    };
  
    let petPage:Pet_Resp[] = listPets.slice(start,finish);
    setPaginateListPet({...paginateListPet, page:page, list:petPage})
  };

  const handlePageVetClick = (event:any) => { 
    let page = event.selected;
  
    let start = Math.floor(paginateListVet.perPage*page);
    if(start > listVeterinario.length) {
      start = 0;
    };
  
    let finish = Number(start)+Number(paginateListVet.perPage);
    if(finish > listVeterinario.length) {
      finish = listVeterinario.length;
    };
  
    let vetPage:Veterinario[] = listVeterinario.slice(start,finish);
    setPaginateListVet({...paginateListVet, page:page, list:vetPage})
  };

  const setItensPerPage = (select:any) => {
      let itensPerPage = select.target[select.target.selectedIndex].value;
      
      let pages = 1
      if(itensPerPage <= listResponsaveis.length) {
        pages = Math.ceil(listResponsaveis.length/itensPerPage);
      };
    
      if(paginationRef.current.state.selected > (pages-1)){
        paginationRef.current.state.selected = pages-1;
      } 
    
      let start = Math.floor(itensPerPage*paginateList.page);
      if(start > listResponsaveis.length) {
        start = 0;
      };
    
      let finish = Number(start)+Number(itensPerPage);
      if(finish > listResponsaveis.length) {
        finish = listResponsaveis.length;
      };
    
      if(paginationRef.current.state.selected === 0) {
        start = 0;
        finish = itensPerPage;
      }
    
      let petsPage = listResponsaveis.slice(start,finish);
      
      setPaginateList({...paginateList, perPage: itensPerPage, pages: pages, list: petsPage});
  };

  const setItensPerPagePet = (select:any) => {
    let itensPerPage = select.target[select.target.selectedIndex].value;
    
    let pages = 1
    if(itensPerPage <= listPets.length) {
      pages = Math.ceil(listPets.length/itensPerPage);
    };
  
    if(paginationPetRef.current.state.selected > (pages-1)){
      paginationPetRef.current.state.selected = pages-1;
    } 
  
    let start = Math.floor(itensPerPage*paginateListPet.page);
    if(start > listPets.length) {
      start = 0;
    };
  
    let finish = Number(start)+Number(itensPerPage);
    if(finish > listPets.length) {
      finish = listResponsaveis.length;
    };
  
    if(paginationPetRef.current.state.selected === 0) {
      start = 0;
      finish = itensPerPage;
    }
  
    let petsPage = listPets.slice(start,finish);
    
    setPaginateListPet({...paginateListPet, perPage: itensPerPage, pages: pages, list: petsPage});
  };

  const setItensPerPageVet = (select:any) => {
    let itensPerPage = select.target[select.target.selectedIndex].value;
    
    let pages = 1
    if(itensPerPage <= listVeterinario.length) {
      pages = Math.ceil(listVeterinario.length/itensPerPage);
    };
  
    if(paginationVetRef.current.state.selected > (pages-1)){
      paginationVetRef.current.state.selected = pages-1;
    } 
  
    let start = Math.floor(itensPerPage*paginateList.page);
    if(start > listVeterinario.length) {
      start = 0;
    };
  
    let finish = Number(start)+Number(itensPerPage);
    if(finish > listVeterinario.length) {
      finish = listVeterinario.length;
    };
  
    if(paginationVetRef.current.state.selected === 0) {
      start = 0;
      finish = itensPerPage;
    }
  
    let vetPage = listVeterinario.slice(start,finish);
    
    setPaginateListVet({...paginateListVet, perPage: itensPerPage, pages: pages, list: vetPage});
  };

  const selectAll = () => {
    var aInputs = document.getElementsByTagName('input');
    for(let i=1; i< aInputs.length; i++) {
      aInputs[i].checked = aInputs[0].checked;
    }
  };

  const showDetailResp = (respDetail: Responsavel) => {
    setRespSelected(respDetail);
    setShowCadResp(true);
    setShowCadVet(false);
    setShowCadPet(false);
  };

  const showDetailPet = (petDetail: Pet_Resp) => {
    setPetSelected(petDetail);
    setShowCadResp(false);
    setShowCadVet(false);
    setShowCadPet(true);
  };

  const showDetailVet = (vet: Veterinario) => {
    setVetSelected(vet);
    setShowCadVet(true);
    setShowCadResp(false);
    setShowCadPet(false);
  };

  const deleteSelected = () => {
    var aInputs = document.getElementsByTagName('input');
    var deleteList:Responsavel[] = [];
    for(let i=1; i< aInputs.length; i++) {
      if(aInputs[i].checked) {
        var temp = paginateList.list.filter(resp => resp.responsavelID===Number(aInputs[i].value))
        deleteList = deleteList.concat(temp);
      }
    }
  }

  useEffect(() => {
    moment.locale('pt-br');
    getListResponsaveis();
    getListVeterinarios();
  },[]);

  return (
      <div>
        {isLoading && <Loading />}
        <div >
          <div className='tab_list_conteiner' >
            <div className={showList==='responsavel'?'tab_list_selected':'tab_list'}>
                <LinkButton color={'dark'} size={'small'} onClick={() => SetShowList('responsavel')}>Responsáveis</LinkButton>
            </div>
            <div className={showList==='pet'?'tab_list_selected':'tab_list'} >
                <LinkButton color={'dark'} size={'small'} onClick={() => SetShowList('pet')}>Pets</LinkButton>
            </div>
            <div className={showList==='veterinario'?'tab_list_selected':'tab_list'} >
                <LinkButton color={'dark'} size={'small'} onClick={() => {SetShowList('veterinario'); if(listVeterinario.length<=0){getListVeterinarios}}}>Veterinários</LinkButton>
            </div>
          </div>
          { showList==='responsavel' && 
              <div className='content_list'>
                <div id="controller_table">
                  <Select size={'small'} value={paginateList.perPage} onChange={setItensPerPage}>
                      <Option size={'small'} value={2}>2</Option>
                      <Option size={'small'} value={5}>5</Option>
                      <Option size={'small'} value={10}>10</Option>
                      <Option size={'small'} value={25}>25</Option>
                      <Option size={'small'} value={50}>50</Option>
                      <Option size={'small'} value={100}>100</Option>
                  </Select>
                  <ReactPaginate
                          ref={paginationRef}
                          breakLabel={'...'}
                          previousLabel={'<<'}
                          nextLabel={'>>'}
                          pageCount={paginateList.pages}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                      />
                  <MdRefresh size={22} onClick={() => getListResponsaveis()} style={{cursor:'pointer'}} />
                  <Button size={'small'} onClick={(e) => props.editResFormClick(e, null)}><MdAdd size={15}/></Button>
                </div>
                <div id="content_table">
                    <table>
                      <thead>
                        <tr>
                            <th style={{width:'10px'}}><input key={-1} value={-1} type={"checkbox"} onChange={selectAll} /></th>
                            <th style={{width:'25%'}}>Nome Completo</th>
                            <th style={{width:'25%'}}>Bairro</th>
                            <th style={{width:'25%'}}>Primeiro Contato</th>
                            <th style={{width:'10%'}}>Idade</th>
                            <th style={{width:'5%'}}>Pets</th>
                            <th style={{width:'20%'}}>Registrado em</th>
                        </tr>
                      </thead>
                      <tbody>
                          {(paginateList.list.length > 0 && paginateList.list != null)?
                              paginateList.list.map((resp,idx) =>
                            <tr key={idx}>
                              <td><input key={Number(resp.responsavelID)} value={resp?.responsavelID?Number(resp.responsavelID):""} type={"checkbox"} /></td>
                              <td >
                                <LinkButton color={'dark'} size={'small'} onClick={() => showDetailResp(resp)}>
                                  {resp?.nome+" "+resp?.sobrenome}
                                </LinkButton>
                              </td>
                              <td>
                                <span>{(resp.enderecos && resp.enderecos?.length>0)?resp.enderecos[0].bairro+"-"+resp.enderecos[0].cidade+"/"+resp.enderecos[0].uf:"Sem cadastro"}</span>
                              </td>
                              <td>
                                <span>{(resp.contatos && resp.contatos.length >0)?resp.contatos[0].tipoContato+": "+resp.contatos[0].descricao:"Sem Cadastro"}</span>
                              </td>
                              <td>
                                <span>{moment(resp.nascimento).add(1,'year').fromNow(true)}</span>
                              </td>
                              <td>
                                <span>{resp.pets?.length}</span>
                              </td>
                              <td>
                                <span>{moment(resp.dataRegistro).format('DD/MM/yyyy HH:mm')}</span>
                              </td>
                            </tr>
                          ):<tr><td colSpan={9} style={{textAlign:'center'}}><b>Sem resultado</b></td></tr>}
                      </tbody>
                  </table>
                </div>
              </div>
          }
          { showList==='pet' && 
              <div className='content_list'>
                <div id="controller_table">
                  <Select size={'small'} value={paginateListPet.perPage} onChange={setItensPerPagePet}>
                      <Option size={'small'} value={2}>2</Option>
                      <Option size={'small'} value={5}>5</Option>
                      <Option size={'small'} value={10}>10</Option>
                      <Option size={'small'} value={25}>25</Option>
                      <Option size={'small'} value={50}>50</Option>
                      <Option size={'small'} value={100}>100</Option>
                  </Select>
                  <ReactPaginate
                          ref={paginationPetRef}
                          breakLabel={'...'}
                          previousLabel={'<<'}
                          nextLabel={'>>'}
                          pageCount={paginateListPet.pages}
                          onPageChange={handlePagePetClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                      />
                  <MdRefresh size={22} onClick={() => getListResponsaveis()} style={{cursor:'pointer'}} />
                  <Button size={'small'} onClick={(e) => props.editPetFormClick(e,null)} ><MdAdd size={15}/></Button>
                </div>
                <div id="content_table">
                    <table>
                      <thead>
                        <tr>
                            <th style={{width:'10px'}}><input key={-1} value={-1} type={"checkbox"} onChange={selectAll} /></th>
                            <th style={{width:'20%'}}>Nome</th>
                            <th style={{width:'10%'}}>Idade</th>
                            <th style={{width:'10%'}}>Espécie</th>
                            <th style={{width:'10%'}}>Raça</th>
                            <th style={{width:'5%'}}>Fértil</th>
                            <th style={{width:'5%'}}>Pedigree</th>
                            <th style={{width:'20%'}}>Responsável</th>
                            <th style={{width:'20%'}}>Registrado em</th>
                        </tr>
                      </thead>
                      <tbody>
                          {(paginateListPet.list.length > 0 && paginateListPet.list != null)?
                              paginateListPet.list.map((pet,idx) => {if(pet.pet!=null && pet.responsavel!=null) {return(
                              <tr key={idx}>
                              <td><input key={Number(pet.pet.petID)} value={pet.pet.petID?Number(pet.pet.petID):""} type={"checkbox"} /></td>
                              <td >
                                <LinkButton color={'dark'} size={'small'} onClick={() => showDetailPet(pet)}>
                                  {pet?.pet.nome}
                                </LinkButton>
                              </td>
                              <td><span>{moment(pet.pet.nascimento).add(1,'year').fromNow(true)}</span></td>
                              <td >{pet?.pet.raca?.especie.nome}</td>
                              <td >{pet?.pet.raca?.nome}</td>
                              <td >{pet?.pet.fertil?"Sim":"Não"}</td>
                              <td >{pet?.pet.pedigree?"Sim":"Não"}</td>
                              <td >{pet.responsavel?.nome + " " + pet.responsavel.sobrenome}</td>
                              <td>
                                <span>{moment(pet.pet.dataRegistro).format('DD/MM/yyyy HH:mm')}</span>
                              </td>
                            </tr>

                              )}}):<tr><td colSpan={9} style={{textAlign:'center'}}><b>Sem resultado</b></td></tr>}
                      </tbody>
                  </table>
                </div>
              </div>
          }
          { showList==='veterinario' && 
              <div className='content_list'>
                <div id="controller_table">
                  <Select size={'small'} value={paginateListVet.perPage} onChange={setItensPerPageVet}>
                      <Option size={'small'} value={2}>2</Option>
                      <Option size={'small'} value={5}>5</Option>
                      <Option size={'small'} value={10}>10</Option>
                      <Option size={'small'} value={25}>25</Option>
                      <Option size={'small'} value={50}>50</Option>
                      <Option size={'small'} value={100}>100</Option>
                  </Select>
                  <ReactPaginate
                          ref={paginationVetRef}
                          breakLabel={'...'}
                          previousLabel={'<<'}
                          nextLabel={'>>'}
                          pageCount={paginateListVet.pages}
                          onPageChange={handlePageVetClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                      />
                  <MdRefresh size={22} onClick={() => getListVeterinarios()} style={{cursor:'pointer'}} />
                  <Button size={'small'} onClick={(e) => props.editVetFormClick(e,null)} ><MdAdd size={15}/></Button>
                </div>
                <div id="content_table">
                    <table>
                      <thead>
                        <tr>
                            <th style={{width:'10px'}}><input key={-1} value={-1} type={"checkbox"} onChange={selectAll} /></th>
                            <th style={{width:'35%'}}>Nome Completo</th>
                            <th style={{width:'20%'}}>Cidade</th>
                            <th style={{width:'10%'}}>UF</th>
                            <th style={{width:'15%'}}>CRMVs</th>
                            <th style={{width:'20%'}}>Registrado em</th>
                        </tr>
                      </thead>
                      <tbody>
                          {(paginateListVet.list.length > 0 && paginateListVet.list != null)?
                              paginateListVet.list.map((vet,idx) =>
                            <tr key={idx}>
                              <td><input key={Number(vet.veterinarioID)} value={vet?.veterinarioID?Number(vet.veterinarioID):""} type={"checkbox"} /></td>
                              <td >
                                <LinkButton color={'dark'} size={'small'} onClick={() => showDetailVet(vet)}>
                                  {vet?.nome+" "+vet?.sobrenome}
                                </LinkButton>
                              </td>
                              <td >{vet?.cidade}</td>
                              <td >{vet?.uf}</td>
                              <td >{vet?.crmvs != null && vet?.crmvs?.length>0?vet?.crmvs[0].numero:""}</td>
                              <td>
                                <span>{moment(vet.dataRegistro).format('DD/MM/yyyy HH:mm')}</span>
                              </td>
                            </tr>
                          ):<tr><td colSpan={9} style={{textAlign:'center'}}><b>Sem resultado</b></td></tr>}
                      </tbody>
                  </table>
                </div>
              </div>
          }
        </div>
        <div id='form_detail_responsavel' className={showCadResp?"navbarSticky":"navbar"}>
          <FormDetailResponsavel responsavelDetail={respSelected} cancelFormClick={() => setShowCadResp(false)} editFormClick={(e, resp) => props.editResFormClick(e, resp)} />
        </div>
        <div id='form_detail_pet' className={showCadPet?"navbarSticky":"navbar"}>
          <FormDetailPet petDetail={petSelected} cancelFormClick={() => setShowCadPet(false)} editFormClick={(e, petR) => props.editPetFormClick(e, petR)}/>
        </div>
        <div id='form_detail_veterinario' className={showCadVet?"navbarSticky":"navbar"}>
          <FormDetailVeterinario veterinarioDetail={vetSelected} cancelFormClick={() => setShowCadVet(false)} editFormClick={(e,vet) => props.editVetFormClick(e, vet)}/>
        </div>
      </div>
  )
}