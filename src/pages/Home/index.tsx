import { AppHeader } from "../../components/AppHeader";
import { styled } from "@stitches/react";
import { MdAssignment, MdAssignmentInd, MdEqualizer, MdDarkMode, MdLightMode, MdHome, MdAssignmentTurnedIn, MdCalendarToday } from "react-icons/md";
import "./home.css";
import { HomeDash } from "../../components/HomeDash";
import { ListCadastros } from "../../components/cadastros/ListCadastros";
import { useState } from "react";
import { FormCadResponsavel } from "../../components/cadastros/FormCadResponsavel";
import { Responsavel } from "../../interfaces/Responsavel";
import { Pet, Pet_Resp } from "../../interfaces/Pet";
import { Veterinario } from "../../interfaces/Veterinario";
import { FormCadVeterinario } from "../../components/cadastros/FormCadVeterinario";
import { FormCadPet } from "../../components/cadastros/FormCadPet";
import { Prontuario } from "../../components/prontuario/Prontuario";
import { CadastrosGerais } from "../../components/cadastros/utils/CadastrosGerais"

const Div = styled('div', {

});

interface principalProps {
    page:String;
    responsavel:Responsavel;
    pet?:Pet;
    pet_resp?:Pet_Resp;
    veterinario:Veterinario;
    editResFormClick:(event: React.MouseEvent<HTMLButtonElement>, responsavel:Responsavel|null) => void;
    editVetFormClick:(event: React.MouseEvent<HTMLButtonElement>, veterinario:Veterinario|null) => void;
    editPetFormClick:(event: React.MouseEvent<HTMLButtonElement>, petR:Pet_Resp|null) => void;
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

        case "cadGeral":
            return <CadastrosGerais />
            break;

        case "consulta":
            return <Prontuario />
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
    const [pet_resp, setPet_Resp] = useState<Pet_Resp>({pet:{petID:null, nome:"", genero:"", cor:"", especie:"", fertil:false, nascimento:null, pedigree:false, raca:"", dataRegistro:null},
                                                        responsavel:{responsavelID:null, nome: "", sobrenome: "", genero:"", tipoPessoa:"", tipoRegistro:"", registroNum:"", nascimento:null, aceitaEmail:false, enderecos: [], contatos: [],}});
    const [veterinario, setVeterinario] = useState<Veterinario>({veterinarioID:null, nome:"", sobrenome:"", genero:"", cpf:"", cidade:"", uf:"",crmvs:[]});
    const [theme, setTheme] = useState<String>('ligth')

    const changeTheme = () => {
        setTheme(theme=='ligth'?'dark':'ligth')
    };

    const editResponsavel = (resp:Responsavel|null) => {
        if(resp!=null){
            setResponsavel(resp);
        }
        setShowPage('cadResponsavel');
    };

    const editVeterinario = (vet:Veterinario|null) => {
        if (vet!=null) {
            setVeterinario(vet);
        }
        setShowPage('cadVeterinario');
    };

    const editPet = (petR:Pet_Resp|null) => {
        if (petR!=null) {
            setPet_Resp(petR);
        }
        setShowPage('cadPet');
    };

    return (
            <Div id="body" data-theme={theme}>
                <AppHeader clickMenu={(e,page) => setShowPage(page)} />

                <Div id="aside">
                    <Div className="button_aside" title="Início"
                            onClick={() => setShowPage("home")}>
                        <MdHome size={25} />
                    </Div>
                    <Div className="button_aside" title="Ver Agenda"
                            onClick={() => console.log("Agenda")}>
                        <MdCalendarToday size={25} />
                    </Div>
                    <Div className="button_aside" title="Ver Cadastros de Pets/Pessoas"
                            onClick={() => setShowPage("listCadastros")}>
                        <MdAssignmentInd size={25} />
                    </Div>
                    <Div className="button_aside" title="Ver Prontuários"
                            onClick={() => setShowPage("consulta")}>
                        <MdAssignment size={25} />
                    </Div>
                    <Div className="button_aside" title="Cadastros Gerais"
                            onClick={() => setShowPage("cadGeral")}>
                        <MdAssignmentTurnedIn size={25} />
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
                    <Principal page={showPage} 
                            responsavel={responsavel}
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