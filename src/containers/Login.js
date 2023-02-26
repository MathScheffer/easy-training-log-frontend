import React, { useEffect, useRef, useState }  from 'react';
import LoginFormUi from '../components/loginFormUi';
import useFetch from '../customHooks/useFetch';
import Utils from '../utils/Utils';
import requests from '../constants/requests'
import JWT from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { clearTimeout } from 'timers';
import Mensagem from '../components/mensagem';

const Login = () => {
    const canLogin = useRef(false);
    const navigate = useNavigate();

    const [loginTrigger, setLoginTrigger] = useState(0);
    const [mensagem, setMensagem] = useState();
    let timeOutRef = useRef();
    const {data, loading, error, request} = useFetch()
    const [form, setForm] = useState({
        usuario: '',
        senha: ''
    });

    useEffect(() => {
        if(canLogin.current){
            let body = Utils.imparChavesVazias(form);
            body.usuario = Utils.montarNomeUsuario(body.usuario)

            const options = {
                'method':'POST',
                'headers':{
                    'Content-Type':'application/json'
                },
                'body': JSON.stringify(body)
            }
    
            request(requests.POST_TOKEN(), options)
        }
    },[loginTrigger])

    useEffect(() => {
        console.log(data)
        if(data && data.token){
            localStorage.setItem('token',data.token)

            JWT.verify(data.token,'encryptor', (err, payload) => {
                if(payload.role && payload.role.toUpperCase() === 'ADM') {
                    navigate("/adm")
                }else{
                    navigate(`/usuario/${payload.id}`)
                }
            })
            
        }
    }, [data])

    useEffect(() => {
        console.log(error)
        if(error && error.erro){
            setMensagem(error.erro)
            clearTimeout(timeOutRef.current)
            timeOutRef.current = setTimeout(() => {
                setMensagem(null);
            }, 3500)
        }
    },[error])
    
    useEffect(() => {
        console.log(form)
    },[form])

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = ({target}) => {
        const {id, value} = target;
            
        setForm({ ...form, [id]: value });
    }

    const logar = () => {
        canLogin.current = true;
        setLoginTrigger(loginTrigger => loginTrigger + 1);
    }

    return (
        <>
            {error && mensagem &&  <Mensagem tipo='danger' conteudo={mensagem}/>}
            <Helmet>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Login</title>
            </Helmet>

            <LoginFormUi
                handleChange={handleChange}
                onSubmit={onSubmit}
                usuario={form.usuario}
                senha={form.senha}
                logar={logar}
            ></LoginFormUi>
        </>
    )
}

export default Login;