import axios from 'axios';
import { useCallback } from 'react';
import { Anamnese, CartaoVacina, Consulta } from '../interfaces/Prontuario';

const api = axios.create({
    baseURL: 'http://localhost:8765',
    timeout: 2000
  });

export const ApiProntuario = () => ({

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

  listCartaoVacinaByPet: useCallback(async(petid:number) => {
    var result:any = null;
    await api.get<CartaoVacina[]>('/vacina/cartao/byPet/1'+petid)
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

})