import React from "react";

import { useEffect, useRef, useState } from "react";
import requests from '../../constants/requests';
import useFetch from '../../customHooks/useFetch';
import EditarTreinoUi from "./editarTreinoUi";
import TratamentoErros from "../../utils/tratamentoErros";
import Mensagem from "../mensagem";
const EditarTreino = ({exercicio, setReloadPopup}) => {
    const atributos = useRef();
    const putData = useRef(false);
    let timeOutRef = useRef();

    const [updateRequest, setUpdateRequest] = useState(0);
    
    const [form,setForm] = useState({
        carga: "",
        cargaAlcancada: "",
        repeticoesFeitas: ""
    })

    const {data, loading, error, request} = useFetch();
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const initiValues = {
            carga: exercicio.carga,
            cargaAlcancada: exercicio.cargaAlcancada,
            repeticoesFeitas: exercicio.repeticoesFeitas
        }

        setForm(initiValues)
    },[])

     useEffect(() => {
        if(putData.current){
            const body = form;
            const options = {
                'method':'PUT',
                'headers':{
                    'Content-Type':'application/json',
                    'x-auth-token':localStorage.getItem('token')
                },
                'body':JSON.stringify(body)
            }
            request(requests.PUT_EXERCICIO(exercicio._id), options)
        }
    },[updateRequest])

    useEffect(() => {
        console.log(data)
        if(data && data.exercicio && data.exercicio._id){
            setMensagem("Exercicio atualizado com sucesso!")
            clearInterval(timeOutRef.current)

            timeOutRef.current = setTimeout(() => {
                setMensagem(null)
            }, 1500)
        }
    },[data])

    useEffect(() => {
        if(error){
            setMensagem(new TratamentoErros(error).mensagemErro())
    
            clearTimeout(timeOutRef.current)
            timeOutRef.current = setTimeout(() => {
                setMensagem(null);
            }, 2500)
          }
        console.log(error)
    },[error])

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const salvar = () => {
        putData.current = true;
        atributos.current.reset()
        setUpdateRequest(updateRequest => updateRequest + 1);
    }

    function handleChange({ target }) {
        const { id, value } = target;     
        console.log(id, value)   
        setForm({ ...form, [id]: value });
    }

    useEffect(() => {
      //  console.log(form)
    },[form])
    
    return(
        <>
            {error && mensagem && <Mensagem tipo='danger' conteudo={`${mensagem}`}/>}
            {data && mensagem && <Mensagem tipo='sucess' conteudo={mensagem} />}
            <EditarTreinoUi
                key={exercicio._id}
                atributos={atributos} 
                nome={exercicio.nome} 
                repeticoes={exercicio.repeticoes}
                series={exercicio.series}

                repeticoesFeitas={form.repeticoesFeitas}
                carga={form.carga}
                cargaAlcancada={form.cargaAlcancada}
                
                salvar={salvar}
                onSubmit={onSubmit}
                handleChange={handleChange}
            />
        </>
        
        
    )
}

export default EditarTreino;