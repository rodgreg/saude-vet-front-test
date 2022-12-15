import axios, { AxiosResponse } from 'axios';
import { Responsavel } from '../interfaces/Responsavel';
import { Pet } from '../interfaces/Pet';
import { useCallback } from 'react';

const api = axios.create({
    baseURL: 'http://localhost:8765',
    timeout: 2000
  });

export const ApiRegistro = () => ({

    // Apis CRUD Responsável PET #####
    listResponsaveis: useCallback(async () => {
        var result:any = null;
        await api.get<Responsavel[]>('/registro/responsavel/all')
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
            console.log(error);
        });
        return result;
    },[]),

    getResponsavelById: useCallback(async (responsavelID:Number) => {
        var result = null;
        await api.get<Responsavel>('/registro/responsavel/'+responsavelID)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    getResponsavelByPetId: useCallback(async (petID:Number) => {
        var result = null;
        await api.get<Responsavel>('/registro/responsavel/pet/'+petID)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    saveResponsavel: useCallback(async (responsavel:Omit<Responsavel,"responsavelID"|"pets"|"enderecos"|"contatos" >) => {
        // Objeto Responsável
        // {
        //     "nome":"String",
        //     "sobrenome":"String",
        //     "genero":"String",
        //     "tipoPessoa":"String",
        //     "tipoRegistro":"String",
        //     "registroNum":"String",
        //     "nascimento":"Date",
        //     "aceitaEmail":Boolean
        // }
        var result = null;
        await api.post('/registro/responsavel/save', responsavel)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    addEnderecoToResponsavel: useCallback(async (responsavelID:Number, endereco:JSON) => {
        // Objeto Endereço
        // {
        //     "tipoEndereco":"String",
        //     "cep":"String",
        //     "logradouro":"String",
        //     "numero":"String",
        //     "complemento":"String",
        //     "bairro":"String",
        //     "cidade":"String",
        //     "uf":"String"
        // }
        var result = null;
        await api.post('/registro/responsavel/'+responsavelID+'/addEndereco', endereco)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    addContatoToResponsavel: useCallback(async (responsavelID:Number, contato:JSON) => {
        // Objeto Endereço
        // {
        //     "tipoEndereco":"String",
        //     "cep":"String",
        //     "logradouro":"String",
        //     "numero":"String",
        //     "complemento":"String",
        //     "bairro":"String",
        //     "cidade":"String",
        //     "uf":"String"
        // }
        var result = null;
        await api.post('/registro/responsavel/'+responsavelID+'/addContato', contato)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateResponsavel: useCallback(async (responsavel:JSON) => {
        // Objeto Responsável
        // {
        //     "responsavelID":Number,
        //     "nome":"String",
        //     "sobrenome":"String",
        //     "genero":"String",
        //     "tipoPessoa":"String",
        //     "tipoRegistro":"String",
        //     "registroNum":"String",
        //     "nascimento":"Date",
        //     "aceitaEmail":Boolean
        // }
        var result = null;
        await api.put('/registro/responsavel/update', responsavel)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteResponsavel: useCallback(async (responsavel:JSON) => {
        // Objeto mínimo Responsável
        // {
        //     "responsavelID":Number,
        // }
        var result = null;
        await api.delete('/registro/responsavel/delete',{data: responsavel})
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    // Apis CRUD PETs #####
    listPets: useCallback(async () => {
        var result = null;
        await api.get('/registro/pet/all')
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    getPetById: useCallback(async (petID:Number) => {
        var result = null;
        await api.get('/registro/pet/'+petID)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    listPetsByResponsavel: useCallback(async (responsavelID:Number) => {
        var result = null;
        await api.get('/registro/pet/byresponsavel/'+responsavelID)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    savePet: useCallback(async (pet:JSON, responsavelID:Number) => {
        // Objeto Pet
        // {
        //     "nome":"String",
        //     "especie":"String",
        //     "raca":"String",
        //     "cor":"String",
        //     "tamanho":"String",
        //     "peso":"String",
        //     "nascimento":"Date",
        //     "pedigree":boolean,
        //     "fertil":boolean
        // }
        var result = null;
        await api.post('/registro/pet/save/responsavel/'+responsavelID, pet)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updatePet: useCallback(async (pet:JSON) => {
        // Objeto Pet
        // {
        //     "petID":Number,
        //     "nome":"String",
        //     "especie":"String",
        //     "raca":"String",
        //     "cor":"String",
        //     "tamanho":"String",
        //     "peso":"String",
        //     "nascimento":"Date",
        //     "pedigree":boolean,
        //     "fertil":boolean
        // }
        var result = null;
        await api.put('/registro/pet/update', pet)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deletePet: useCallback(async (pet:JSON) => {
        // Objeto Pet
        // {
        //     "petID":Number,
        // }
        var result = null;
        await api.delete('/registro/pet/delete', {data:pet})
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    // Apis CRUD Veterinarios PET #####
    listVeterinarios: useCallback(async () => {
        var result = null;
        await api.get('/registro/veterinario/all')
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    getVeterinarioById: useCallback(async (veterinarioID:Number) => {
        var result = null;
        await api.get('/registro/veterinario/'+veterinarioID)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    saveVeterinario: useCallback(async (veterinario:JSON) => {
        // Objeto Veterinario
        // {
        //     "nome":"String",
        //     "sobrenome":"String",
        //     "genero":"String",
        //     "cpf":"String",
        //     "cidade":"String",
        //     "uf":"String",
        // }
        var result = null;
        await api.post('/registro/veterinario/save/', veterinario)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    addCrmvToVeterinario: useCallback(async (crmv:JSON[], veterinarioID:Number) => {
        // Objeto Pet
        // [ //Array
        //     {
        //         "numero":"String",
        //         "uf":"String",
        //         "area":"String"
        //     }
        // ]
        var result = null;
        await api.post('/registro/veterinario/'+veterinarioID+'/addCrmv', crmv)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateVeterinario: useCallback(async (veterinario:JSON) => {
        // Objeto Veterinario
        // {
        //     "veterinarioID":Number,
        //     "nome":"String",
        //     "sobrenome":"String",
        //     "genero":"String",
        //     "cpf":"String",
        //     "cidade":"String",
        //     "uf":"String",
        // }
        var result = null;
        await api.put('/registro/veterinario/update', veterinario)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateCrmv: useCallback(async (crmv:JSON) => {
        // Objeto crmv
        // {
        //     "crmvID": 9,
        //     "numero": "12333",
        //     "uf": "PR",
        //     "area": "Medicina Veterinária",
        //     "dataRegistro": "2022-11-22T16:52:34.509923"
        // }
        var result = null;
        await api.put('/registro/veterinario/updateCrmv', crmv)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteVeterinario: useCallback(async (veterinario:JSON) => {
        // Objeto Veterinario
        // {
        //     "veterinarioID":Number,
        // }
        var result = null;
        await api.delete('/registro/pet/delete', {data:veterinario})
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteCrmv: useCallback(async (crmv:JSON) => {
        // Objeto crmv
        // {
        //     "crmvID":Number,
        // }
        var result = null;
        await api.delete('/registro/pet/removeCrmv', {data:crmv})
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

});