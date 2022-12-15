import axios, { AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: 'https://cdn.apicep.com/file/apicep',
    timeout: 1000
});

export const ApiConsultaCep = () => ({
    
    getEndereco: async (cep:String) => {
        var result:any = null;
        console.log(cep);
        await api.get('/'+cep+".json")
        .then(function (response) {
            result = response;
        })
        .catch(function (error) {
            result = error;
            console.log(error);
        });
        return result;
    },
});