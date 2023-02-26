import React from "react";
import { useEffect, useRef, useState } from "react";
import useFetch from "../customHooks/useFetch";
import Mensagem from "./mensagem";
import TratamentoErros from '../utils/tratamentoErros';
import Utils from '../utils/Utils';

const CadastroForm = ({setTriggerGetUsuarios, setNome, ...props}) => {

    const { data, loading, error, request, setError } = useFetch();
    const [submitTrigger, setSubmitTrigger] = useState();
    const [mensagem, setMensagem] = useState('');


    let doRequest = useRef(false);
    const formRef = useRef();
    let timeOutRef = useRef();

    const [form,setForm] = useState({
        nome:""    ,
        sobrenome:"",
        idade:"",
        peso:'',
        objetivo:'',
        whatsapp:'',
        senha:'',
        role:''
    })

    useEffect(() => {
        const URL = "http://localhost:3000/api/usuarios/";
        const body = form;
        const options = {
            'method':'POST',
            'headers':{
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            'body':JSON.stringify(body)
        }
        if(doRequest.current===true){
            request(URL,options)
        }
        
     //   return() => {doRequest = false}
        //console.log(doRequest.current)
    },[submitTrigger])


    useEffect(() => {
       console.log(data)
       if(data && data._id){
            formRef.current.reset()
            setMensagem("Usuário adicionado com sucesso!")
            setNome(form.nome);
            clearTimeout(timeOutRef.current)
            timeOutRef.current = setTimeout(() => {
                setMensagem(null)
            },1500)
       }
    },[data])

    useEffect(() => {
      if(error){
        setMensagem(new TratamentoErros(error).mensagemErro())
        clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            setMensagem(null);
        }, 3500)
      }
      console.log(error)
    },error)

    useEffect(() =>{
        console.log(form);
    },[form])
    


    function handleSubmit(event) {
        event.preventDefault();
        console.log(form);

        let novoNome = form.nome.trim().split(" ").length > 1 ? form.nome.trim().split(" ")[0] : form.nome.trim()
        
        novoNome = novoNome.trim()  + " " + form.sobrenome.trim();
        novoNome = Utils.montarNomeUsuario(novoNome)
        
        const senha = form.nome + "." + form.sobrenome;
        

        setForm((form) => {
            const novoForm = form
            novoForm.senha = senha.toLowerCase()
            novoForm.nome = novoNome

            return novoForm
        })

        setSubmitTrigger((submitTrigger) => submitTrigger !== undefined ? submitTrigger + 1 : 1);
        setTriggerGetUsuarios((triggerGetUsuarios) => triggerGetUsuarios + 1 );


        doRequest.current = true;
    }

    function handleChange({ target }) {
        const { id, value } = target;
        setForm({ ...form, [id]: value });
    }


    return(
        <div  {...props}>
            {error && mensagem && <Mensagem tipo='danger' conteudo={`${mensagem}`}/>
            }
            {data && mensagem && <Mensagem tipo='sucess' conteudo={mensagem} />}
            <section id="cadastro-form">
                <h2>Cadastrar Aluno</h2>

                <form onSubmit={handleSubmit} ref={formRef}>
                    <input onChange={handleChange} required type="text" id="nome"     name="nome"     placeholder="nome" />
                    <input onChange={handleChange} required type="text" id="sobrenome"     name="sobrenome"     placeholder="sobrenome" />
                    <input onChange={handleChange} required type="text" id="idade"    name="idade"    placeholder="idade"/>
                    <input onChange={handleChange} required type="text" id="peso"     name="peso"     placeholder="peso"/>
                    <input onChange={handleChange} required type="text" id="objetivo" name="objetivo" placeholder="objetivo"/>
                    <input onChange={handleChange} required type='text' id='whatsapp' name='whatsapp' placeholder="Whatsapp"/>
                    <input onChange={handleChange} required type='text' id='role' name='atributo' placeholder="Atributo"/>

                    <button>Cadastrar</button>
                </form>
                
                {loading && <p>Carregando</p>}
            </section>
        </div>
    )
}

export default CadastroForm;