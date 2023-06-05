import React, { useEffect, useState } from 'react';
import { Consultas } from '../../components/prontuario/Consultas';
import { useSearchParams } from 'react-router-dom';
import { ApiRegistro } from '../../services/ApiRegistro'
import { Pet } from '../../interfaces/Pet';
import { AxiosResponse } from 'axios';

export const RegistroConsulta: React.FC = () => {

    const apiRegistro = ApiRegistro();
    let [searchParams, setSearchParams] = useSearchParams();
    let petUrlParam = searchParams.get("pet");

    const [petParam, setPetParam] = useState<String>("");
    const [pet, setPet] = useState<Pet | null>(null);


    const recuperaPet = async (idPet: Number) => {
        let petResponse: AxiosResponse = await apiRegistro.getPetById(idPet);
        if (petResponse.status >= 200 && petResponse.status <= 300) {
            setPet(petResponse.data);
        }
    }

    useEffect(() => {
        if (petUrlParam != null) {
            recuperaPet(Number(petUrlParam));
        }
    }, [petUrlParam])

    return (
        <div>
            <Consultas petProps={pet} editing={true} />
        </div>
    );
}
