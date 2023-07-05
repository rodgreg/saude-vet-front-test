
import './agenda.css'
import moment from 'moment';
import { useState, useEffect, ReactElement, useRef } from 'react';
import 'moment/dist/locale/pt-br';





const now = new Date();
var eventosCadastrados:any = []

    
export function Agenda () {
    const [diasParaExibicao, setDiasParaExibicao] = useState(7);
    const [horaInicial, setHoraInicial] = useState<number>(5);
    const [horaFinal, setHoraFinal] = useState<number>(18);
    const [atualizarAgenda, setAtualizarAgenda] = useState<boolean>(false);
    const hoje = new Date(now.getFullYear(),now.getMonth(),now.getDate(),horaInicial,0);
    const [dataInicioDaAgenda, setDataInicioDaAgenda] = useState<Date>(hoje);
    const [arrayDatasDoMes, setArrayDatasDoMes] = useState<string[]>(['']);
    const [lineHeight, setLineHeight] = useState<number>(60);
    const intervaloDasLinhasMinutos = 30;
    var fatorCorrecaoPixelMinuto = lineHeight/intervaloDasLinhasMinutos;
    var widthDefault = 'calc(var(100/8))'


    //ComponentCtrl
    const [agendamentosArray,setAgendamentosArray] = useState<string[]>([])

    const mouseXStart = useRef<number | undefined>();
    const mouseYStart = useRef<number | undefined>();
    const mouseXEnd = useRef<number | undefined>();
    const mouseYEnd = useRef<number | undefined>();
    const boxMovimentadoX = useRef<number | undefined>();
    const boxMovimentadoY = useRef<number | undefined>();


    useEffect(() => {
        EncontraPrimeiroDiaDaAgenda();       
        moment().locale('pt_br');
        CarregarEventosBoxes();
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
                relogio = moment(relogio).add(intervaloDasLinhasMinutos,'minutes')    
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
                                            style={{
                                                height:`${lineHeight}px`,
                                                width:`${widthDefault}`}}
                                            id={`${data} ${moment(hora).format("HH:mm")}`} 
                                            headers={`${data} ${moment(hora).format("HH:mm")}`} 
                                            className='tdAgenda'
                                            onDrop={(e) => HandleOnDrop(e,`${data} ${moment(hora).format("HH:mm")}`)}
                                            onDragOver={(e) => HandleOnDragOver(e)}
                                        ></td>
                                    ) 
                    }})
                
                    




                    linhas.push(
                        <tr>
                            <th 
                            className='thAgendaHoras'
                            style={{height:`${lineHeight}px`}}
                            >{`${moment(hora).format("HH:mm")}`}</th>         
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
        var agendaLeft:Number | undefined = agendaCoordenadas?.left

        //mapear agendamentos e criar o objeto Html para cada uma
        var boxesEventos = eventosCadastrados.map((agendamento:any) => {
            
            //Encontra o posicionamento da celula de inicio para posicionamento do agendamento
            var celulaStartOfId = `${moment(agendamento.dataInicio).format("MM/DD/YYYY HH:mm")}`
                
            //Ajusta os minutos para coincidir com os ids das horas da Agenda
            var celulaStartOfMinutes = moment(celulaStartOfId).minutes()
            if(celulaStartOfMinutes >= 0 && celulaStartOfMinutes <= 29) {
                celulaStartOfId = moment(celulaStartOfId).minutes(0).format("MM/DD/YYYY HH:mm")
            } else {
                celulaStartOfId = moment(celulaStartOfId).minutes(30).format("MM/DD/YYYY HH:mm")
            }
        
            var celulaStartOf:HTMLElement | null = document.getElementById(celulaStartOfId);
            var celulaStartOfCoordenadas:DOMRect | undefined = celulaStartOf?.getBoundingClientRect();
            var celulaStartOfTop = celulaStartOfCoordenadas?.top
            var celulaStartOfLeft = celulaStartOfCoordenadas?.left

            //Encontra posicao da celula de termino para dimensionamento de cada box de agendamento
            var celulaEndOfId = `${moment(agendamento.dataFim).format("MM/DD/YYYY HH:mm")}`

            //Ajusta os minutos para coincidir com os ids das horas da Agenda
            var celulaEndOfIdMinutes = moment(celulaEndOfId).minutes()
            if(celulaEndOfIdMinutes >= 0 && celulaEndOfIdMinutes <= 29) {
                celulaEndOfId = moment(celulaEndOfId).minutes(0).format("MM/DD/YYYY HH:mm")
            } else {
                celulaEndOfId = moment(celulaEndOfId).minutes(30).format("MM/DD/YYYY HH:mm")
            }

            var celulaEndOfHtml:HTMLElement | null = document.getElementById(celulaEndOfId);
            var celulaEndOfoordenadas:DOMRect | undefined = celulaEndOfHtml?.getBoundingClientRect();
            // var celulaEndOfTop:number | undefined = celulaEndOfoordenadas?.top
            var celulaEndOfRight:number | undefined = celulaEndOfoordenadas?.right
            // var celulaEndOfBottom:number | undefined = celulaEndOfoordenadas?.bottom
            // var celulaEndOfLeft:number | undefined = celulaEndOfoordenadas?.left

            var CorrecaoHeightTopTemp:number = (moment(agendamento.dataInicio).minutes()) //A celula tem altura de 48px. Cada minuta corresponde a 1,6px
            var CorrecaoHeightTop:number
            (CorrecaoHeightTopTemp >= 0 && CorrecaoHeightTopTemp <=29 ? CorrecaoHeightTop = CorrecaoHeightTopTemp*fatorCorrecaoPixelMinuto  : CorrecaoHeightTop = (CorrecaoHeightTopTemp*fatorCorrecaoPixelMinuto) - lineHeight)
        
                if (celulaStartOfCoordenadas != undefined) {
                    //Exibe os boxes de agendamentos
                    componenteCtrlOpacidade = 0.8
                    //Posicionamento na celula inicial
                    componenteTop = Number(celulaStartOfTop) - Number(agendaTop) + CorrecaoHeightTop;
                    componenteLeft = Number(celulaStartOfLeft) - Number(agendaLeft);

                    //Dimensionamento
                    var dataAuxliarInicio = moment(moment(agendamento.dataFim).hour(moment(agendamento.dataInicio).hours()).minutes(moment(agendamento.dataInicio).minutes()));
                    componenteHeight = (moment(agendamento.dataFim).diff(dataAuxliarInicio.format("MM/DD/YYYY HH:mm"),'minutes'))*fatorCorrecaoPixelMinuto; // considerando que cada linha tem 30px, a altura pode ser a diferença entre as datas em minutos
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
                    draggable
                    onDragStart={(e) => handlerOnDrag(e, agendamento)}
                    ><h1 className='boxAgendamentoH1'>{agendamento.Tipo}</h1>
                    <div className='boxAgendamentoContainer'>
                        <div>
                            <button onClick={() => HandlerOnClickExcluirEvento(agendamento.id)}> Excluir</button>
                            <button onClick={(event) => HandlerOnClickEditarEvento(event, agendamento.id)}> Editar</button>
                        </div>
                        <p className='boxAgendamentoP'>id: {agendamento.id}</p>  
                        <p className='boxAgendamentoP'>Resp.: {agendamento.responsavel}</p>  
                        <p className='boxAgendamentoP'>De: {moment(agendamento.dataInicio).format("DD/MM/YYYY HH:mm")}</p>  
                        <p className='boxAgendamentoP'>Até: {moment(agendamento.dataFim).format("DD/MM/YYYY HH:mm")}</p>  
                    </div>
                </div>
            )
        })
        return (
                    boxesEventos
        )
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
        
        if ( eventosCadastrados.length === 0 ) {
            var agendamento1:agendaAgendamentos = {
                id: 1,
                dataInicio: new Date('07/04/2023 05:35'), //mes/dia/ano hora:minuto
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
            var agendamento4:agendaAgendamentos = {
                id: 4,
                dataInicio: new Date('07/06/2023 06:00'), //mes/dia/ano hora:minuto
                dataFim: new Date('07/07/2023 07:00'),
                Tipo: 'Banho simples',
                responsavel: 'funcionário xyz',
                cor:"#9bb388"
            }

            eventosCadastrados = [...eventosCadastrados,agendamento1,agendamento2,agendamento3,agendamento4] 
        
            

    } else {
        console.log("Boxes já foram carregados")
    }


    }
    
    function HandlerOnClickCadastrarEvento (e:any) {
        e.preventDefault();
        const dadosCadastro = e.target;
        const dadosCadastroForm = new FormData(dadosCadastro);
        const dadosCadastroJson = Object.fromEntries(dadosCadastroForm.entries());

        var dataInicioString = dadosCadastroJson.eventoInicioName.toString()
        var dataInicioDate = moment(dataInicioString).format("MM/DD/YYYY HH:mm")
        var dataTerminoString = dadosCadastroJson.eventoTerminoName.toString()
        var dataTerminoDate = moment(dataTerminoString).format("MM/DD/YYYY HH:mm")

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

    function handlerOnDrag(e: React.DragEvent,agendamento:any) {
        //Captura a posicao inicial do mouse
        mouseXStart.current =  e.clientX;
        mouseYStart.current =  e.clientY;

        //Cria o txt no formato json
        var texto = `{
                        "id":${agendamento.id},
                        "dataInicio": "${agendamento.dataInicio}",
                        "dataFim": "${agendamento.dataFim}",
                        "Tipo": "${agendamento.Tipo}",
                        "responsavel": "${agendamento.responsavel}",
                        "cor": "${agendamento.cor}"
                    }`
        e.dataTransfer.setData("agendamento",texto) 
    }
        
    //Achar um jeito de mostrar a data e hora de destino e de deixar o usuário corrigir os minutos apos o drop 
    //Apos acertar essa parte, tem que refinar os minutos que são salvos na atualização do agendamento. Na funcao HandleOnDrop
    function HandleOnDragOver(e: React.DragEvent){
        e.preventDefault();

    }

    function HandleOnDrop(e: React.DragEvent,idDaLinha:string) {
        //Captura a posicao final do mouse
        mouseXEnd.current =  e.clientX;
        mouseYEnd.current =  e.clientY;

        //Captura os dados do Box que esta sendo movido
        const agendamentoMovido = e.dataTransfer.getData('agendamento');
        let agendamentoMovidoJson = JSON.parse(agendamentoMovido)
        let boxParaEditarId:number = Number(agendamentoMovidoJson.id)
        setAgendamentosArray([...agendamentosArray,agendamentoMovidoJson.id])

        //Encontra a posicao da celula que sera feito o drop
        var widthDaCelula:number
        var celulaDrop:HTMLElement | null = document.getElementById(idDaLinha); //Celula que esta abaixo do ponteiro do mouse
        var celulaDropCoordenadas:DOMRect | undefined = celulaDrop?.getBoundingClientRect();
        let celulaDropLeft = celulaDropCoordenadas?.left
        let celulaDropRight = celulaDropCoordenadas?.right        

        //Percorre o eventos Cadastrados para encontrar o index do evento que precisa ser editado
       var index:number | undefined = undefined
            eventosCadastrados.forEach((agendamento:any) => {
                if (boxParaEditarId === agendamento.id) {
                    index = eventosCadastrados.indexOf(agendamento)
                }})
           
        let dataInicioCadastrada = eventosCadastrados[index].dataInicio;
        let dataFimCadastrada = eventosCadastrados[index].dataFim;
        let diferencaEntreDatasCadastradas = moment(dataFimCadastrada).diff(dataInicioCadastrada,'days')
        let novaDataInicio:Date =  new Date(idDaLinha); //Esse id corresponde ao id (data hora) da celula que esta abaixo do box movido

        //Identifica a distancia que o mouse percorreu em minutos - Eixo Y
        let distMouseY:number = Number(mouseYEnd.current) - Number(mouseYStart.current) //ditancia que o mouse percorreu no eixo Y
        let distMouseYAbs:number = Math.abs(distMouseY) //converte para modulo para ignorar o sinal negativo, caso exista
        let distMouseLinhas:number = (distMouseYAbs / lineHeight) //dividir o quanto o mouse foi mexido pela altura da linha retorna a quantidade de linhas percorridas, incluindo a parte decimal
        let distMouseHoras:number = distMouseLinhas / 2 //Cada hora tem duas linhas. Essa divisao retorna a quantidade percorrida em horas                
        let distMouseMinutos:number = distMouseHoras * 60 //Para converter horas em minutos
        let direcaoDoMouseY = Math.sign(distMouseY) //-1 = para cima e 1 igual para baixo
        let deslocEmMinutos = distMouseMinutos * direcaoDoMouseY
        

        // //Identifica a distancia que o mouse percorreu em dias - Eixo X
        // let celulaMouseRight:number = Number(celulaMouseCoordenadas?.right)
        // let celulaMouseX:number = Number(celulaMouseCoordenadas?.x) // X e Left são iguais
        // let celulaMouseY:number = Number(celulaMouseCoordenadas?.y)

        // widthDaCelula = Number(celulaDropRight) - Number(celulaDropLeft)
        // let distMouseX:number = Number(mouseXEnd.current) - Number(mouseXStart.current)
        // let distMouseXAbs:number = Math.abs(distMouseX)
        // let distMouseXColunas:number = Math.round((distMouseXAbs / widthDaCelula))
        // console.log('distMouseX',distMouseX,
        // 'distMouseXColunas',distMouseXColunas)

        // let idData = idDaLinha.split('/'); //Precisa arrumar porque com o id da linha pode dar muito errado. Precisa usar o deslocamento horizontal do mouse
        // let novoMesIndexFim = Number(idData[0])-1;
        // let novoDiaFim:number = Number(idData[1]);
        // let idAnoHora = idData[2].split(' ');
        // let novoAnoFim:number = Number(idAnoHora[0]);

        // let novaHoraMin = novaHoraInicio.split(':');
        // let novaHoraFim:number = Number(novaHoraMin[0]);
        // let novoMinFim:number = Number(novaHoraMin[1]);
        
        //Define a nova hora para o box de evento movimentado
        let novaHoraInicioString = moment(dataInicioCadastrada).add(deslocEmMinutos,'minutes').format('HH:mm')
        let novaHoraInicioNumber = Number(novaHoraInicioString.substring(0,2))

            if (novaHoraInicioNumber < horaInicial) {
                novaHoraInicioString = `${moment(dataInicioCadastrada).hour(horaInicial).minute(0).format('HH:mm')}`
            } else if (novaHoraInicioNumber > horaFinal) {
                novaHoraInicioString = `${moment(dataInicioCadastrada).hour(horaFinal).minute(59).format('HH:mm')}`
            }

        //Define a data completa referente a nova posicao do box de evento movimentado
        //Precisa arrumar porque com o id da linha pode dar muito errado. Precisa usar o deslocamento horizontal do mouse
        
        let idData = idDaLinha.split('/'); 
        let novoMesIndexInicio = Number(idData[0])-1;
        let novoDiaInicio:number = Number(idData[1]);

        //Ano, Hora e Minuto
        let idAnoHora = idData[2].split(' ');
        let novoAnoInicio:number = Number(idAnoHora[0]);

        //Hora e Minuto
        let novaHoraMinArray = novaHoraInicioString.split(':');
        let novaHoraInicio:number = Number(novaHoraMinArray[0]);
        let novoMinInicio:number = Number(novaHoraMinArray[1]);

        novaDataInicio = new Date (novoAnoInicio,novoMesIndexInicio,novoDiaInicio,novaHoraInicio,novoMinInicio)
        
        //Define a nova data de fim do evento
        let boxHtml:HTMLElement | null = document.getElementById(boxParaEditarId.toString());
        let boxHeightPx:number = Number(boxHtml?.getBoundingClientRect().height); 
        let boxHeightMinutos:number = boxHeightPx / (fatorCorrecaoPixelMinuto) //Altura da linha / Intervalo de minutos = quantos px equivalem a 1 minuto
    
        let novaDataFimId = novaDataInicio;
        let novaDataFimDia = moment(novaDataFimId).add(diferencaEntreDatasCadastradas,'days');
        let novaDataFimMoment = moment(novaDataFimDia).add(boxHeightMinutos,'minutes').format('MM/DD/YYYY HH:mm');
        let novaDataAno:number = Number(moment(novaDataFimMoment).year())
        let novaDataMesIndex:number = moment(novaDataFimMoment).month()
        let novaDataDia:number = Number(moment(novaDataFimMoment).date())
        let novaDataHora:number = moment(novaDataFimMoment).hours()
        let novaDataMinuto:number = moment(novaDataFimMoment).minute()
        let novaDataFim:Date = new Date (novaDataAno,novaDataMesIndex,novaDataDia,novaDataHora,novaDataMinuto)

        let agendamentoAtualizado:agendaAgendamentos = {
            id:boxParaEditarId,
            dataInicio: novaDataInicio,
            dataFim:novaDataFim,
            Tipo: eventosCadastrados[index].Tipo,
            responsavel: eventosCadastrados[index].responsavel,
            cor:eventosCadastrados[index].cor
        }

        eventosCadastrados[index] = agendamentoAtualizado 
    }

    function HandlerMouseDown (e) {
        console.log("mouse Down")
    }
   
    function HandlerMouseUp (e) {
        console.log("mouse Up")
    }
    

    function teste () {
        var alturaDragDoMouse = Number(mouseYStart.current) - Number(mouseYEnd.current)
        console.log('xStart',mouseXStart.current ,'yStart',mouseYStart.current,'xEnd',mouseXEnd.current,'yEnd',mouseYEnd.current)
        
        console.log(alturaDragDoMouse)
    }

    function HandlerOnClickExcluirEvento(id:number) {
        let boxParaExcluir:number = id
        if (window.confirm('deseja remover?')) {
            eventosCadastrados = eventosCadastrados.filter((agendamento:any) => agendamento.id !== boxParaExcluir )
        } else {
            console.log('O evento foi mantido')
        }
    }

    function HandlerOnClickEditarEvento(event:any, id:number) {
    let eventoIndex:number
    let boxParaEditarId:number = id
    let boxParaEditarIndex:any
    var index:number | undefined = undefined

    eventosCadastrados.forEach((agendamento:any) => {
        if (boxParaEditarId === agendamento.id) {
            index = eventosCadastrados.indexOf(agendamento)
        }})

        console.log(index)
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
    
    function ZoomIn () {
        let add = 15
        setLineHeight(state => state +  add)
        AtualizaAgenda()
    }

    function ZoomDefault () {
        setLineHeight(48)
        AtualizaAgenda()
 
    }

    document.addEventListener('mousemove',mousemove)

    function mousemove (e) {
       var par =  document.getElementById('mouse') 
       par.innerText = `x:${e.clientX} y: ${e.clientY}`
       
    }
    return (
        <div>
            <div className="control-buttons">
                <button  className="button-control" value="Consolidar"    onClick={ZoomDefault} > Consolidar </button>
                <button  className="button-control" value="Ampliar"       onClick={ZoomIn} > Ampliar </button>
                <button  className="button-control" value="AdicionarEvento"> Adicionar evento </button>
                <button  className="button-control" value="30"           onClick={(e) => {HandlerOnClickSetDays(e);AtualizaAgenda();}
            } >{moment.duration(30, "days").humanize()}  </button>
                <button  className="button-control" value="7"            onClick={(e) => {HandlerOnClickSetDays(e)}} >{moment.duration(7, "days").humanize()}  </button>
                <button  className="button-control" value="1"            onClick={(e) => {HandlerOnClickSetDays(e)}} >{moment.duration(1, "day").humanize()} </button>
                <button  className="button-control" value="1"            onClick={AtualizaAgenda}>AtualizaAgenda</button>
                <button  className="button-control" value="1"            onClick={CarregarEventosBoxes}>Carregar Eventos</button>
                <button  className="button-control" value="1"            onClick={teste}>pointer </button>
                <button  className="button-control" value="1"            onClick={() => console.log('TESTE4')}>TESTE4 </button>

            </div>
    
            <p>Agenda</p>

            <div className='Agenda-button-container'>
                <button className='Agenda-button' onClick={VoltarCalendario}>Voltar calendário</button>
                
                <button className='Agenda-button' onClick={HojeCalendario}>Hoje</button>

                <button className='Agenda-button' onClick={AvancarCalendario}>Avançar calendário</button>
            </div>
            <CadastroDeEvento/>
            <p id="mouse"></p>
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

