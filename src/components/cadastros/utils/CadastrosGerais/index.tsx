import { useState } from 'react';
import { MdAssignment, MdHealthAndSafety, MdMedication, MdPets } from 'react-icons/md';
import { TbVaccine } from 'react-icons/tb';
import { CadAnamnese } from '../CadAnamnese';
import { CadEspecie } from '../CadEspecie';
import { CadMedicamento } from '../CadMedicamento';
import { CadPatologia } from '../CadPatologia';
import { CadRaca } from '../CadRaca';
import { CadVacina } from '../CadVacina';
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
        case "cadVacina":
            return <CadVacina />
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
                        onClick={() => setPageCad('cadVacina')}><TbVaccine size={18} />Vacinas</button>
            </div>
            <br/>
            <div className="container-select-cadastro">
                <button className='button-select-type-cadastro'
                        onClick={() => setPageCad('cadVacina')}><MdAssignment size={18} />Lista de preços</button>
                
                <button className='button-select-type-cadastro'
                        onClick={() => setPageCad('cadVacina')}><MdAssignment size={18}  />Formas de recebimento</button>
                <button className='button-select-type-cadastro'
                        onClick={() => setPageCad('cadVacina')}><MdAssignment size={18}  />Contas caixa</button>
                <button className='button-select-type-cadastro'
                        onClick={() => setPageCad('cadVacina')}><MdAssignment size={18}  />-</button>
            </div>
            <br/>
            <label><strong>Lista de preços:</strong> permite o cadastro de produtos, serviços e pacotes</label>
            <label><strong>Formas de recebimento:</strong> permite o cadastro de modalidades de pagamento, a conta caixa vinculada e seus respectivos tipos de parcelamento</label>
            <label><strong>Contas caixa:</strong> permite o cadastro da contas bancárias da empresa</label>
            <div className='container-cadastro-selected'>
                <CadastroSelected page={pageCad}/>
    
            </div>
        </div>
    )
}