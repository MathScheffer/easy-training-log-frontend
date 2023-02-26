import React, { useEffect, useRef, useState } from "react";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import RotinaUsuario from "../components/Usuario/rotinaUsuario";
import PopupRotinaUsuario from "../components/Usuario/popupRotinaUsuario";
import Header from "../components/header";
import useFetch from "../customHooks/useFetch";
import { Helmet } from "react-helmet";
import TratamentoErros from "../utils/tratamentoErros";
import Mensagem from "../components/mensagem";
import Requests from '../constants/requests';
import PrivateRoute from "../components/PrivateRoute";

const HomeUsuario = () => {
    const params = useParams();
    let timeOutRef = useRef();

    const [usuario, setUsuario] = useState();
    const [reload, setReload] = useState(0);
    const {data, loading, error, request } = useFetch();
    const [mensagem, setMensagem] = useState();
    let doRequest = useRef(true);

    useEffect(() => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        }
        
        if(doRequest.current){
            request(Requests.GET_USUARIO_BY_ID(params.id), options)    
        }
        doRequest = false
    },[request])

    useEffect(() => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        }
        
        if(doRequest.current){
            console.log("realizando update maroto")
            request(Requests.GET_USUARIO_BY_ID(params.id), options)    
            
        }
    },[reload])

    useEffect(() => {
        setUsuario(data)
        console.log("Rotina no EditarUsuario")
        console.log(usuario)
    },[data])

    useEffect(()  => {
        if(error){
            setMensagem(new TratamentoErros(error).mensagemErro());

            clearTimeout(timeOutRef.current)

            timeOutRef.current = setTimeout(() => {
                
                setMensagem(null);
            },1500)
        }
    },error)

    return(
        <>
        {error && mensagem && <Mensagem tipo="danger" conteudo={mensagem}/>}
        <Helmet>
        <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Home User</title>
        </Helmet>
        <section className="container">
            <div className="row"><Header /></div>
            {usuario &&
        <>
        <RotinaUsuario nome={usuario.nome} rotina={usuario.rotina}/>

        <Routes>
           
                <Route 
                    path='rotina/:id_rotina' 
                    element={
                        <PrivateRoute role='USER'>
                            <PopupRotinaUsuario setReload={setReload}/>
                        </PrivateRoute>
                    }/>
        </Routes>
        
        
        </>
        }
        </section>
        
        
        
        </>
    )
}

export default HomeUsuario;