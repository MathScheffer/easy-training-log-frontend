import React from 'react';

import requests from '../../constants/requests';
import Utils from '../../utils/Utils';
import AdicionarExercicioUi from "./adicionarFormExercicioUi";
import useFetch from '../../customHooks/useFetch';
import { useEffect, useRef, useState } from "react";
import TratamentoErros from '../../utils/tratamentoErros';
import Mensagem from '../mensagem';

const AdicionarExercicio = ({indexCard, apagarAddCard, idRotina, setReloadPopup, setMensagem, setError}) => {
    const atributos = useRef()
    const doRequest = useRef(false);
    let timeOutRef = useRef();

    const {data, loading, error, request} = useFetch();
    const [addRequest, setAddRequest] = useState(0);

    const [form,setForm] = useState({})

    useEffect(() => {
        console.log(idRotina)
    },[idRotina])

    useEffect(() => {
        const body = Utils.imparChavesVazias(form)
        //console.log(body)

        const options = {
            'method':'PUT',
            'headers':{
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            'body':JSON.stringify(body)
        }
        if(doRequest.current){
            request(requests.PUT_ADD_EXERCICIO(idRotina), options)
            .then(response => {
                if(response.response.ok){
                    apagarAddCard(indexCard)
                    setReloadPopup(reload => reload + 1)
                }
            })
        }
    },[addRequest])

    useEffect(() => {
        console.log(data)
        if(data && data.message && data.message.includes('Rotina atualizada com sucesso!')){
            setMensagem(data.message)

            clearTimeout(timeOutRef.current)

            timeOutRef.current = setTimeout(() => {
                setMensagem(null)
            },1500)
        }
    },[data])

    useEffect(() => {
        if(error){
            setError(error)
        }
    },[error])

    useEffect(() => {
        console.log(indexCard)
    }, [indexCard])

    useEffect(() => {
       // console.log(form)
    },[form])
    
//apaga este componente
    const apagarCard = () => {
        apagarAddCard(indexCard)
    }
    
    const handleChange = ({ target }) => {
        const { id, value } = target;        
        setForm({ ...form, [id]: value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const salvar = () => {
        doRequest.current = true;
        
        setAddRequest(addRequest => addRequest + 1);
    }

    return(
        <>

        <AdicionarExercicioUi  
            nome={form.nome}
            repeticoes={form.repeticoes}
            series={form.series}
            onSubmit={onSubmit}
            handleChange={handleChange}
            atributos={atributos} 
            salvar={salvar}
            apagarCard={apagarCard}
        ></AdicionarExercicioUi>

        </>
    )
}

export default AdicionarExercicio;