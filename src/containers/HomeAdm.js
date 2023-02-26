import React, { useState }  from 'react';
import { Helmet } from 'react-helmet';

import CadastroForm from '../components/cadastroForm';
import Header from '../components/header';
import PesquisaForm from '../components/pesquisaForm';

import '../css/style.css';

const Home = () => {
    const [triggerGetUsuarios,setTriggerGetUsuarios] = useState();
    const [nome,setNome] = useState("");

    return (
        //<div class='grid grid-template' id='Home'>
        <>
        <Helmet>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Home ADM</title>
        </Helmet>

        <div className="container" id='home'>
            <div className='row'>
                <Header/>
            </div>
            <h1>Bem-Vindo!</h1>
            <div className='row' id='container-home'>
                
                <CadastroForm
                    setTriggerGetUsuarios={setTriggerGetUsuarios} 
                    setNome={setNome}
                    className="grid-5"
                >
                </CadastroForm>
                <PesquisaForm 
                    triggerGetUsuarios={triggerGetUsuarios} 
                    className='grid-5'
                    nome={nome}
                    setNome={setNome}
                ></PesquisaForm>
            </div>
        </div>
        </>
    )
}

export default Home;