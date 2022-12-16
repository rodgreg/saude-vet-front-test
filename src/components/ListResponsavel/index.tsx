import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ApiRegistro } from '../../services/ApiRegistro';
import { Responsavel } from '../../interfaces/Responsavel';
import './listResponsavel.css';
import { FormDetailResponsavel } from '../FormDetailResponsavel';
import { Button, LinkButton, Option, Select } from '../HtmlComponents';
import moment from "moment/min/moment-with-locales";
import 'moment/locale/pt-br';
import { Veterinario } from '../../interfaces/Veterinario';
import { FormDetailVeterinario } from '../FormDetailVeterinario';
import { FormDetailPet } from '../FormDetailPet';
import { MdRefresh, MdSystemUpdate, MdUpdate } from 'react-icons/md';

interface listResponsavelProps {
  responsavel?: Responsavel;
  editFormClick:(event: React.MouseEvent<HTMLButtonElement>, responsavel:Responsavel) => void;
}

export function ListResponsavel (props:listResponsavelProps) {

  const api = ApiRegistro();
  const paginationRef = useRef<any>();
  const paginationPetRef = useRef<any>();
  const paginationVetRef = useRef<any>();
  const [listResponsaveis, setListResponsaveis] = useState<Responsavel[]>([]);
  const [listVeterinario, setListVeterinario] = useState<Veterinario[]>([]);
  const [respSelected, setRespSelected] = useState<Responsavel>({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, pets: [], enderecos: [], contatos: [],});
  const [petIndex, setPetIndex] = useState<number>(-1);
  const [vetSelected, setVetSelected] = useState<Veterinario>();
  const [paginateList, setPaginateList] = useState({list: listResponsaveis, perPage:10, page:0, pages:1});
  const [paginateListVet, setPaginateListVet] = useState({list: listVeterinario, perPage:10, page:0, pages:1});
  const [showCadResp, setShowCadResp] = useState<Boolean>(false);
  const [showCadPet, setShowCadPet] = useState<Boolean>(false);
  const [showCadVet, setShowCadVet] = useState<Boolean>(false);
  const [showList, SetShowList] = useState<String>('responsavel')

  const getListResponsaveis = async () => {
      var list:any = await api.listResponsaveis();
      if (list?.status >= 200 && list?.status <= 300){
          setListResponsaveis(list.data);
      }
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
    setListResponsaveis(listResponsavelTmp);

    let pages = 1;    
    if(paginateList.perPage < listResponsavelTmp.length) {
    pages = Math.ceil(listResponsavelTmp.length/paginateList.perPage);
    };
    let listPage = listResponsavelTmp.slice(0,paginateList.perPage);
    setPaginateList({...paginateList, pages: pages, list: listPage});
        
  };

  const getListVeterinarios = async () => {
    var list:any = await api.listVeterinarios();
      if (list?.status >= 200 && list?.status <= 300){
          setListVeterinario(list.data);
      }
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
    if(itensPerPage <= listResponsaveis.length) {
      pages = Math.ceil(listResponsaveis.length/itensPerPage);
    };
  
    if(paginationPetRef.current.state.selected > (pages-1)){
      paginationPetRef.current.state.selected = pages-1;
    } 
  
    let start = Math.floor(itensPerPage*paginateList.page);
    if(start > listResponsaveis.length) {
      start = 0;
    };
  
    let finish = Number(start)+Number(itensPerPage);
    if(finish > listResponsaveis.length) {
      finish = listResponsaveis.length;
    };
  
    if(paginationPetRef.current.state.selected === 0) {
      start = 0;
      finish = itensPerPage;
    }
  
    let petsPage = listResponsaveis.slice(start,finish);
    
    setPaginateList({...paginateList, perPage: itensPerPage, pages: pages, list: petsPage});
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

  const showDetailResp = (resp: Responsavel) => {
    setRespSelected(resp);
    setShowCadResp(true);
    setShowCadVet(false);
    setShowCadPet(false);
  };

  const showDetailPet = (resp: Responsavel, index:number) => {
    setRespSelected(resp);
    setPetIndex(index);
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
        <div >
          <div className='tab_list_conteiner' style={{display:'flex', flexDirection:'row', marginBottom:6}}>
            <div className={showList==='responsavel'?'tab_list_selected':'tab_list'}>
                <LinkButton color={'dark'} size={'small'} onClick={() => SetShowList('responsavel')}>Responsáveis</LinkButton>
            </div>
            <div className={showList==='pet'?'tab_list_selected':'tab_list'} >
                <LinkButton color={'dark'} size={'small'} onClick={() => SetShowList('pet')}>Pets</LinkButton>
            </div>
            <div className={showList==='veterinario'?'tab_list_selected':'tab_list'} >
                <LinkButton color={'dark'} size={'small'} onClick={() => {SetShowList('veterinario')}}>Veterinários</LinkButton>
            </div>
          </div>
          { showList==='responsavel' && 
              <div className='content_list'>
                <div id="controller_table">
                  <Select value={paginateList.perPage} onChange={setItensPerPage}>
                      <Option value={2}>2</Option>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                      <Option value={50}>50</Option>
                      <Option value={100}>100</Option>
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
                </div>
                <div id="responsavel_table">
                    <table>
                      <thead>
                        <tr>
                            <th style={{width:'10px'}}><input key={-1} value={-1} type={"checkbox"} onChange={selectAll} /></th>
                            <th style={{width:'50%'}}>Nome Completo</th>
                            <th style={{width:'30%'}}>Bairro</th>
                            <th style={{width:'20%'}}>Primeiro Contato</th>
                            <th style={{width:'10%'}}>Idade</th>
                            <th style={{width:'10%'}}>Qtd de Pets</th>
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
                  <Select value={paginateList.perPage} onChange={setItensPerPagePet}>
                      <Option value={2}>2</Option>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                      <Option value={50}>50</Option>
                      <Option value={100}>100</Option>
                  </Select>
                  <ReactPaginate
                          ref={paginationPetRef}
                          breakLabel={'...'}
                          previousLabel={'<<'}
                          nextLabel={'>>'}
                          pageCount={paginateList.pages}
                          onPageChange={handlePagePetClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                      />
                  <MdRefresh size={22} onClick={() => getListResponsaveis()} style={{cursor:'pointer'}} />
                </div>
                <div id="pet_table">
                    <table>
                      <thead>
                        <tr>
                            <th style={{width:'10px'}}><input key={-1} value={-1} type={"checkbox"} onChange={selectAll} /></th>
                            <th style={{width:'30%'}}>Nome</th>
                            <th style={{width:'15%'}}>Espécie</th>
                            <th style={{width:'15%'}}>Raça</th>
                            <th style={{width:'10%'}}>Fértil</th>
                            <th style={{width:'10%'}}>Pedigree</th>
                            <th style={{width:'20%'}}>Responsável</th>
                        </tr>
                      </thead>
                      <tbody>
                          {(paginateList.list.length > 0 && paginateList.list != null)?
                              paginateList.list.map((resp,idx) => resp.pets?.map((pet,idx) => 
                              <tr key={idx}>
                              <td><input key={Number(pet.petID)} value={pet.petID?Number(pet.petID):""} type={"checkbox"} /></td>
                              <td >
                                <LinkButton color={'dark'} size={'small'} onClick={() => showDetailPet(resp,idx)}>
                                  {pet?.nome}
                                </LinkButton>
                              </td>
                              <td >{pet?.especie}</td>
                              <td >{pet?.raca}</td>
                              <td >{pet?.fertil?"Sim":"Não"}</td>
                              <td >{pet?.pedigree?"Sim":"Não"}</td>
                              <td >{resp?.nome + " " + resp.sobrenome}</td>
                            </tr>

                              )
                          ):<tr><td colSpan={9} style={{textAlign:'center'}}><b>Sem resultado</b></td></tr>}
                      </tbody>
                  </table>
                </div>
              </div>
          }
          { showList==='veterinario' && 
              <div className='content_list'>
                <div id="controller_table">
                  <Select value={paginateListVet.perPage} onChange={setItensPerPageVet}>
                      <Option value={2}>2</Option>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                      <Option value={50}>50</Option>
                      <Option value={100}>100</Option>
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
                </div>
                <div id="responsavel_table">
                    <table>
                      <thead>
                        <tr>
                            <th style={{width:'10px'}}><input key={-1} value={-1} type={"checkbox"} onChange={selectAll} /></th>
                            <th style={{width:'40%'}}>Nome Completo</th>
                            <th style={{width:'20%'}}>Cidade</th>
                            <th style={{width:'20%'}}>UF</th>
                            <th style={{width:'20%'}}>CRMVs</th>
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
                            </tr>
                          ):<tr><td colSpan={9} style={{textAlign:'center'}}><b>Sem resultado</b></td></tr>}
                      </tbody>
                  </table>
                </div>
              </div>
          }
        </div>
          <div id='form_detail_responsavel' className={showCadResp?"navbarSticky":"navbar"}>
            <FormDetailResponsavel responsavelDetail={respSelected} cancelFormClick={() => setShowCadResp(false)} editFormClick={(e, resp) => props.editFormClick(e, resp)} />
          </div>
          <div id='form_detail_pet' className={showCadPet?"navbarSticky":"navbar"}>
            <FormDetailPet responsavelDetail={respSelected} petIndex={petIndex} cancelFormClick={() => setShowCadPet(false)} />
          </div>
          <div id='form_detail_veterinario' className={showCadVet?"navbarSticky":"navbar"}>
            <FormDetailVeterinario veterinarioDetail={vetSelected} cancelFormClick={() => setShowCadVet(false)}/>
          </div>
      </div>
  )
}

