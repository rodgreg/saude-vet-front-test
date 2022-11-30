import { useEffect, useState } from 'react';
import './listResponsavel.css';
import { ApiRegistro } from '../../services/ApiRegistro';
import moment from 'moment';
import { Axios } from 'axios';
import { Responsavel } from '../../interfaces/Responsavel';


export function ListResponsavel () {

    const api = ApiRegistro();
    const [listResponsaveis, setListResponsaveis] = useState<Responsavel[]>([]);

    const getListResponsaveis = async () => {
        var list:any = await api.listResponsaveis();
        if (list?.status >= 200 && list?.status <= 300){
            setListResponsaveis(list.data);
        }
    }

    useEffect(() => {
        getListResponsaveis();
    },[]);

    return (
            <table style={{height:100, width:900, textAlign:'center'}}>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Sexo</th>
                    <th>Tipo de Pessoa</th>
                    <th>CPF/CNPJ</th>
                    <th>Data de Nasc.</th>
                </tr>
                </thead>
                <tbody>
            {listResponsaveis.map((resp,idx) =>
                <tr key={idx}>
                    <td>{resp?.nome}</td>
                    <td>{resp?.sobrenome}</td>
                    <td>{resp?.genero}</td>
                    <td>{resp?.tipoPessoa}</td>
                    <td>{resp?.registroNum}</td>
                    <td>{moment(resp?.nascimento).format("DD/MM/yyyy")}</td>
                </tr>
            )}
                </tbody>
            </table>
    )

}