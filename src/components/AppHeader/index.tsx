import React, {useState} from 'react';
import { styled } from "@stitches/react";
import './appHeader.css';
import { LinkButton } from '../utils/HtmlComponents';
import { DropDown } from '../utils/DropDown';
import { MdHome } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';

interface menuProps {
    clickMenu: (event: React.MouseEvent<HTMLButtonElement>|null, page: String) => void;
}

export function AppHeader(props:menuProps) {

    const navigate = useNavigate();
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

    const selectMenu = (e:React.MouseEvent<HTMLButtonElement>|null ,page:String) => {
        
        switch (page) {
            case 'home':
                navigate('/home');
                break;
            case 'cadPet':
                navigate('/home?page=cadPet');
                break;
            case 'cadVeterinario':
                navigate('/home?page=cadVeterinario');
                break;
            case 'cadResponsavel':
                navigate('/home?page=cadResponsavel');
                break;
            default:
                navigate('/home');
                break;

        }
        props.clickMenu(e,page);
    };

    return (
        <Div id="header">
            <a href="/home" id="logo"></a>
            <span id="nome_empresa">SaúdeVET</span>
            <button id="openMenu" onClick={showMenuButton} >&#9776;</button>
            <Div id="nav" >
                <button id="closeMenu" onClick={showMenuButton}>X</button>
                <LinkButton onClick={(e) => selectMenu(e,"home")} title={'Início'} className="home-button"><MdHome size={24}/></LinkButton>
                <DropDown label={""} title={'Acesso Rápido'}
                            content={() => [<li key={0} value={"pet"} onClick={() => {selectMenu(null,"cadPet")}}>Pet</li>,
                                            <li key={1} value={"vet"} onClick={() => {selectMenu(null,"cadVeterinario");}}>Veterinário</li>,
                                            <li key={2} value={"resp"} onClick={() => {selectMenu(null,"cadResponsavel");}}>Responsável</li>]}
                    key={"DropDown-1"} />
                <div style={{height:30, width:30, borderRadius:30 ,backgroundColor:'#eeeeee', marginRight:15, marginLeft:15}} />
            </Div>
        </Div> 
    )
}