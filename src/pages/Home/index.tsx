import { AppHeader } from "../../components/AppHeader";
import { Tweet } from "../../components/Tweet";
import { styled } from "@stitches/react";
import "./home.css";

  const Div = styled('div', {

  });

export function Home () {

    return (
            <Div id="body">
                <AppHeader />
                <Div id="main">
                    <Tweet text={"Olá mundo!"}/>
                </Div>
                <Div id="aside">Aside</Div>
                <Div id="footer">Footer</Div>
            </Div>
    ) 
}