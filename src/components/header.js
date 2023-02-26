import React from "react";
import JWT from 'jsonwebtoken';
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./button";


const Header = () => {
    const navigate = useNavigate();

    const toHome = () => {
        const token = localStorage.getItem('token');

        const payload = JWT.decode(token);

        if(payload.role && payload.role.toUpperCase() === 'ADM'){
            return '/adm'
        }else{
            return `/usuario/${payload.id}`
        }
    }

    const deslogar = () => {
        localStorage.clear();
        navigate('/login')
    }
    return(

        <header className='container' id="Header">
            <section id="logo" className="grid-6">
                <NavLink end to={toHome()}>Logo da empresa</NavLink>
            </section>
            <section id='logoff' className="grid-6">
                <Button onClick={deslogar} titulo='Sair'/>
            </section>
        </header>
    )
}

export default Header;