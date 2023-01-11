import { useState } from 'react';
import { MdAssignment, MdHealthAndSafety, MdMedication, MdPets } from 'react-icons/md';
import { CadAnamnese } from '../CadAnamnese';
import { CadEspecie } from '../CadEspecie';
import { CadMedicamento } from '../CadMedicamento';
import { CadPatologia } from '../CadPatologia';
import { CadRaca } from '../CadRaca';
import './cadastrosGerais.css';

interface propsCadSelected {
    page?:string
}

const CadastroSelected = (props:propsCadSelected) => {
    switch (props.page) {
        case "cadEspecie":
            return <CadEspecie />
            break;
        case "cadRaca":
            return <CadRaca />
            break;
        case "cadPatologia":
            return <CadPatologia />
            break;
        case "cadMedicamento":
            return <CadMedicamento />
            break;
        case "cadAnamnese":
            return <CadAnamnese />
            break;    
        default:
            return <div />;
            break
    }
}

export function CadastrosGerais () {
    const [pageCad, setPageCad] = useState<string>("");

    return (
        <div className="container-cad-gerais">
            <h2>Cadastros Gerais</h2>
            <div className="container-select-cadastro">
                <button className='button-select-type-cadastro' 
                        onClick={() => setPageCad('cadEspecie')}><MdPets size={18} />Espécies</button>
                <button className='button-select-type-cadastro'
                        onClick={() => setPageCad('cadRaca')}><MdPets size={18} />Raças</button>
                <button className='button-select-type-cadastro'
                        onClick={() => setPageCad('cadPatologia')}><MdHealthAndSafety size={18} />Patologias</button>
                <button className='button-select-type-cadastro'
                        onClick={() => setPageCad('cadMedicamento')}><MdMedication size={18} />Medicamentos</button>
                <button className='button-select-type-cadastro'
                        onClick={() => setPageCad('cadAnamnese')}><MdAssignment size={18}  />Anamneses</button>
            </div>
            <div className='container-cadastro-selected'>
                <CadastroSelected page={pageCad}/>
    
            </div>
        </div>
    )
}