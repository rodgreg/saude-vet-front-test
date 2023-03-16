import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputText, Label } from '../../components/utils/HtmlComponents';
import './login.css';

interface User {
    username:string;
    password:string;
}

export function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState<User>({username:"",password:""});

    const submitLogin = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasBlank = false;
        for (let i=0; i < e.target.length; i++) {
            if (e.target[i].getAttribute('value') === '' && e.target[i].getAttribute('name') !== '') {
              e.target[i].classList.add("shake")
              hasBlank = true;
            };
        };
        if (!hasBlank) {
            navigate("/home");
        }
    }

    const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("shake");
        setUser({...user,[e.target.name]:e.target.value});
    }

    return (
        <div className="login-container">
            <div className='login-form-container'>
                <form className='login-form' onSubmit={submitLogin}>
                    <img src='src\assets\Logo-exemplo.jpg' 
                        style={{height:80, width:180, objectFit: 'cover', objectPosition: 'center', borderRadius:5, border:'solid 1px var(--border-color)'}}
                    />
                    <div>
                        <Label htmlFor='username'>Username</Label><br/>
                        <InputText id='username' name='username' type={'text'} size={'medium'} value={user?.username} onChange={inputChange}/><br/>
                        <Label htmlFor='password'>Senha</Label><br/>
                        <InputText id='password' name='password' type={'password'} size={'medium'} value={user?.password} onChange={inputChange}/><br/>
                    </div>
                    <button type={'submit'}>Acessar</button>
                    <br/>
                    <a href='#'>Esqueceu sua senha?</a>
                </form>
            </div>
        </div>
    )
}