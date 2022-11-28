import React, {useState} from 'react';
import { styled } from "@stitches/react";
import './appHeader.css';

export function AppHeader() {

    const [showMenu, setShowMenu] = useState('none');

    const Div = styled('div', {
        '@media only screen and (max-width: 717px)': {
            '#nav': {
                    display:showMenu,
                },
            }
    });

    const showMenuButton = () => {
        if (showMenu=='none') {
            setShowMenu('fixed');
        } else {
            setShowMenu('none');
        }
    }

    return (
        <Div id="header">
            <a href="#" id="logo">LOGO</a>
            <button id="openMenu" onClick={showMenuButton}>&#9776;</button>
            <Div id="nav" >
                <button id="closeMenu" onClick={showMenuButton}>X</button>
                <a href="#">Início</a>
                <a href="#">Cadastros</a>
                <a href="#">Prontuários</a>
                <a href="#">Novo Atendimento</a>
            </Div>
        </Div> 
    )
}