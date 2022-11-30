import { AppHeader } from "../../components/AppHeader";
import { styled } from "@stitches/react";
import { MdHealthAndSafety, MdAssignment, MdAssignmentInd, MdEvent, MdPets, MdEqualizer } from "react-icons/md";
import "./home.css";
import { HomeDash } from "../HomeDash";
import { FormCadResponsavel } from "../../components/FormCadResponsavel";
import { ListResponsavel } from "../../components/ListResponsavel";

const Div = styled('div', {

});

export function Home () {
    return (
            <Div id="body">
                <AppHeader />

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
                    {/* <HomeDash />  */}
                    <ListResponsavel />
                    {/* <FormCadResponsavel /> */}
                </Div>

                <Div id="footer">
                    Created by Marcelo G Botelho
                </Div>
            </Div>
    ) 
}