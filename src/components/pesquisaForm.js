import React from 'react';

import requests from '../constants/requests';

import useFetch from "../customHooks/useFetch";
import { useEffect, useRef, useState} from "react"; 
import Button from "./button";
import { NavLink } from "react-router-dom";
import ResultadoPesquisa from "./resultadoPesquisa";
import TratamentoErros from '../utils/tratamentoErros';
import Mensagem from './mensagem';

const PesquisaForm = ({triggerGetUsuarios, nome, setNome,...props}) => {
    let doDelete = useRef(false);

    let timeOutRef = useRef();

    const { data, loading, error, request } = useFetch();
  
    const [usuarios, setUsuarios] = useState([]);

    const [idUsuarioForDelete, setIdUsuarioForDelete] = useState();
    const [doDeleteIncrem, setDoDeleteIncrem] = useState(0);
    const [mensagem, setMensagem] = useState();

    useEffect(() => {
        const options = {
            headers: {
                "contentType":"application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        request(requests.GET_USUARIO_BY_NOME(nome), options)

    },[nome,triggerGetUsuarios]) 

    useEffect(() =>{
        if(error){
            console.log(error)
            setMensagem(new TratamentoErros(error).mensagemErro());
            clearTimeout(timeOutRef.current)

            timeOutRef.current = setTimeout(() => {
                setMensagem(null);
            }, 1500)
        }
        
    },[error])

    useEffect(() => {
        console.log(mensagem)
    },[mensagem])

    useEffect(() => {
        if(doDelete && idUsuarioForDelete) {

            const options = {
                'method':'DELETE',
                'headers':{
                    'Content-Type':'application/json',
                    'x-auth-token':localStorage.getItem('token')
                }
            }
            request(requests.DELETE_USUARIO(idUsuarioForDelete), options).then(resp => {
                console.log(resp)
            })
        }
    },[idUsuarioForDelete, doDeleteIncrem])
    
   useEffect(() => {
        if(data && data.length >= 0) {
            setUsuarios(data)

        }else if(data && data.message === 'Usuario excluido com sucesso!'){

            let newUsuarios = usuarios;
            let indexesUsuario = newUsuarios.map(usuario => usuario._id)

            newUsuarios.splice(indexesUsuario.indexOf(idUsuarioForDelete), 1)

            setUsuarios([...newUsuarios])
        }
        
    },[data]) 


    const handleChange = ({target}) => {
        setNome(target.value)
    } 

    const excluirUsuario = (idUsuario) => {
        setIdUsuarioForDelete(idUsuario);
        setDoDeleteIncrem( doDeleteIncrem => doDeleteIncrem + 1);
        
        doDelete = true;
    }

    return(
        <>
        {error && mensagem && <Mensagem conteudo={mensagem} tipo='danger'/>}
        <div  {...props}>
            <section id="pesquisa-form">
                <h2>Pesquisar Aluno</h2>
                <form action="">
                    <input 
                        value={nome}
                        onChange={handleChange}
                        type="search"
                        name="search" 
                        placeholder="nome" />
                </form>
                
                <ResultadoPesquisa 
                    usuarios={usuarios}
                    excluirUsuario={excluirUsuario}
                />
                
            </section>
            
        </div>
        </>
    )
}

export default PesquisaForm;