const listTeste:Responsavel[] = [
  {
    responsavelID:1,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Jurídica",
    tipoRegistro:"CNPJ",
    registroNum:"12343212000176",
    nascimento:new Date('1983-2-10'),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
        genero: "Masculino",
        nascimento:new Date("2020-1-1"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: true,
        anotacao: ""
      },
      {
        contatoID: 3,
        tipoContato: "Celular",
        descricao: "(61) 9 9999-9999", 
        principal: false,
        anotacao: ""
      },
    ]
  },
  {
    responsavelID:2,
    nome:"Maria Elisa",
    sobrenome:"V Gomes Gregorio",
    genero:"Feminino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"70413282104",
    nascimento:new Date("1986-9-22"),
    aceitaEmail:true,
    pets: [
      {
        petID:2,
        nome:"Mila",
        especie:"Cachorro",
        raca:"Labrador",
        cor:"Caramelo",
        genero: "Feminino",
        nascimento:new Date("2016-5-10"),
        pedigree:false,
        fertil:false,
    },
    {
      petID:3,
      nome:"Thor",
      especie:"Cachorro",
      raca:"Labrador",
      cor:"Caramelo",
      genero: "Masculino",
      nascimento:new Date("2016-5-10"),
      pedigree:false,
      fertil:false,
  }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:3,
    nome:"Maria Helena",
    sobrenome:"V G G Botelho",
    genero:"Feminino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678903",
    nascimento:new Date("2014-5-18"),
    aceitaEmail:true,
    pets: [
      {
        petID:4,
        nome:"Cherrie",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Malhado",
        genero: "Feminino",
        nascimento:new Date("2020-05-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:4,
    nome:"Maria Adélia",
    sobrenome:"Souza Vabo",
    genero:"Feminino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678905",
    nascimento:new Date("1957-07-07"),
    aceitaEmail:true,
    pets: [
      {
        petID:5,
        nome:"Marrie",
        especie:"Gato",
        raca:"Vira-lata",
        cor:"Bege",
        genero: "Feminino",
        nascimento:new Date("2020-09-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:5,
    nome:"José",
    sobrenome:"Maria",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678990",
    nascimento:new Date("1990-12-15"),
    aceitaEmail:true,
    pets: [
      {
        petID:6,
        nome:"Melado",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
        genero: "Masculino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    },
    {
      petID:7,
      nome:"Linda",
      especie:"Gato",
      raca:"Vira-lata",
      cor:"Preto",
      genero: "Feminino",
      nascimento:new Date("2020-01-01"),
      pedigree:false,
      fertil:false,
  },

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:6,
    nome:"Rodrigo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1987-05-04"),
    aceitaEmail:true,
    pets: [
      {
        petID:8,
        nome:"Padauâ",
        especie:"Gato",
        raca:"Vira-lata",
        cor:"Pardo",
        genero: "Masculino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:true,
      },
      {
        petID:9,
        nome:"Antonieta",
        especie:"Cachorro",
        raca:"Pintcher",
        cor:"Dourado e Preto",
        genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:true,
      }

    ],
    enderecos: [
      {
        enderecoID: 7,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 8,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:9,
    nome:"Pedro",
    sobrenome:"Gilberto",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678432",
    nascimento:new Date("1993-04-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:10,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:10,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 11,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:12,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:13,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:14,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:15,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:16,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:17,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:18,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:19,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:29,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
  {
    responsavelID:21,
    nome:"Marcelo",
    sobrenome:"G Botelho",
    genero:"Masculino",
    tipoPessoa:"Física",
    tipoRegistro:"CPF",
    registroNum:"12345678901",
    nascimento:new Date("1983-02-10"),
    aceitaEmail:true,
    pets: [
      {
        petID:1,
        nome:"Totó",
        especie:"Cachorro",
        raca:"Vira-lata",
        cor:"Pardo",
genero: "Feminino",
        nascimento:new Date("2020-01-01"),
        pedigree:false,
        fertil:false,
    }

    ],
    enderecos: [
      {
        enderecoID: 1,
        tipoEndereco: "Residencial",
        cep: "71.936-750",
        logradouro: "Lote",
        numero: "10",
        endereco: "Rua 3 Sul Lote 10",
        bairro: "Águas Claras",
        cidade: "Brasília",
        uf: "DF"
      }
    ],
    contatos: [
      {
        contatoID: 1,
        tipoContato: "E-mail",
        descricao: "marcunb@gmail.com", 
        principal: false,
        anotacao: ""
      }
    ]
  },
]

const listTesteVet:Veterinario[] = [
  {
    veterinarioID:1,
    nome:'Janice',
    sobrenome:'Maluf',
    genero:'Feminino',
    cpf:'09300300343',
    cidade:'Brasília',
    uf:'DF',
    crmvs: [
      {
        crmvID: 1,
        numero: '12343',
        uf: 'DF',
        area: 'Médicina Veterinária',
        dataRegistro: new Date(2014,3,21),
      },
    ]
  },
  {
    veterinarioID:2,
    nome:'Janice',
    sobrenome:'Maluf',
    genero:'Feminino',
    cpf:'09300300343',
    cidade:'Brasília',
    uf:'DF',
    crmvs: [
      {
        crmvID: 2,
        numero: '12343',
        uf: 'DF',
        area: 'Médicina Veterinária',
        dataRegistro: new Date(2014,3,21),
      },
    ]
  },
  {
    veterinarioID:3,
    nome:'Janice',
    sobrenome:'Maluf',
    genero:'Feminino',
    cpf:'09300300343',
    cidade:'Brasília',
    uf:'DF',
    crmvs: [
      {
        crmvID: 3,
        numero: '12343',
        uf: 'DF',
        area: 'Médicina Veterinária',
        dataRegistro: new Date(2014,3,21),
      },
    ]
  },
  {
    veterinarioID:4,
    nome:'Janice',
    sobrenome:'Maluf',
    genero:'Feminino',
    cpf:'09300300343',
    cidade:'Brasília',
    uf:'DF',
    crmvs: [
      {
        crmvID: 4,
        numero: '12343',
        uf: 'DF',
        area: 'Médicina Veterinária',
        dataRegistro: new Date(2014,3,21),
      },
    ]
  },
  {
    veterinarioID:5,
    nome:'Janice',
    sobrenome:'Maluf',
    genero:'Feminino',
    cpf:'09300300343',
    cidade:'Brasília',
    uf:'DF',
    crmvs: [
      {
        crmvID: 5,
        numero: '12343',
        uf: 'DF',
        area: 'Médicina Veterinária',
        dataRegistro: new Date(2014,3,21),
      },
      {
        crmvID: 6,
        numero: '12343',
        uf: 'MG',
        area: 'Médicina Veterinária',
        dataRegistro: new Date(2014,3,21),
      },
      {
        crmvID: 7,
        numero: '12343',
        uf: 'GO',
        area: 'Médicina Veterinária',
        dataRegistro: new Date(2014,3,21),
      },
    ]
  },
]