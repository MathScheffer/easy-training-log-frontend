import React from "react";

import { useContext, useEffect, useRef, useState } from "react";
import EditarTreino from "./editarTreino";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";

import requests from '../../constants/requests';
import { Helmet } from "react-helmet";
import Mensagem from "../mensagem";

const PopupEditarRotina = ({setReload}) => {
    const navigate = useNavigate();

    const modalContainer = useRef();
    const botaoFechar = useRef();
    let timeOutRef = useRef();

    const params = useParams()

    const [rotinaAtual, setRotinaAtual] = useState();
    const [modalAtivo, setModalAtivo] = useState(true)
    const [formsAddList, setFormsAddList] = useState([]);
    const [reloadPopup, setReloadPopup] = useState(0);
    const [mensagem, setMensagem] = useState();

    const {data, loading, error, request} = useFetch();

    useEffect(() => {
        const options = {
            headers: {
                'content-type':'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        }
        request(requests.GET_ROTINA(params.id_rotina), options)
    },[reloadPopup])

    useEffect(() => {
       setRotinaAtual(data)
        
    },[data])

    useEffect(() => {
        if(error){
            if(error.erro){
                setMensagem(error.erro)

                clearTimeout(timeOutRef.current)

                timeOutRef.current = setTimeout(() => {
                    setMensagem(null)
                },1500)
            }
        }
    },[error])

    const fecharModal = ({target}) => {
        if(target == modalContainer.current || 
            target == botaoFechar.current ){
            setModalAtivo(false);
            setFormsAddList([]);
            navigate("/usuario/" + params.id)
        }
    }
    
return(
    <>
    {error && mensagem && <Mensagem conteudo={mensagem} tipo='danger'/>}
    <Helmet>
    <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Editar Treino - Usuario</title>
    </Helmet>
    {(modalAtivo && rotinaAtual) && 
    <section id='modal-editar'  onClick={fecharModal} ref={modalContainer}> 
        <div className="container">
            <div className="row">
                <div className="popup-container-elements">
                <h1>{rotinaAtual.dia}</h1>
                </div>
            </div>

            <div className="row">
                {rotinaAtual.exercicios && rotinaAtual.exercicios.map( exercicio => {
                return <EditarTreino
                        //parâmetro KEY é extremamente obrigatório passar para o react reconhecer
                        //as mudanças!
                            key={exercicio._id}
                            exercicio={exercicio} 
                            setReloadPopup={setReloadPopup}
                        ></EditarTreino>
                    })
                }
            </div>

            <div className="row">
                 <div className="popup-container-elements">
                    <div className="grid-6">
                        <button ref={botaoFechar}>Fechar</button>   
                    </div>
                    <div className="grid-6">
                        <button>Imprimir</button>   
                    </div>
                </div>
            </div>
        </div>
    </section>
    }   
    </>   
)}

export default PopupEditarRotina;