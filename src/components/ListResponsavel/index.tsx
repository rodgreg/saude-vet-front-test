import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ApiRegistro } from '../../services/ApiRegistro';
import { Responsavel } from '../../interfaces/Responsavel';
import './listResponsavel.css';
import { FormDetailResponsavel } from '../FormDetailResponsavel';
import { Button, LinkButton, Option, Select } from '../HtmlComponents';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/pt-br';

interface listResponsavelProps {
  responsavel?: Responsavel;
}

export function ListResponsavel (props:listResponsavelProps) {

  const api = ApiRegistro();
  const paginationRef = useRef<any>();
  const [listResponsaveis, setListResponsaveis] = useState<Responsavel[]>([]);
  const [respSelected, setRespSelected] = useState<Responsavel>();
  const [paginateList, setPaginateList] = useState({list: listResponsaveis, perPage:10, page:0, pages:1});
  const [showCadResp, setShowCadResp] = useState<Boolean>(false);
  const [showList, SetShowList] = useState<String>('responsavel')

  const getListResponsaveis = async () => {
      // var list:any = await api.listResponsaveis();
      // if (list?.status >= 200 && list?.status <= 300){
      //     setListResponsaveis(list.data);
      // }
      let listResponsavelTmp = listTeste;
      listResponsavelTmp = listResponsavelTmp.sort((a,b) => {
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
    setListResponsaveis(listResponsavelTmp);

    let pages = 1;
    paginationRef.current.state.selected = 0;
    if(paginateList.perPage < listResponsavelTmp.length) {
    pages = Math.ceil(listResponsavelTmp.length/paginateList.perPage);
    };
    let listPage = listResponsavelTmp.slice(0,paginateList.perPage);
    setPaginateList({...paginateList, pages: pages, list: listPage});
        
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

  const selectAll = () => {
    var aInputs = document.getElementsByTagName('input');
    for(let i=1; i< aInputs.length; i++) {
      aInputs[i].checked = aInputs[0].checked;
    }
  };

  const showDetail = (resp: Responsavel) => {
    setRespSelected(resp);
    setShowCadResp(true);
  }

  const deleteSelected = () => {
    var aInputs = document.getElementsByTagName('input');
    var deleteList:Responsavel[] = [];
    for(let i=1; i< aInputs.length; i++) {
      if(aInputs[i].checked) {
        var temp = paginateList.list.filter(resp => resp.responsavelID===Number(aInputs[i].value))
        deleteList = deleteList.concat(temp);
      }
    }
    console.log(deleteList);
  }

  useEffect(() => {
    moment.locale('pt-br');
    getListResponsaveis();
  },[]);

  return (
      <div>
        <div >
          <div className='tab_list_conteiner' style={{display:'flex', flexDirection:'row', marginBottom:6}}>
            <div className='tab_list' style={{backgroundColor:showList==='responsavel'?'#e4e9ce':'transparent'}} >
                <LinkButton color={'dark'} size={'small'} onClick={() => SetShowList('responsavel')}>Responsáveis</LinkButton>
            </div>
            <div className='tab_list' style={{backgroundColor:showList==='pet'?'#e4e9ce':'transparent'}} >
                <LinkButton color={'dark'} size={'small'} onClick={() => SetShowList('pet')}>Pets</LinkButton>
            </div>
            <div className='tab_list' style={{backgroundColor:showList==='veterinario'?'#e4e9ce':'transparent'}} >
                <LinkButton color={'dark'} size={'small'} onClick={() => SetShowList('veterinario')}>Veterinários</LinkButton>
            </div>
          </div>
          { showList==='responsavel' && 
              <div className='content_list'>
                <div id="controller_table">
                  <Select defaultValue={10} value={paginateList.perPage} onChange={setItensPerPage}>
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
                  <Button color={'light'} onClick={() => deleteSelected()}>Delete selected</Button> 
                </div>
                <div id="responsavel_table">
                    <table>
                      <thead>
                        <tr>
                            <th style={{width:'10px'}}><input key={-1} value={-1} type={"checkbox"} onChange={selectAll} /></th>
                            <th style={{width:'20%'}}>Nome Completo</th>
                            <th style={{width:'10%'}}>Sexo</th>
                            <th style={{width:'10%'}}>Tipo de Pessoa</th>
                            <th style={{width:'10%'}}>CPF/CNPJ</th>
                            <th style={{width:'15%'}}>Data de Nasc.</th>
                            <th style={{width:'5%'}}>Aceita E-mail</th>
                            <th style={{width:'10%'}}>Endereços</th>
                            <th style={{width:'10%'}}>Contatos</th>
                            <th style={{width:'10%'}}>Pets</th>
                        </tr>
                      </thead>
                      <tbody>
                          {(paginateList.list.length > 0 && paginateList.list != null)?
                              paginateList.list.map((resp,idx) =>
                            <tr key={idx}>
                              <td><input key={Number(resp.responsavelID)} value={resp?.responsavelID?Number(resp.responsavelID):""} type={"checkbox"} /></td>
                              <td >
                                <LinkButton color={'dark'} size={'small'} onClick={() => showDetail(resp)}>
                                  {resp?.nome+" "+resp?.sobrenome}
                                </LinkButton>
                              </td>
                              <td >{resp?.genero}</td>
                              <td >{resp?.tipoPessoa}</td>
                              <td >{resp?.registroNum}</td>
                              <td >{moment(resp?.nascimento).format("DD/MM/YYYY")+" ("+moment(resp?.nascimento).month(0).from(moment().month(0),true)+")"}</td>
                              <td >{resp?.aceitaEmail?"Sim":"Não"}</td>
                              <td >{resp?.enderecos != null && resp?.enderecos?.length>0?resp?.enderecos[0].bairro:""}</td>
                              <td >{resp?.contatos != null && resp?.contatos?.length>0?resp.contatos[0].descricao:""}</td>
                              <td >{resp?.pets != null && resp?.pets?.length>0?resp?.pets[0].nome +(resp?.pets?.length>1?" +"+(resp.pets.length-1):""):""}</td>
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
                  <Select defaultValue={10} value={paginateList.perPage} onChange={setItensPerPage}>
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
                  <Button color={'light'} onClick={() => deleteSelected()}>Delete selected</Button> 
                </div>
                <div id="pet_table">
                    <table>
                      <thead>
                        <tr>
                            <th style={{width:'10px'}}><input key={-1} value={-1} type={"checkbox"} onChange={selectAll} /></th>
                            <th style={{width:'20%'}}>Nome</th>
                            <th style={{width:'8%'}}>Sexo</th>
                            <th style={{width:'8%'}}>Espécie</th>
                            <th style={{width:'8%'}}>Raça</th>
                            <th style={{width:'10%'}}>Cor</th>
                            <th style={{width:'16%'}}>Data de Nasc.</th>
                            <th style={{width:'5%'}}>Fértil</th>
                            <th style={{width:'5%'}}>Pedigree</th>
                            <th style={{width:'20%'}}>Responsável</th>
                        </tr>
                      </thead>
                      <tbody>
                          {(paginateList.list.length > 0 && paginateList.list != null)?
                              paginateList.list.map((resp,idx) => resp.pets?.map((pet,idx) => 
                              <tr key={idx}>
                              <td><input key={Number(pet.petID)} value={pet.petID?Number(pet.petID):""} type={"checkbox"} /></td>
                              <td >
                                <LinkButton color={'dark'} size={'small'} onClick={() => showDetail(resp)}>
                                  {pet?.nome}
                                </LinkButton>
                              </td>
                              <td >{pet?.genero}</td>
                              <td >{pet?.especie}</td>
                              <td >{pet?.raca}</td>
                              <td >{pet?.cor}</td>
                              <td >{moment(pet?.nascimento).format("DD/MM/YYYY")+" ("+moment(pet?.nascimento).month(0).from(moment().month(0),true)+")"}</td>
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
        </div>
          <div id='form_cadastro_responsavel' className={showCadResp?"navbarSticky":"navbar"}>
            <FormDetailResponsavel responsavelDetail={respSelected} cancelFormClick={() => setShowCadResp(false)} />
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