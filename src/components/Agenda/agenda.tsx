
import './agenda.css'
import moment from 'moment';
import { useState, useEffect } from 'react';
import 'moment/dist/locale/pt-br';


moment.locale('pt-br')

const now = new Date();
var eventosCadastrados:any = []
    
export function Agenda () {
    const [diasParaExibicao, setDiasParaExibicao] = useState(7)
    const [horaInicial, setHoraInicial] = useState<number>(5)
    const [horaFinal, setHoraFinal] = useState<number>(18)
    const [atualizarAgenda, setAtualizarAgenda] = useState<boolean>(false)
    const hoje = new Date(now.getFullYear(),now.getMonth(),now.getDate(),horaInicial,0)
    const [dataInicioDaAgenda, setDataInicioDaAgenda] = useState<Date>(hoje)
    const [arrayDatasDoMes, setArrayDatasDoMes] = useState<string[]>([''])

    //ComponentCtrl
    const [componenteCtrlHeight, setComponenteCtrlHeight] = useState<string>('100px')
    const [componenteCtrlWidth, setComponenteCtrlWidth] = useState<string>('100px')
    const [celulaStart, setCelulaStart] = useState<any>()
    const [celulaEnd, setCelulaEnd] = useState<any>()


    useEffect(() => {
        EncontraPrimeiroDiaDaAgenda();        
    }, [diasParaExibicao,atualizarAgenda])

    //está passando o state desatualizado do "hoje"
    function EncontraPrimeiroDiaDaAgenda () {
        switch (Number(diasParaExibicao)){
            case(1):
                console.log("1 dia");
                DefineTotalDeDiasDaAgenda();
                break;
            case(7):
            //Arrumar quando é domingo ele traz a semana seguinte. Pq domingo é o dia 0 da próxima semana
                console.log("7 dias");
                CadeASeguda();
                DefineTotalDeDiasDaAgenda();

                break;
            case(30):
                console.log("30 dias");
                setDataInicioDaAgenda(hoje);
                let primeiroDiaDoMes:Date | any = null;
                let primeiroDiaDoMes_moment = moment(hoje).startOf('month');
                primeiroDiaDoMes = new Date (moment(primeiroDiaDoMes_moment).format("YYYY,MM,DD"));
                setDataInicioDaAgenda(primeiroDiaDoMes);
                DefineTotalDeDiasDaAgenda();
                break;
        }
    }

    const CadeASeguda = () => {
        let diaDaSemanaAtual = moment(dataInicioDaAgenda).day();
        if (diaDaSemanaAtual != 0) {
            let primeiroDiaDaAgenda:any = moment(dataInicioDaAgenda).day(1);
            let novoPrimeiroDiaDaAgenda:Date | any = null;
                novoPrimeiroDiaDaAgenda = new Date (moment(primeiroDiaDaAgenda).format("YYYY,MM,DD"));
                setDataInicioDaAgenda(novoPrimeiroDiaDaAgenda);
        } else {
            let novoPrimeiroDiaDaAgenda:Date | any = moment(dataInicioDaAgenda).add(-6,"days");
                novoPrimeiroDiaDaAgenda = new Date (moment(novoPrimeiroDiaDaAgenda).format("YYYY,MM,DD"));
                setDataInicioDaAgenda(novoPrimeiroDiaDaAgenda);
        }
        
            
        
}
    function DefineTotalDeDiasDaAgenda() {
        //Dias e meses começam em 0. Adicionar menos 1 para facilitar
        let i = 0;
        let diasDaAgenda = []
        let inicioDaAgenda = dataInicioDaAgenda
        while (i < diasParaExibicao) {
            diasDaAgenda.push(moment(inicioDaAgenda).add(i,'day').format("MM/DD/YYYY")) //Datas em formato inglês
                i = i + 1
        }
        setArrayDatasDoMes(diasDaAgenda);
    }

    function CabecalhoDiasDaSemana () {
        let diasDaSemana = arrayDatasDoMes.map((dia) => {
            return (
                <th 
                id={moment(dia).format('ddd')}
                className='thAgenda'>{moment(dia).format('ddd')}
                </th>
            )
        })
        return(              
            diasDaSemana
        )
    }

    function CabecalhoDatasMes () {
        let headerTable = arrayDatasDoMes.map((dia) => {
            return (
                <th 
                id={moment(dia).format('DD/MM/YYYY')}
                className='thAgenda'>{moment(dia).format('DD/MM')}</th>
            )
        })
        return(              
            headerTable
        )
    }

    function LinhasHoras () {
        let DataHoraInicio = moment(moment(hoje).format(`MM/DD/YYYY ${horaInicial}:00`))
        let DataHoraTermino = moment(moment(hoje).format(`MM/DD/YYYY ${horaFinal}:00`))

        let relogio = DataHoraInicio
        let horasParaExibir = []
        
        //Variavel fonte para a coluna de horas
           while (relogio.hours() <= DataHoraTermino.hours()) {
                horasParaExibir.push(relogio)         
                relogio = moment(relogio).add(30,'minutes')    
           }
           
        //Cria as linhas
           let linhas:any = []
           let celulas:any = []
           
           //Percorre por cada hora e depois percorre por cada dia para criar as colunas
           horasParaExibir.forEach((hora) => {
                celulas = []
                    arrayDatasDoMes.forEach((data) => {
                        {celulas.push(
                                        <td 
                                            id={`${data} ${moment(hora).format("hh:mm")}`} 
                                            headers={`${data} ${moment(hora).format("hh:mm")}`} 
                                            className='tdAgenda'
                                        ></td>
                                    ) 
                    }})
                
                    linhas.push(
                        <tr>
                            <th className='thAgendaHoras'>{`${moment(hora).format("hh:mm")}`}</th>         
                            {celulas}
                        </tr>)
           })
        
            
        
           return (
                        <tbody>
                            {linhas.map((linha:any) => {
                                return (
                                        linha
                                )
                            })}
                        </tbody>           
                    
           )
    }

    function AtualizaAgenda () {
        atualizarAgenda ? setAtualizarAgenda(false) : setAtualizarAgenda(true)
    }

    function VoltarCalendario () {
            let novaDataInicial = new Date(moment(dataInicioDaAgenda).add(-diasParaExibicao,'day').format('MM/DD/YYYY'))
            setDataInicioDaAgenda(novaDataInicial)
            AtualizaAgenda()        
    }
    
    function AvancarCalendario () {
        let novaDataInicial = new Date(moment(dataInicioDaAgenda).add(+diasParaExibicao,'day').format('MM/DD/YYYY'))
        setDataInicioDaAgenda(novaDataInicial)
        AtualizaAgenda()        
}

    function HojeCalendario () {
        if( diasParaExibicao != 1) {
            EncontraPrimeiroDiaDaAgenda()
        } else {
            setDataInicioDaAgenda(hoje)
            AtualizaAgenda()
        }
    }

    const HandlerOnClickSetDays = (e:any) => {
        setDiasParaExibicao(e.target.value);
        AtualizaAgenda();
        
    }


    const ComponenteCtrl = () => {
        var componenteTop:number = 0;
        var componenteLeft:number = 0;
        var componenteHeight:number = 0;
        var componenteWidth:number = 0;
        var componenteCtrlOpacidade:number = 0;        

        //Encontra posicao da Agenda
        var agenda:HTMLElement | null = document.getElementById('Agenda');
        var agendaCoordenadas:DOMRect | undefined = agenda?.getBoundingClientRect();
        var agendaTop:Number | undefined = agendaCoordenadas?.top
        // var agendaRight:Number | undefined = agendaCoordenadas?.right
        // var agendaBottom:Number | undefined = agendaCoordenadas?.bottom
        var agendaLeft:Number | undefined = agendaCoordenadas?.left

        //mapear agendamentos e criar o objeto Html para cada uma
        var boxesEventos = eventosCadastrados.map((agendamento:any) => {
            
            //Encontra o posicionamento da celula de inicio para posicionamento do agendamento
            var celulaStartOfId = `${moment(agendamento.dataInicio).format("MM/DD/YYYY hh:mm")}`
                
                //Ajusta os minutos para coincidir com os ids das horas da Agenda
                var celulaStartOfMinutes = moment(celulaStartOfId).minutes()
                if(celulaStartOfMinutes >= 0 && celulaStartOfMinutes <= 29) {
                    celulaStartOfId = moment(celulaStartOfId).minutes(0).format("MM/DD/YYYY hh:mm")
                } else {
                    celulaStartOfId = moment(celulaStartOfId).minutes(30).format("MM/DD/YYYY hh:mm")
                }
        
            var celulaStartOf:HTMLElement | null = document.getElementById(celulaStartOfId);
            var celulaStartOfCoordenadas:DOMRect | undefined = celulaStartOf?.getBoundingClientRect();
            var celulaStartOfTop = celulaStartOfCoordenadas?.top
            // var celulaStartOfRight = celulaStartOfCoordenadas?.right
            // var celulaStartOfBottom = celulaStartOfCoordenadas?.bottom
            var celulaStartOfLeft = celulaStartOfCoordenadas?.left

            //Encontra posicao da celula de termino para dimensionamento de cada box de agendamento
            var celulaEndOfId = `${moment(agendamento.dataFim).format("MM/DD/YYYY hh:mm")}`

                //Ajusta os minutos para coincidir com os ids das horas da Agenda
                var celulaEndOfIdMinutes = moment(celulaEndOfId).minutes()

                if(celulaEndOfIdMinutes >= 0 && celulaEndOfIdMinutes <= 29) {
                    celulaEndOfId = moment(celulaEndOfId).minutes(0).format("MM/DD/YYYY hh:mm")
                } else {
                    celulaEndOfId = moment(celulaEndOfId).minutes(30).format("MM/DD/YYYY hh:mm")
                }

            var celulaEndOfHtml:HTMLElement | null = document.getElementById(celulaEndOfId);
            var celulaEndOfoordenadas:DOMRect | undefined = celulaEndOfHtml?.getBoundingClientRect();
            // var celulaEndOfTop:number | undefined = celulaEndOfoordenadas?.top
            var celulaEndOfRight:number | undefined = celulaEndOfoordenadas?.right
            // var celulaEndOfBottom:number | undefined = celulaEndOfoordenadas?.bottom
            // var celulaEndOfLeft:number | undefined = celulaEndOfoordenadas?.left

            var CorrecaoHeightTopTemp:number = (moment(agendamento.dataInicio).minutes()) //A celula tem altura de 48px. Cada minuta corresponde a 1,6px
            var CorrecaoHeightTop:number
            (CorrecaoHeightTopTemp >= 0 && CorrecaoHeightTopTemp <=29 ? CorrecaoHeightTop = CorrecaoHeightTopTemp*1.6  : CorrecaoHeightTop = (CorrecaoHeightTopTemp*1.6) - 48)
        
                if (celulaStartOfCoordenadas != undefined) {
                    //Exibe os boxes de agendamentos
                    componenteCtrlOpacidade = 0.8
                    //Posicionamento na celula inicial
                    componenteTop = Number(celulaStartOfTop) - Number(agendaTop) + CorrecaoHeightTop;
                    componenteLeft = Number(celulaStartOfLeft) - Number(agendaLeft);

                    //Dimensionamento
                    var dataAuxliarInicio = moment(moment(agendamento.dataFim).hour(moment(agendamento.dataInicio).hours()).minutes(moment(agendamento.dataInicio).minutes()));
                    componenteHeight = (moment(agendamento.dataFim).diff(dataAuxliarInicio.format("MM/DD/YYYY hh:mm"),'minutes'))*1.6; // considerando que cada linha tem 30px, a altura pode ser a diferença entre as datas em minutos
                    console.log(componenteHeight)
                    componenteWidth = Number(celulaEndOfRight) - Number(celulaStartOfLeft);
                    
                } else {
                    //Esconde os boxes de agendamentos
                    componenteCtrlOpacidade = 0
                }
            return (
                <div 
                    className='ComponenteCtrl' 
                    id={agendamento.id} 
                    style={{ 
                        resize:'both', 
                        opacity:componenteCtrlOpacidade, 
                        top:`${componenteTop}px`, 
                        left:`${componenteLeft}px`,
                        height:`${componenteHeight}px`, 
                        width:`${componenteWidth}px`
                    }}
                    onClick={(event) => HandlerOnResizeEvento(event, agendamento.id)}
                    ><h1 className='boxAgendamentoH1'>{agendamento.Tipo}</h1>
                    <div className='boxAgendamentoContainer'>
                        <div>
                            <button> Excluir</button>
                            <button> Editar</button>
                        </div>
                        <p className='boxAgendamentoP'>id: {agendamento.id}</p>  
                        <p className='boxAgendamentoP'>Resp.: {agendamento.responsavel}</p>  
                        <p className='boxAgendamentoP'>De: {moment(agendamento.dataInicio).format("DD/MM/YYYY hh:mm")}</p>  
                        <p className='boxAgendamentoP'>Até: {moment(agendamento.dataFim).format("DD/MM/YYYY hh:mm")}</p>  
                    </div>
                </div>
            )
        })
        //Encontra a posicao da Celula onde sera posicionado o componenteCtrl

        
        //Posiciona o componente controle

              
        

        return (

                    boxesEventos
        )
    }
    
  function HandlerOnResizeEvento(event:any,id:number) {
    var boxHtml:HTMLElement | null = document.getElementById(id.toString());
    var boxCoordenadas:DOMRect | undefined = boxHtml?.getBoundingClientRect();
        console.log(boxCoordenadas)
    //A partir daqui já tenho o tamnho do novo box e o seu Id. Então posso programar para editar o evento a partir do resize. 
    //Pensar em como facilitar para o usuario acertar o posicionamento dos minutos. 
    //Mostrar <p> com o horario em tempo real?
  }



    interface agendaAgendamentos  {
        id:number,
        dataInicio:Date,
        dataFim:Date,
        Tipo:string,
        responsavel:string,
        cor?:string 
    }

    function CarregarEventosBoxes () {
        var agendamento1:agendaAgendamentos = {
            id: 1,
            dataInicio: new Date('07/03/2023 05:35'), //mes/dia/ano hora:minuto
            dataFim: new Date('07/04/2023 06:45'),
            Tipo: 'Banho simples',
            responsavel: 'funcionário xyz',
            cor:"#9bb388"
        }
        var agendamento2:agendaAgendamentos = {
            id:2,
            dataInicio: new Date('07/05/2023 05:25'),
            dataFim:new Date('07/05/2023 09:51'),
            Tipo: 'Consulta',
            responsavel: 'med.vet. Rodrigo Gregorio',
            cor:"#8abee9"
        }
        var agendamento3:agendaAgendamentos =     {
            id:3,
            dataInicio: new Date('07/06/2023 10:12'),
            dataFim:new Date('07/06/2023 11:27'),
            Tipo: 'Consulta',
            responsavel: 'med.vet. Rodrigo Gregorio',
            cor:"#1f5a8a"
        }

        eventosCadastrados = [...eventosCadastrados,agendamento1] 
        eventosCadastrados = [...eventosCadastrados,agendamento2] 
        eventosCadastrados = [...eventosCadastrados,agendamento3] 
        var idParaRemover = 2
        // const listaFiltrada = lista.filter( agendamento => agendamento.id !== idParaRemover )


    }


    
    function HandlerOnClickCadastrarEvento (e) {
        e.preventDefault();
        const dadosCadastro = e.target;
        const dadosCadastroForm = new FormData(dadosCadastro);
        const dadosCadastroJson = Object.fromEntries(dadosCadastroForm.entries());

        var dataInicioString = dadosCadastroJson.eventoInicioName.toString()
        var dataInicioDate = moment(dataInicioString).format("MM/DD/YYYY hh:mm")
        var dataTerminoString = dadosCadastroJson.eventoTerminoName.toString()
        var dataTerminoDate = moment(dataTerminoString).format("MM/DD/YYYY hh:mm")

        var novoEvento:agendaAgendamentos = {
            id:Number(dadosCadastroJson.idEvento),
            dataInicio:new Date(dataInicioDate),
            dataFim:new Date(dataTerminoDate),
            Tipo:dadosCadastroJson.tipoEvento.toString(),
            responsavel:dadosCadastroJson.responsavelEvento.toString(),
            cor:dadosCadastroJson.corEvento.toString(),
        }

        eventosCadastrados = [...eventosCadastrados,novoEvento] 
    }

    function CadastroDeEvento () {
        return(
            <div>
                <form method="" onSubmit={HandlerOnClickCadastrarEvento} id="NovoCadastroDeEvento">
                    <label>Id:
                    <input type='number' id="idEvento" name='idEvento' /> </label>
                  
                    <label>Início:
                    <input type='datetime-local' id="eventoInicio" name='eventoInicioName' /> </label>
                    
                    <label>Término:
                    <input type='datetime-local' id="eventoTermino" name='eventoTerminoName' /> </label>
                    
                    <label>Tipo:
                    <input type='text' id="tipoEvento" name='tipoEvento' /> </label>
                  
                    <label>responsavel:
                    <input type='text' id="responsavelEvento" name='responsavelEvento' /> </label>
                    
                    <label>cor:
                    <input type='text' id="corEvento" name='corEvento' /> </label>

                    <button className='Agenda-button' type="submit" >Cadastrar</button>
                </form>
            </div>
        )
    }
    
    const heightOutput = document.querySelector("#height");
    const widthOutput = document.querySelector("#width");
    
    function reportWindowSize() {
      heightOutput.textContent = window.innerHeight;
      widthOutput.textContent = window.innerWidth;
    }
    
    window.onresize = reportWindowSize;

    return (
        <div>
            <div className="control-buttons">
                <button  className="button-control" value="Consolidar"     > Consolidar </button>
                <button  className="button-control" value="Ampliar"        > Ampliar </button>
                <button  className="button-control" value="AdicionarEvento"> Adicionar evento </button>
                <button  className="button-control" value="30"           onClick={(e) => {HandlerOnClickSetDays(e);AtualizaAgenda();}
            } >{moment.duration(30, "days").humanize()}  </button>
                <button  className="button-control" value="7"            onClick={(e) => {HandlerOnClickSetDays(e)}} >{moment.duration(7, "days").humanize()}  </button>
                <button  className="button-control" value="1"            onClick={(e) => {HandlerOnClickSetDays(e)}} >{moment.duration(1, "day").humanize()} </button>
                <button  className="button-control" value="1"            onClick={AtualizaAgenda}>AtualizaAgenda</button>
                <button  className="button-control" value="1"            onClick={CarregarEventosBoxes}>Carregar Eventos</button>
                <button  className="button-control" value="1"            onClick={() => console.log('TESTE3')}>TESTE3 </button>
                <button  className="button-control" value="1"            onClick={() => console.log('TESTE4')}>TESTE4 </button>

            </div>
            
            <p>Agenda</p>

            <div className='Agenda-button-container'>
                <button className='Agenda-button' onClick={VoltarCalendario}>Voltar calendário</button>
                
                <button className='Agenda-button' onClick={HojeCalendario}>Hoje</button>

                <button className='Agenda-button' onClick={AvancarCalendario}>Avançar calendário</button>
            </div>
            <CadastroDeEvento></CadastroDeEvento>
            <div className='ComponentePai'>
                <ComponenteCtrl/>
                <table className='Agenda' id='Agenda'>
                    <thead>
                        <tr>
                            <th className='thAgenda'>{'>-<'}</th>
                            <CabecalhoDiasDaSemana/>                            
                        </tr>
                        <tr>
                            <th className='thAgenda'>{'>-<'}</th>
                            <CabecalhoDatasMes/>
                        </tr>
                    </thead>
                            <LinhasHoras/>
                </table>
                
            </div>
        </div>
    )
}

