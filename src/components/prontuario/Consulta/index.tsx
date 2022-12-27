import { useEffect, useState } from 'react';
import { Pet_Resp } from '../../../interfaces/Pet';
import { LinkButton } from '../../utils/HtmlComponents';
import { Cirurgias } from '../Cirurgias';
import { Geral } from '../Geral';
import { Internacoes } from '../Internacoes';
import { Vacinas } from '../Vacinas';
import './consulta.css';

interface ConsultaProps {
    petR:Pet_Resp
}

export function Consulta(props:ConsultaProps) {

    const [selectedTab, setSelectedTab] = useState<string>("geral");
    const [petExist, setPetExist] = useState<boolean>(true);
    const [petR, setPetR] = useState<Pet_Resp|null>(null);

    const getListPets = async () => {
        console.log('List pets to select!');
    };

    const selectPet = (e:any) => {
        if(petR == null) {
            setPetR(JSON.parse(e.target.value))
        } else {
            setPetR(null);
        };
    };

    const getConsultaPet = async () => {
        if(petR!=null) {
            setPetExist(true);
        }
    };

    useEffect(() => {
        if(props.petR == null) {
            setPetExist(false)
        } else {
            getListPets();
        };

    },[])

    return (
    <>
        {!petExist?
            <div className='modal-select-pet-overlay'>
                <div className='modal-select-pet'>
                    <p>Selecione o Pet!</p>
                    <select onChange={selectPet} value={petR!=null?JSON.stringify(petR):""}>
                        <option value={""}>Selecione o Pet</option>
                        <option value={JSON.stringify({pet:{petID:null, nome:"Totó", cor:"", especie:"", fertil:false, genero:"", nascimento:null, pedigree:false, raca:"", dataRegistro:null} ,
                                        responsavel:{responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],}})}>Totó</option>
                    </select>
                    <br/>
                    <button onClick={() => getConsultaPet()}>Escolher</button>
                </div>
            </div>
        :null}
        <div className='consulta-container'>
            <div className='consulta-title'>
                <h2>Prontuário de {petR?.pet.nome}</h2>
            </div>
            <div className='tab-container'>
                <div className={selectedTab==='geral'?'tab-selected':'tab'}>
                    <LinkButton color={'dark'} size={'small'} onClick={() => setSelectedTab('geral')}>Geral</LinkButton>
                </div>
                <div className={selectedTab==='vacinas'?'tab-selected':'tab'}>
                    <LinkButton color={'dark'} size={'small'} onClick={() => setSelectedTab('vacinas')}>Vacinas</LinkButton>
                </div>
                <div className={selectedTab==='internacoes'?'tab-selected':'tab'}>
                    <LinkButton color={'dark'} size={'small'} onClick={() => setSelectedTab('internacoes')}>Internações</LinkButton>
                </div>
                <div className={selectedTab==='cirurgias'?'tab-selected':'tab'}>
                    <LinkButton color={'dark'} size={'small'} onClick={() => setSelectedTab('cirurgias')}>Cirurgias</LinkButton>
                </div>
            </div>
            <div className='tab-content'>
                {selectedTab==='geral'?<Geral />:null}
                {selectedTab==='vacinas'?<Vacinas />:null}
                {selectedTab==='internacoes'?<Internacoes />:null}
                {selectedTab==='cirurgias'?<Cirurgias />:null}
            </div>
        </div>
    </>
    )
}