import { useEffect, useState } from "react";
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { styled } from "@stitches/react";
import { MdCalendarToday, MdCake, MdAssessment } from "react-icons/md";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './homeDash.css';
import { Responsavel } from "../../interfaces/Responsavel";
import { Pet_Resp } from "../../interfaces/Pet";
import { AxiosResponse } from "axios";
import { ApiRegistro } from "../../services/ApiRegistro";

const Div = styled('div', {

})

export function HomeDash() {
    const [saudacao,setSaudacao] = useState<string>('');
    const apiRegistro = ApiRegistro();
    const [listResponsaveis, setListResponsaveis] = useState<Responsavel[]>([]);
    const [listPets, setListPets] = useState<Pet_Resp[]>([]);

    const getListResponsaveis = async() => {
        var result:AxiosResponse = await apiRegistro.listResponsaveis();
        if(result.status>=200 && result.status<=300) {
            var responsaveisNiverAtual:Responsavel[] = result.data
            responsaveisNiverAtual = responsaveisNiverAtual.filter(resp => {
                if(resp.nascimento!=null) {
                    var aniversarianteMes:boolean = moment(resp.nascimento).toDate().getMonth()===new Date().getMonth();
                    if (aniversarianteMes) {
                        return resp;
                    } else {
                        return;
                    }
                }
            })
            responsaveisNiverAtual = responsaveisNiverAtual.sort((a,b) => {
                if(moment(a.nascimento).toDate().getDate()>moment(b.nascimento).toDate().getMonth()) {
                    return 1;
                } else if(moment(a.nascimento).toDate().getDate()<moment(b.nascimento).toDate().getMonth()) {
                     return -1;
                } else {
                    return 0;
                }});
            setListResponsaveis(responsaveisNiverAtual);
            getListPets(result.data);
        }
    }

    const getListPets = (list:Responsavel[]) => {
        
            var petsNiverAtual:Pet_Resp[] | any[] = list.map((resp,idx) =>
                resp.pets?.map((pet,idx) => {
                    return {responsavel:resp, pet:pet};
                }))
            let listTmpConcat:any[] = [];
            for (let i=0; i<petsNiverAtual.length; i++) {
                listTmpConcat = listTmpConcat.concat(petsNiverAtual[i]);
            };
            petsNiverAtual = listTmpConcat;
            petsNiverAtual = petsNiverAtual.filter(pet => {
                if(pet.pet.nascimento!=null) {
                    var aniversarianteMes:boolean = moment(pet.pet.nascimento).toDate().getMonth()===new Date().getMonth();
                    if (aniversarianteMes) {
                        return pet;
                    } else {
                        return;
                    }
                }
            });

            petsNiverAtual = petsNiverAtual.sort((a,b) => {
                if(moment(a.nascimento).toDate().getDate()>moment(b.nascimento).toDate().getMonth()) {
                    return 1;
                } else if(moment(a.nascimento).toDate().getDate()<moment(b.nascimento).toDate().getMonth()) {
                     return -1;
                } else {
                    return 0;
                }});
            setListPets(petsNiverAtual);
    }
    
    useEffect(() => {
        moment.locale('pt-br');
        var currentHour = parseInt(moment(new Date()).format('HH'));
        if(currentHour >= 5 && currentHour <= 12) {
            setSaudacao("Bom dia");
        } else if (currentHour >= 13 && currentHour <= 18) {
            setSaudacao("Boa tarde");
        } else {
            setSaudacao("Boa noite");
        }
        getListResponsaveis();
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
                    <a href="/home?page=cadPet">ver agenda</a>
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
                    <span><b>{moment(new Date()).format('MMMM')}</b></span>
                </div>
                <div id="aniver_pets_content">
                    <table id='responsaveis_aniversariantes_mes'>
                        <thead>
                            <tr style={{textAlign:'center'}}>
                                <th style={{width:'10%'}}>Dia</th>
                                <th style={{width:'90%'}}>Responsável</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listResponsaveis.length>0?listResponsaveis.map((resp,idx) => {
                                return (
                                    <tr key={idx}>
                                        <td style={{textAlign:'center'}}>{moment(resp.nascimento).toDate().getDate()}</td>
                                        <td>{resp.nome + ' ' + resp.sobrenome}</td>
                                    </tr>
                                )
                            }
                            ):<tr><td colSpan={2}>Sem aniversariantes no mês!</td></tr>}                            
                        </tbody>    
                    </table>
                    <table id='pets_aniversariantes_mes'>
                        <thead>
                            <tr style={{textAlign:'center'}}>
                                <th style={{width:'10%'}}>Dia</th>
                                <th style={{width:'45%'}}>Pets</th>
                                <th style={{width:'45%'}}>Responsável</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listPets.length>0?listPets.map((pet,idx) => {
                            return(
                                <tr key={idx}>
                                    <td>{moment(pet.pet.nascimento).toDate().getDate()}</td>
                                    <td>{pet.pet.nome}</td>
                                    <td>{pet.responsavel.nome+' '+pet.responsavel.sobrenome}</td>
                                </tr>
                            )
                        }):<tr><td colSpan={3}>Sem aniversariantes no mês!</td></tr>}         
                        </tbody>    
                    </table>
                </div>
            </Div>
            <Div id="resumo">
                <div className="module_title">
                    <MdAssessment size={22}/>
                    <span><b>Analitics</b></span>
                    <span>.</span>
                </div>
                <div id="module_content">
                </div>
            </Div>
        </>
    )
}