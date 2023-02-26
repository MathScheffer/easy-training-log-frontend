import React from 'react';

import { useRef, useState, useEffect } from 'react'
import useFetch from '../../customHooks/useFetch';
import AdicionarRotinaUi from './adicionarRotinaUi'

import requests from '../../constants/requests';
import Utils from '../../utils/Utils';

const AdicionarRotina =  ({atributos, 
    idUsuario,
    setReload,
    indexCard,
    apagarAddCard

}) => {

    const doRequest = useRef(false);
    const doUserPutRequest = useRef(false);

    const {data, loading, error, request} = useFetch();

    const [form,setForm] = useState({
        usuario: idUsuario
    });

    const [addRequest, setAddRequest] = useState(0);
    const [idRotinaAdicionada, setIdRotinaAdicionada] = useState('');

    useEffect(() => {
        console.log(form)
    },[form])

    useEffect(() => {
        const body = Utils.imparChavesVazias(form)
        console.log(form)
        //console.log(body)
        const options = {
            'method':'POST',
            'headers':{
                'Content-Type':'application/json'
            },
            'body':JSON.stringify(body)
        }
        if(doRequest.current){
            request(requests.POST_ROTINA(), options)
            .then(response => {
                if(response.response.ok){
                    console.log(response.json._id)
                    
                    if(response.json._id){
                        console.log(response.json._id)
                        doUserPutRequest.current = true;
                        setIdRotinaAdicionada(idRotinaAdicionada => response.json._id)
                    }
                }
            })
        }
    },[addRequest])


    useEffect(() => {
        const body = {
            rotina: idRotinaAdicionada
        }

        const options = {
            'method':'PUT',
            'headers':{
                'Content-Type':'application/json'
            },
            'body':JSON.stringify(body)
        }

        console.log(options)
        if(doUserPutRequest.current){
            request(requests.PUT_USUARIO_INCREMENTAR_ROTINA(idUsuario), options)
                .then(resp => {
                    console.log(resp)
                    if(resp.response.ok){
                        console.log(resp.json)
                        setReload(reload => reload + 1)
                        apagarAddCard(indexCard)
                    }
                })
        }
    },[idRotinaAdicionada])

    useEffect(() => {
        console.log(data)
    },[data])

    useEffect(() => {
        console.log(error)
    },[error])

    //apaga este componente
    const apagarCard = () => {
        apagarAddCard(indexCard)
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = ({ target }) => {
        const { id, value } = target;        
        setForm({ ...form, [id]: value });
    }

    const salvar = () => {
        doRequest.current = true;
        
        setAddRequest(addRequest => addRequest + 1);
    }

    return(
        <AdicionarRotinaUi
            form={form}
            handleChange={handleChange}
            apagarCard={apagarCard}
            onClick={salvar}
            onSubmit={onSubmit}
            salvar={salvar}
        ></AdicionarRotinaUi>
    
    )
}


export default AdicionarRotina