import axios from 'axios';
import { useCallback } from 'react';
import { BASE_URL } from '../configs/constants';
import { Anamnese, AplicacaoVacina, CartaoVacina, Consulta } from '../interfaces/Prontuario';

const baseAdress = BASE_URL;

const api = axios.create({
    baseURL: baseAdress,
    timeout: 1000
});

export const ApiProntuario = () => ({

  // Chamadas para Consultas de Pets
  listConsultasPet: useCallback(async (petID:number) => {
    var result:any = null;
    await api.get<Consulta[]>('/consulta/geral/pet/'+petID)
    .then(function (response) {
        result = response;
    })
    .catch(function (error) {
        result = error;
        console.log(error);
    });
    return result;
  },[]),

  saveConsultaPet: useCallback(async (consulta:Consulta) => {
    var result:any = null;
    await api.post('/consulta/geral/save', consulta)
    .then(function (response) {
        result = response;
    })
    .catch(function (error) {
        result = error;
        console.log(error);
    });
    return result;
  },[]),

  updateConsultaPet: useCallback(async (consulta:Consulta) => {
    var result:any = null;
    await api.put('/consulta/geral/update', consulta)
    .then(function (response) {
        result = response;
    })
    .catch(function (error) {
        result = error;
        console.log(error);
    });
    return result;
  },[]),

  // Chamadas para Template de Anamnese    
  saveTemplateAnamnese: useCallback(async (Anamnese:Anamnese) => {
    var result:any = null;
    await api.post('/consulta/geral/template/save', Anamnese)
    .then(function (response) {
        result = response;
    })
    .catch(function (error) {
        result = error;
        console.log(error);
    });
    return result;
  },[]),

  listTemplateAnamnese: useCallback(async () => {
    var result:any = null;
    await api.get<Anamnese[]>('/consulta/geral/template/all')
    .then(function (response) {
        result = response;
    })
    .catch(function (error) {
        result = error;
        console.log(error);
    });
    return result;
  },[]),

  // Chamadas para Cartão de Vacina
  listCartaoVacinaByPet: useCallback(async(petid:number) => {
    var result:any = null;
    await api.get<CartaoVacina[]>('/vacina/cartao/byPet/'+petid)
    .then(function (response) {
        result = response;
    })
    .catch(function (error) {
        result = error;
        console.log(error);
    });
    return result;
  },[]),

  saveCartaoVacina: useCallback(async(cartao:CartaoVacina) => {
    var result:any = null;
    await api.post<CartaoVacina>('/vacina/cartao/save',cartao)
    .then(function (response) {
        result = response;
    })
    .catch(function (error) {
        result = error;
        console.log(error);
    });
    return result;
  },[]),

  deleteCartaoVacina: useCallback(async(cartaoid:number) => {
    var result:any = null;
    await api.delete<string>('/vacina/cartao/delete/'+cartaoid)
    .then(function (response) {
        result = response;
    })
    .catch(function (error) {
        result = error;
        console.log(error);
    });
    return result;
  },[]),

  // Chamadas para Aplicações de Vacinas
  addAplicacaoToCartaoVacina: useCallback(async(cartaoid:number, aplicacao:AplicacaoVacina) => {
    var result:any = "";
    await api.post<CartaoVacina>('/vacina/cartao/addAplicacao/'+cartaoid, aplicacao)
    .then(function (response){
      result = response;
    })
    .catch(function (error) {
      result = error;
      console.log(error);
    });
    return result;
  },[]),

  removeAplicacaoToCartaoVacina: useCallback(async(aplicacaoid:number) => {
    var result:any = "";
    await api.delete<CartaoVacina>('/vacina/cartao/removeAplicacao/'+aplicacaoid)
    .then(function (response){
      result = response;
    })
    .catch(function (error) {
      result = error;
      console.log(error);
    });
    return result;
  },[]),

})