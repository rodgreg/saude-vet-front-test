import { AppHeader } from "../../components/AppHeader";
import { styled } from "@stitches/react";
import { MdHealthAndSafety, MdAssignment, MdAssignmentInd, MdEvent, MdPets, MdEqualizer, MdSwipe } from "react-icons/md";
import "./home.css";
import { HomeDash } from "../../components/HomeDash";
import { ListResponsavel } from "../../components/ListResponsavel";
import { useState } from "react";
import { FormCadResponsavel } from "../../components/FormCadResponsavel";
import { Responsavel } from "../../interfaces/Responsavel";
import { Pet } from "../../interfaces/Pet";
import { Veterinario } from "../../interfaces/Veterinario";

const Div = styled('div', {

});

interface principalProps {
    page:String;
    responsavel?:Responsavel;
    pet?:Pet;
    veterinario?:Veterinario;
}

const Principal = (props:principalProps) => {
    switch (props.page) {
        case "home":
            return <HomeDash />
            break;
        case "listResponsavel":
            return <ListResponsavel />
            break;  
    
        case "cadResponsavel":
            return <FormCadResponsavel responsavel={props.responsavel}/>
            break;

        default:
            return <HomeDash />
            break;
    }
}

export function Home () {
    const [showPage, setShowPage] = useState<String>("home");
    const [responsavel, setResponsavel] = useState<Responsavel>({responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, pets: [], enderecos: [], contatos: [],});
    const [theme, setTheme] = useState<String>('ligth')

    const changeTheme = () => {
        setTheme(theme=='ligth'?'dark':'ligth')
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
                        <MdSwipe size={25} />
                    </Div>
                </Div>

                <Div id="main">
                    <Principal page={showPage} responsavel={responsavel}/>
                </Div>

                <Div id="footer">
                    Created by Marcelo G Botelho
                </Div>
            </Div>
    ) 
}