import axios from 'axios';
import { Contato, Endereco, Responsavel } from '../interfaces/Responsavel';
import { Pet } from '../interfaces/Pet';
import { useCallback } from 'react';
import { Crmv, Veterinario } from '../interfaces/Veterinario';

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
        var result:any = "";
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

    saveResponsavel: useCallback(async (responsavel:Omit<Responsavel,"responsavelID"|"pets"|"enderecos"|"contatos">) => {
        var result:any = "";
        await api.post('/registro/responsavel/save', responsavel)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    addEnderecoToResponsavel: useCallback(async (responsavelID:Number, endereco:Endereco) => {
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
        var result:any = "";
        await api.post('/registro/responsavel/'+responsavelID+'/addEndereco', endereco)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteEndereco: useCallback(async (endereco:Endereco) => {

        var result:any = "";
        await api.delete('/registro/responsavel/deleteEndereco', {data:endereco})
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    addContatoToResponsavel: useCallback(async (responsavelID:Number, contato:Contato) => {
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
        var result:any = "";
        await api.post('/registro/responsavel/'+responsavelID+'/addContato', contato)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateResponsavel: useCallback(async (responsavel:Omit<Responsavel,"pets"|"enderecos"|"contatos">) => {
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
        var result:any = "";
        await api.put('/registro/responsavel/update', responsavel)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteResponsavel: useCallback(async (responsavel:Responsavel) => {
        // Objeto mínimo Responsável
        // {
        //     "responsavelID":Number,
        // }
        var result:any = "";
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

    getImgPerfilPet: useCallback(async (petid:Number) => {
        var result:any = "";
        await api.get('/registro/pet/imgPerfil/'+petid)
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

    savePet: useCallback(async (pet:Pet, responsavelID:Number, petPerfilImg:File|null) => {

        var formData = new FormData();
        var headers = {headers: {'Content-Type': 'multipart/form-data'}}
        var result:any = "";

        formData.append("pet",JSON.stringify(pet));
        if(petPerfilImg!=null) {
            formData.append("file",petPerfilImg);
        }
        await api.post('/registro/pet/save/responsavel/'+responsavelID, formData, headers)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;

        // var result:any = "";
        // await api.post('/registro/pet/save/responsavel/'+responsavelID, pet)
        // .then(function (response) {
        //     result = response;
        // })
        // .catch(function (error) {
        //     result = error;
        // });
        // return result;
    },[]),

    updatePet: useCallback(async (pet:Pet, petPerfilImg:File|null) => {

        var formData = new FormData();
        var headers = {headers: {'Content-Type': 'multipart/form-data'}}
        var result:any = "";

        formData.append("pet",JSON.stringify(pet));
        if(petPerfilImg!=null) {
            formData.append("file",petPerfilImg);
        }
        var result:any = "";
        await api.put('/registro/pet/update', formData, headers)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deletePet: useCallback(async (pet:Pet) => {
        // Objeto Pet
        // {
        //     "petID":Number,
        // }
        var result:any = "";
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
        var result:any = "";
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
        var result:any = "";
        await api.get('/registro/veterinario/'+veterinarioID)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    saveVeterinario: useCallback(async (veterinario:Veterinario) => {
        // Objeto Veterinario
        // {
        //     "nome":"String",
        //     "sobrenome":"String",
        //     "genero":"String",
        //     "cpf":"String",
        //     "cidade":"String",
        //     "uf":"String",
        // }
        var result:any = "";
        await api.post('/registro/veterinario/save/', veterinario)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    addCrmvToVeterinario: useCallback(async (crmv:Crmv[], veterinarioID:Number) => {
        var result:any = "";
        await api.post('/registro/veterinario/'+veterinarioID+'/addCrmv', crmv)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateVeterinario: useCallback(async (veterinario:Veterinario) => {
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
        var result:any = "";
        await api.put('/registro/veterinario/update', veterinario)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    updateCrmv: useCallback(async (crmv:Crmv) => {
        // Objeto crmv
        // {
        //     "crmvID": 9,
        //     "numero": "12333",
        //     "uf": "PR",
        //     "area": "Medicina Veterinária",
        //     "dataRegistro": "2022-11-22T16:52:34.509923"
        // }
        var result:any = "";
        await api.put('/registro/veterinario/updateCrmv', crmv)
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteVeterinario: useCallback(async (veterinario:Veterinario) => {
        // Objeto Veterinario
        // {
        //     "veterinarioID":Number,
        // }
        var result:any = "";
        await api.delete('/registro/pet/delete', {data:veterinario})
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
        });
        return result;
    },[]),

    deleteCrmv: useCallback(async (crmv:Crmv) => {
        var result:any = "";
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