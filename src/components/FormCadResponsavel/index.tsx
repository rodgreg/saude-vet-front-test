import React from 'react';
import moment from 'moment';
import './formCadResponsavel.css';

export function FormCadResponsavel() {

    const submitform = (e:any) => {
        e.preventDefault();
        console.log("form submit!")
    }

    return (
        <>
            <form onSubmit={submitform}>
                <label>Nome:</label><br/>
                <input type="text" id='nome' name="nome" placeholder='Nome do responsável pelo Pet.'  /><br/>
                <label>Sobrenome:</label><br/>
                <input type="text" name="sobrenome" placeholder='Sobrenome do responsável pelo Pet.'  /><br/>
                <label>Sexo:</label><br/>
                <input type="select" name="genero" placeholder='Masculino ou Feminino.'  /><br/>
                <label>Tipo de Pessoa:</label><br/>
                <input type="select" name="tipoPessoa" placeholder='Física ou Jurídica.'  /><br/>
                <input type="hidden" name="tipoRegistro" value="CPF"  />
                <label>CPF / CNPJ:</label><br/>
                <input type="select" name="registroNum" /><br/>
                <label>Data de nascimento:</label><br/>
                <input type="date" name="nascimento" max={moment(new Date().setFullYear(new Date().getFullYear() - 16)).format('yyyy-MM-DD')}  /><br/>
                <label>Aceita receber e-mail?</label><br/>
                <input type="checkbox" name="aceitaEmail" /><br/>
            </form>
        </>
    )
    
}

        //     "nome":"String",
        //     "sobrenome":"String",
        //     "genero":"String",
        //     "tipoPessoa":"String",
        //     "tipoRegistro":"String",
        //     "registroNum":"String",
        //     "nascimento":"Date",
        //     "aceitaEmail":Boolean