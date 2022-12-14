import { useLayoutEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
import { styled } from "@stitches/react";
import { MdCalendarToday, MdCake, MdAssessment } from "react-icons/md";
import './homeDash.css';

const Div = styled('div', {

})

export function HomeDash() {
    const [saudacao,setSaudacao] = useState('');

    useLayoutEffect(() => {
        moment.locale('pt-br');
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
                <span>{saudacao} {"Marcelo"}!</span>
            </Div>
            <Div id="eventos_proximos">
                <div id="eventos_proximos_title" className="module_title">
                    <MdCalendarToday size={22}/>
                    <span><b>Próximos Eventos</b></span>
                    <a href="#">ver agenda</a>
                </div>
                <div id="eventos_proximos_content">
                    <div className="evento_card">
                        <div>Assunto do evento</div>
                        <div>Cliente</div>
                        <div>Data e hora do evento</div>
                    </div>
                    <div className="evento_card">
                        <span>Consulta Clinica</span>
                        <span>Totó</span>
                        <span title={moment('2022-12-13 17:15').format('DD/MM/YYYY HH:mm')}>{moment('2022-12-13 17:15').fromNow()}</span>
                    </div>
                    <div className="evento_card">
                        <span>Consulta Clinica</span>
                        <span>Totó</span>
                        <span title={moment('2022-12-13 18:30').format('DD/MM/YYYY HH:mm')}>{moment('2022-12-13 17:30').fromNow()}</span>
                    </div>
                    <div className="evento_card">
                        <span>Consulta Clinica</span>
                        <span>Totó</span>
                        <span title={moment('2022-12-14 09:15').format('DD/MM/YYYY HH:mm')}>{moment('2022-12-14 09:15').fromNow()}</span>
                    </div>
                </div>
            </Div>
            <Div id="aniver_pets">
                <div id="aniver_pets_title" className="module_title">
                    <MdCake size={22} />
                    <span><b>Aniversariantes do mês (Pets)</b></span>
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
                <div className="module_title">
                    <MdAssessment size={22}/>
                    <span><b>Resumo</b></span>
                    <span>.</span>
                </div>
        
            </Div>
            <Div id="aniversariantes">
                <div className="module_title">
                    <MdCake size={22}/>
                    <span><b>Aniversariantes do mês (Responsáveis)</b></span>
                    <span>.</span>
                </div>
                
            </Div> 
        </>
    )
}