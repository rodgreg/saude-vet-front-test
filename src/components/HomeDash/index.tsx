import { useLayoutEffect, useState } from "react";
import moment from "moment";
import { styled } from "@stitches/react";
import './homeDash.css';

const Div = styled('div', {

})

export function HomeDash() {
    const [saudacao,setSaudacao] = useState('');

    useLayoutEffect(() => {
        var currentHour = parseInt(moment(new Date()).format('HH'));
        if(currentHour >= 5 && currentHour <= 12) {
            setSaudacao("Bom dia");
        } else if (currentHour >= 13 && currentHour <= 18) {
            setSaudacao("Boa tarde");
        } else {
            setSaudacao("Boa noite");
        }
    },[]);

    return (
        <>
            <Div id="saudacao">
                <span>{saudacao} {"{nome do usuário}"}!</span>
            </Div>
            <Div id="eventos_proximos">
                <div id="eventos_proximos_title">
                    <span><b>Próximos Eventos:</b></span>
                    <a href="#">ver todos</a>
                </div>
                <div id="eventos_proximos_content">
                    <table>
                        <thead>
                            <tr>
                                <th style={{width:'20%'}}>Evento</th>
                                <th style={{width:'20%'}}>Pet</th>
                                <th style={{width:'40%'}}>Descricação</th>
                                <th style={{width:'20%'}}>Data e Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Consulta Clínica</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td>Totó estão do problema de visão</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            <tr>
                                <td>Vacinação</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td>Antirábica</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            <tr>
                                <td>Vacinação</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td>Antirábica</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            <tr>
                                <td>Vacinação</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td>Antirábica</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            <tr>
                                <td>Vacinação</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td>Antirábica</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            <tr>
                                <td>Vacinação</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td>Antirábica</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            <tr>
                                <td>Vacinação</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td>Antirábica</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            <tr>
                                <td>Vacinação</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td>Antirábica</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            <tr>
                                <td>Vacinação</td>
                                <td style={{textAlign:'center'}}>Totó</td>
                                <td title={"Vacinação prevista para todos os meses do ano, mesmo sem prescrição, por meio de campanha. Testando com mais palavras para verificar a quebra"} >Vacinação prevista para todos os meses do ano, mesmo sem prescrição, por meio de campanha</td>
                                <td style={{textAlign:'center'}}>13h45 29/11/2022</td>
                            </tr>
                            
                        </tbody>    
                    </table>
                </div>
            </Div>
            <Div id="aniver_pets">
                <div id="aniver_pets_title">
                    <span><b>Aniversariantes do mês (Pets):</b></span>&nbsp;
                    <span>Dezembro</span>
                </div>
                <div id="aniver_pets_content">
                    <table>
                        <thead>
                            <tr>
                                <th style={{width:'10%'}}>Dia</th>
                                <th style={{width:'90%'}}>Responsável</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{textAlign:'center'}}>01</td>
                                <td>Marcelo</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>03</td>
                                <td>Maria Elisa</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>03</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>04</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>10</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>11</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>13</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>19</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>22</td>
                                <td>Totó</td>
                            </tr>
                        </tbody>    
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th style={{width:'10%'}}>Dia</th>
                                <th style={{width:'90%'}}>Pets</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{textAlign:'center'}}>01</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>03</td>
                                <td>Nina</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>03</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>04</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>10</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>11</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>13</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>19</td>
                                <td>Totó</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center'}}>22</td>
                                <td>Totó</td>
                            </tr>
                        </tbody>    
                    </table>
                </div>
            </Div>
            <Div id="resumo">
                <span><b>Resumo:</b></span>
            </Div>
            <Div id="aniversariantes">
                <span><b>Aniversariantes do mês (Responsáveis):</b></span>
            </Div> 
        </>
    )
}