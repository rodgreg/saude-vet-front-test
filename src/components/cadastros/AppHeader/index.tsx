import React, {useState} from 'react';
import { styled } from "@stitches/react";
import './appHeader.css';
import { LinkButton } from '../../utils/HtmlComponents';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { DropDown } from '../../utils/DropDown';

interface menuProps {
    clickMenu: (event: React.MouseEvent<HTMLButtonElement>, page: String) => void;
}

export function AppHeader(props:menuProps) {

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
    };

    const selectMenu = (e:React.MouseEvent<HTMLButtonElement> ,page:String) => {
        props.clickMenu(e,page);
    };

    return (
        <Div id="header">
            <a href="#" id="logo"></a>
            <span id="nome_empresa">SaúdeVET</span>
            <button id="openMenu" onClick={showMenuButton}>&#9776;</button>
            <Div id="nav" >
                <button id="closeMenu" onClick={showMenuButton}>X</button>
                <LinkButton onClick={(e) => selectMenu(e,"home")}>Início</LinkButton>
                <DropDown label={"Novo"}
                            content={() => [<li key={0} value={"pet"}><button style={{width:'100%',height:'100%'}} onClick={(e) => {selectMenu(e,"cadPet");}}>Pet</button></li>,
                                            <li key={1} value={"vet"}><button style={{width:'100%',height:'100%'}} onClick={(e) => {selectMenu(e,"cadVeterinario");}}>Veterinário</button></li>,
                                            <li key={2} value={"resp"}><button style={{width:'100%',height:'100%'}} onClick={(e) => {selectMenu(e,"cadResponsavel");}}>Responsável</button></li>]}
                    key={"DropDown-1"} />
                <div style={{height:30, width:30, borderRadius:30 ,backgroundColor:'#eeeeee', marginRight:15, marginLeft:15}} />
            </Div>
        </Div> 
    )
}