import { AppHeader } from "../../components/AppHeader";
import { styled } from "@stitches/react";
import { MdHealthAndSafety, MdAssignment, MdAssignmentInd, MdEvent, MdPets, MdEqualizer, MdSwipe, MdClear, MdBrightness1, MdBrightnessAuto, MdWbSunny, MdModeNight, MdDarkMode, MdBurstMode, MdLightMode } from "react-icons/md";
import "./home.css";
import { HomeDash } from "../../components/HomeDash";
import { ListResponsavel } from "../../components/ListResponsavel";
import { useState } from "react";
import { FormCadResponsavel } from "../../components/FormCadResponsavel";
import { Responsavel } from "../../interfaces/Responsavel";
import { Pet } from "../../interfaces/Pet";
import { Veterinario } from "../../interfaces/Veterinario";
import { FormCadVeterinario } from "../../components/FormCadVeterinario";

const Div = styled('div', {

});

interface principalProps {
    page:String;
    responsavel:Responsavel;
    pet?:Pet;
    veterinario:Veterinario;
    editResFormClick:(event: React.MouseEvent<HTMLButtonElement>, responsavel:Responsavel) => void;
    editVetFormClick:(event: React.MouseEvent<HTMLButtonElement>, veterinario:Veterinario) => void;
}

const Principal = (props:principalProps) => {
    switch (props.page) {
        case "home":
            return <HomeDash />
            break;
        case "listResponsavel":
            return <ListResponsavel editResFormClick={(e, resp) => props.editResFormClick(e, resp)} 
                                    editVetFormClick={(e, vet) => props.editVetFormClick(e, vet)}                   
                    />
            break;  
    
        case "cadResponsavel":
            return <FormCadResponsavel responsavelForm={props.responsavel}/>
            break;
        
        case "cadVeterinario":
            return <FormCadVeterinario veterinarioForm={props.veterinario}/>
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

    return (
            <Div id="body" data-theme={theme}>
                <AppHeader clickMenu={(e,page) => setShowPage(page)} />

                <Div id="aside">
                    <Div className="button_aside" title="Nova consulta">
                        <span>+ </span>
                        <MdHealthAndSafety size={25} />
                    </Div>
                    <Div className="button_aside" title="Nova receita">
                        <span>+ </span>
                        <MdAssignment size={25} />
                    </Div>
                    <Div className="button_aside" title="Novo cliente"
                            onClick={() => setShowPage("cadResponsavel")}>
                        <span>+ </span>
                        <MdAssignmentInd size={25} />
                    </Div>
                    <Div className="button_aside" title="Novo pet">
                        <span>+ </span>
                        <MdPets size={25}/>
                    </Div>
                    <Div className="button_aside" title="Nova agenda">
                        <span></span>
                        <MdEvent size={25} />
                    </Div>
                    <Div className="button_aside" title="Relatórios">
                        <span></span>
                        <MdEqualizer size={25} />
                    </Div>
                    <Div className="button_aside" title="Tema"
                        onClick={changeTheme}>
                        <span></span>
                        {theme=='ligth'?<MdLightMode size={25} />:<MdDarkMode size={25}/>}
                    </Div>
                </Div>

                <Div id="main">
                    <Principal page={showPage} responsavel={responsavel}
                                            editResFormClick={(e,resp) => editResponsavel(resp)}
                                            veterinario={veterinario}
                                            editVetFormClick={(e,vet) => editVeterinario(vet)}
                              />
                </Div>

                <Div id="footer">
                    Created by Marcelo G Botelho
                </Div>
            </Div>
    ) 
}