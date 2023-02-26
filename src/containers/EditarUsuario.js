import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import EditarRotina from "../components/editar-rotina/editarRotina";
import PopupEditarRotina from "../components/editar-rotina/popupEditarRotina";
import Header from "../components/header";
import Mensagem from "../components/mensagem";
import useFetch from "../customHooks/useFetch";
import TratamentoErros from "../utils/tratamentoErros";
import Requests from '../constants/requests';
import PrivateRoute from "../components/PrivateRoute";

const EditarUsuario = () => {
    const params = useParams();
    const [usuario, setUsuario] = useState();
    const [reload, setReload] = useState(0);
    const {data, loading, error, request } = useFetch();
    const [mensagem, setMensagem] = useState();

    let timeOutRef = useRef();

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
            <title>Editar Usuario</title>
        </Helmet>
        <section className="container">
            <div className="row"><Header /></div>
            {usuario &&
        <>
        <EditarRotina id={usuario._id} nome={usuario.nome} rotina={usuario.rotina} reload={reload} setReload={setReload}/>

        <Routes>
            <Route path='rotina/:id_rotina' element={
                <PrivateRoute role='ADM'>
                    <PopupEditarRotina setReload={setReload}/>
                </PrivateRoute>
            }/>
        </Routes>
        
        
        </>
        }
        </section>
        
        
        
        </>
    )
}

export default EditarUsuario;