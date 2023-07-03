

const PosicaoDosElementos = () => {

    var celulaIdInicio = dataInicio

    //Encontra posicao da Agenda
    var agenda:HTMLElement | null = document.getElementById('Agenda');
    var agendaCoordenadas:DOMRect | undefined = agenda?.getBoundingClientRect();
    var agendaTop:Number | undefined = agendaCoordenadas?.top
    var agendaRight:Number | undefined = agendaCoordenadas?.right
    var agendaBottom:Number | undefined = agendaCoordenadas?.bottom
    var agendaLeft:Number | undefined = agendaCoordenadas?.left
    
    //Encontra a posicao da Celula clicada
    var celulaClicada:HTMLElement | null = document.getElementById(celulaIdInicio)
    var celulaClicadaCoordenadas:DOMRect | undefined = celulaClicada?.getBoundingClientRect();
    var celulaClicadaTop = celulaClicadaCoordenadas?.top
    var celulaClicadaRight = celulaClicadaCoordenadas?.right
    var celulaClicadaBottom = celulaClicadaCoordenadas?.bottom
    var celulaClicadaLeft = celulaClicadaCoordenadas?.left

    //Posiciona o componente controle
    var componenteTop = celulaClicadaBottom - agendaTop - 5
    var componenteLeft = celulaClicadaLeft - agendaLeft
    setComponenteCtrlTop(componenteTop)
    setComponenteCtrlLeft(componenteLeft)       
    //07/01/2023 05:00

    //Ajusta o tamanho do componente controle
        //Encontra posicao da Data de Inicio
        var dataInicioHtml:HTMLElement | null = document.getElementById(dataInicio);
        var dataInicioCoordenadas:DOMRect | undefined = dataInicioHtml?.getBoundingClientRect();
        var dataInicioTop:Number | undefined = dataInicioCoordenadas?.top
        var dataInicioRight:Number | undefined = dataInicioCoordenadas?.right
        var dataInicioBottom:Number | undefined = dataInicioCoordenadas?.bottom
        var dataInicioLeft:Number | undefined = dataInicioCoordenadas?.left

        //Encontra posicao da Data de termino
        var dataFimHtml:HTMLElement | null = document.getElementById(dataFim);
        var dataFimCoordenadas:DOMRect | undefined = dataFimHtml?.getBoundingClientRect();
        var dataFimTop:Number | undefined = dataFimCoordenadas?.top
        var dataFimRight:Number | undefined = dataFimCoordenadas?.right
        var dataFimBottom:Number | undefined = dataFimCoordenadas?.bottom
        var dataFimLeft:Number | undefined = dataFimCoordenadas?.left
    
    var componenteHeight = dataFimBottom - dataInicioTop
    var componenteWidth = dataFimRight - dataInicioLeft
    console.log(componenteHeight)
    setComponenteCtrlHeight(`${componenteHeight}px`)
    setComponenteCtrlWidth(`${componenteWidth}px`)

    return (
        <div>
        <div className='ComponenteCtrl' id='componenteCtrl' style={{ top:componenteCtrlTop, left:componenteCtrlLeft, width:componenteCtrlWidth, height:componenteCtrlHeight}}>
        <p>TEXTO</p>
        </div>

        <div>
        <label><strong>Data início: </strong> 
        <input 
            type="text" 
            id="DataInicio" 
            onChange={evento => {
                                const textoDigitado = evento.target.value
                                setDataInicio(textoDigitado)
                                }}
        ></input></label>
        <label><strong>Data Fim: </strong>
        <input 
            type="text" 
            id="DataFim" 
            onChange={evento => {
                                const textoDigitado = evento.target.value
                                setDataFim(textoDigitado)
                                }}
        ></input></label>
        <button className='CadastrarEvento' onClick={PosicaoDosElementos}><strong>Cadastrar</strong></button>
    </div>
    </div>
    )