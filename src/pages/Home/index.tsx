import { AppHeader } from "../../components/AppHeader";
import { styled } from "@stitches/react";
import { MdHealthAndSafety, MdAssignment, MdAssignmentInd, MdEvent, MdPets, MdEqualizer, MdSwipe, MdClear, MdBrightness1, MdBrightnessAuto, MdWbSunny, MdModeNight, MdDarkMode, MdBurstMode, MdLightMode } from "react-icons/md";
import "./home.css";
import { HomeDash } from "../../components/HomeDash";
import { ListCadastros } from "../../components/ListCadastros";
import { useState } from "react";
import { FormCadResponsavel } from "../../components/FormCadResponsavel";
import { Responsavel } from "../../interfaces/Responsavel";
import { Pet, Pet_Resp } from "../../interfaces/Pet";
import { Veterinario } from "../../interfaces/Veterinario";
import { FormCadVeterinario } from "../../components/FormCadVeterinario";
import { FormCadPet } from "../../components/FormCadPet";

const Div = styled('div', {

});

interface principalProps {
    page:String;
    responsavel:Responsavel;
    pet?:Pet;
    pet_resp?:Pet_Resp;
    veterinario:Veterinario;
    editResFormClick:(event: React.MouseEvent<HTMLButtonElement>, responsavel:Responsavel) => void;
    editVetFormClick:(event: React.MouseEvent<HTMLButtonElement>, veterinario:Veterinario) => void;
    editPetFormClick:(event: React.MouseEvent<HTMLButtonElement>, petR:Pet_Resp) => void;
}

const Principal = (props:principalProps) => {
    switch (props.page) {
        case "home":
            return <HomeDash />
            break;
        case "listCadastros":
            return <ListCadastros editResFormClick={(e, resp) => props.editResFormClick(e, resp)} 
                                    editVetFormClick={(e, vet) => props.editVetFormClick(e, vet)} 
                                    editPetFormClick={(e,petR) => props.editPetFormClick(e, petR)}                  
                    />
            break;  
    
        case "cadResponsavel":
            return <FormCadResponsavel responsavelForm={props.responsavel}/>
            break;
        
        case "cadVeterinario":
            return <FormCadVeterinario veterinarioForm={props.veterinario}/>
            break;
        
        case "cadPet":
            return <FormCadPet petForm={props.pet_resp}/>
            break;

        case "loading":
            return <HomeDash />
            break;

        default:
            return <HomeDash />
            break;
    }
}

export function Home () {
    const [showPage, setShowPage] = useState<String>("home");
    const [responsavel, setResponsavel] = useState<Responsavel>({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, pets: [], enderecos: [], contatos: [],});
    const [pet_resp, setPet_Resp] = useState<Pet_Resp>({pet:null, responsavel:null});
    const [veterinario, setVeterinario] = useState<Veterinario>({veterinarioID:null, nome:"", sobrenome:"", genero:"", cpf:"", cidade:"", uf:"",crmvs:[]});
    const [theme, setTheme] = useState<String>('ligth')

    const changeTheme = () => {
        setTheme(theme=='ligth'?'dark':'ligth')
    };

    const editResponsavel = (resp:Responsavel) => {
        setResponsavel(resp);
        setShowPage('cadResponsavel');
    };

    const editVeterinario = (vet:Veterinario) => {
        setVeterinario(vet);
        setShowPage('cadVeterinario');
    };

    const editPet = (petR:Pet_Resp) => {
        setPet_Resp(petR);
        setShowPage('cadPet');
    };

    return (
            <Div id="body" data-theme={theme}>
                <AppHeader clickMenu={(e,page) => setShowPage(page)} />

                <Div id="aside">
                    <Div className="button_aside" title="Ver Cadastros de Pets/Pessoas"
                            onClick={() => setShowPage("listCadastros")}>
                        <MdAssignmentInd size={25} />
                    </Div>
                    <Div className="button_aside" title="Ver Cadastros de Dados"
                            onClick={() => console.log("Ver Cadastros de Dados")}>
                        <MdAssignment size={25} />
                    </Div>
                    <Div className="button_aside" title="Relatórios"
                            onClick={() => console.log("Relatórios")}>
                        <MdEqualizer size={25} />
                    </Div>
                    <Div className="button_aside" title="Tema"
                        onClick={changeTheme}>
                        {theme=='dark'?<MdLightMode size={25} />:<MdDarkMode size={25}/>}
                    </Div>
                </Div>

                <Div id="main">
                    <Principal page={showPage} responsavel={responsavel}
                                            editResFormClick={(e,resp) => editResponsavel(resp)}
                                            veterinario={veterinario}
                                            editVetFormClick={(e,vet) => editVeterinario(vet)}
                                            pet_resp={pet_resp}
                                            editPetFormClick={(e,petR) => editPet(petR)}
                              />
                </Div>

                <Div id="footer">
                    Created by Marcelo G Botelho
                </Div>
            </Div>
    ) 
}