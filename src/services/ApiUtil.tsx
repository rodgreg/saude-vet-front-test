import axios from 'axios';
import { useCallback } from 'react';
import { BASE_URL } from '../configs/constants';
import { Especie, Medicamento, Patologia, Raca, Vacina } from '../interfaces/Util';
import { getTodasVacinas } from './ApiJson.tsx';


const baseAdress = BASE_URL;

const api = axios.create({
    baseURL: baseAdress,
    timeout: 1000
});



export const ApiUtil = () => ({
    
    // Crud Especies
    listEspecies: useCallback(async () => {
        var result:any = null;
        await api.get<Especie[]>('/registro/util/especie/all')
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
            console.log(error);
        });
        return result;
    },[]),

    getEspecieById: useCallback(async (especieid:number) => {
        var result:any = "";
        await api.get<Especie>('/registro/util/especie/'+especieid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    saveEspecie: useCallback(async (especie:Especie) => {
        var result:any = "";
        await api.post('/registro/util/especie/save', especie)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateEspecie: useCallback(async (especie:Especie) => {
        var result:any = "";
        await api.put('/registro/util/especie/update', especie)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteEspecie: useCallback(async (especieid:number) => {
        var result:any = "";
        await api.delete('/registro/util/especie/delete/'+especieid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    //Crud Raças
    listRacas: useCallback(async () => {
        var result:any = null;
        await api.get<Raca[]>('/registro/util/raca/all')
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
            console.log(error);
        });
        return result;
    },[]),

    listRacasByEspecie: useCallback(async (especieid:number) => {
        var result:any = null;
        await api.get<Raca[]>('/registro/util/raca/byEspecie/'+especieid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
            console.log(error);
        });
        return result;
    },[]),

    getRacaById: useCallback(async (racaid:number) => {
        var result:any = "";
        await api.get<Raca>('/registro/util/raca/'+racaid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    saveRaca: useCallback(async (raca:Raca) => {
        var result:any = "";
        await api.post('/registro/util/raca/save', raca)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateRaca: useCallback(async (raca:Raca) => {
        var result:any = "";
        await api.put('/registro/util/raca/update', raca)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteRaca: useCallback(async (racaid:number) => {
        var result:any = "";
        await api.delete('/registro/util/raca/delete/'+racaid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    //Crud Medicamentos
    listMedicamentos: useCallback(async () => {
        var result:any = null;
        await api.get<Medicamento[]>('/registro/util/medicamento/all')
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
            console.log(error);
        });
        return result;
    },[]),

    getMedicamentoById: useCallback(async (medicamentoid:number) => {
        var result:any = "";
        await api.get<Medicamento>('/registro/util/medicamento/'+medicamentoid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    saveMedicamento: useCallback(async (medicamento:Medicamento) => {
        var result:any = "";
        await api.post('/registro/util/medicamento/save', medicamento)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateMedicamento: useCallback(async (medicamento:Medicamento) => {
        var result:any = "";
        await api.put('/registro/util/medicamento/update', medicamento)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteMedicamento: useCallback(async (medicamentoid:number) => {
        var result:any = "";
        await api.delete('/registro/util/medicamento/delete/'+medicamentoid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    //Crud Patologias
    listPatologias: useCallback(async () => {
        var result:any = null;
        await api.get<Patologia[]>('/registro/util/patologia/all')
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
            console.log(error);
        });
        return result;
    },[]),

    getPatologiaById: useCallback(async (patologiaid:number) => {
        var result:any = "";
        await api.get<Patologia>('/registro/util/patologia/'+patologiaid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    savePatologia: useCallback(async (patologia:Patologia) => {
        var result:any = "";
        await api.post('/registro/util/patologia/save', patologia)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updatePatologia: useCallback(async (patologia:Patologia) => {
        var result:any = "";
        await api.put('/registro/util/patologia/update', patologia)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deletePatologia: useCallback(async (patologiaid:number) => {
        var result:any = "";
        await api.delete('/registro/util/patologia/delete/'+patologiaid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    //Crud Vacina
    listVacinas: useCallback(async () => {
        var result:any = null;
        await api.get<Vacina[]>('/vacina/all')
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
            console.log(error);
        });
        return result;
    },[]),

    getVacinaById: useCallback(async (vacinaid:number) => {
        var result:any = "";
        await api.get<Patologia>('/vacina/'+vacinaid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    saveVacina: useCallback(async (vacina:Vacina) => {
        var result:any = "";
        await api.post('/vacina/save', vacina)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateVacina: useCallback(async (vacina:Vacina) => {
        var result:any = "";
        console.log(vacina)
        await api.post('/vacina/save', vacina)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteVacina: useCallback(async (vacinaid:number) => {
        var result:any = "";
        await api.delete('/vacina/delete/'+vacinaid)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),
})
