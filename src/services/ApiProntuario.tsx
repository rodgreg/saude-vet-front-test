import axios from 'axios';
import { useCallback } from 'react';
import { Anamnese, Consulta } from '../interfaces/Prontuario';

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

})