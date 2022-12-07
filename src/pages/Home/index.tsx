import { AppHeader } from "../../components/AppHeader";
import { styled } from "@stitches/react";
import { MdHealthAndSafety, MdAssignment, MdAssignmentInd, MdEvent, MdPets, MdEqualizer } from "react-icons/md";
import "./home.css";
import { HomeDash } from "../../components/HomeDash";
import { ListResponsavel } from "../../components/ListResponsavel";
import { useState } from "react";

const Div = styled('div', {

});

interface principalProps {
    page:String,
}

const Principal = (props:principalProps) => {
    switch (props.page) {
        case "home":
            return <HomeDash />
            break;
        case "listResponsavel":
            return <ListResponsavel />
            break;  
    
        default:
            return <HomeDash />
            break;
    }
}

export function Home () {
    const [showPage, setShowPage] = useState<String>("home");

    return (
            <Div id="body">
                <AppHeader clickMenu={(e,page) => setShowPage(page)} />

                <Div id="aside">
                    <Div id="button" title="Nova consulta">
                        <span>+ </span>
                        <MdHealthAndSafety size={25} />
                    </Div>
                    <Div id="button" title="Nova receita">
                        <span>+ </span>
                        <MdAssignment size={25} />
                    </Div>
                    <Div id="button" title="Novo cliente">
                        <span>+ </span>
                        <MdAssignmentInd size={25} />
                    </Div>
                    <Div id="button" title="Novo pet">
                        <span>+ </span>
                        <MdPets size={25}/>
                    </Div>
                    <Div id="button" title="Nova agenda">
                        <span></span>
                        <MdEvent size={25} />
                    </Div>
                    <Div id="button" title="Relatórios">
                        <span></span>
                        <MdEqualizer size={25} />
                    </Div>
                </Div>

                <Div id="main">
                    <Principal page={showPage}/>
                </Div>

                <Div id="footer">
                    Created by Marcelo G Botelho
                </Div>
            </Div>
    ) 
}