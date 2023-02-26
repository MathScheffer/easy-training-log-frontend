import React from "react";

import { useContext, useEffect, useRef, useState } from "react";
import AdicionarExercicio from "./adicionarExercicio";
import ActionAdicionar from "./actionAdicionar";
import EditarExercicio from "./editarExercicio";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";

import requests from '../../constants/requests';
import { Helmet } from "react-helmet";
import TratamentoErros from "../../utils/tratamentoErros";
import Mensagem from "../mensagem";

const PopupEditarRotina = ({setReload}) => {
    const navigate = useNavigate();

    const modalContainer = useRef();
    const botaoFechar = useRef();
    const botaoExcluir = useRef();
    const isAddCard = useRef(false);
    const doApagarRotina = useRef(false);
    const doRetirarRotina = useRef(false);
    let timeOutRef = useRef();

    const params = useParams()

    const [rotinaAtual, setRotinaAtual] = useState();
    const [modalAtivo, setModalAtivo] = useState(true)
    const [addCard, setAddCard] = useState(0);
    const [cardIndex, setCardIndex] = useState();
    const [apagarRotina, setApagarRotina] = useState(0);
    const [apagarCard, setApagarCard] = useState(0);
    const [formsAddList, setFormsAddList] = useState([]);
    const [reloadPopup, setReloadPopup] = useState(0);
    const [idUsuario, setIdUsuario] = useState();
    const [mensagem, setMensagem] = useState();

    const {data, loading, error, request, setError} = useFetch();

    useEffect(() => {
        const options = {
            headers:
            {
                'content-type':'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        }
        request(requests.GET_ROTINA(params.id_rotina),options)
    },[reloadPopup])

    useEffect(() => {
       setRotinaAtual(data)
       console.log(data) 
    },[data])

    useEffect(() => {
            if(isAddCard.current){
                setFormsAddList([...formsAddList,
                        <AdicionarExercicio 
                        indexCard={formsAddList.length}
                        key={formsAddList.length}
                        apagarAddCard={apagarAddCard}
                        setReloadPopup={setReloadPopup}
                        idRotina={params.id_rotina}
                        setMensagem={setMensagem}
                        setError={setError}
                    ></AdicionarExercicio>])
            }  
    }, [addCard])

    useEffect(() => {
        console.log(cardIndex)
        let newCards = formsAddList;
        let indexCardsArray = newCards.map(card => card.props.indexCard)

        newCards.splice(indexCardsArray.indexOf(cardIndex), 1)

        setFormsAddList([...newCards])
    }, [apagarCard])


    useEffect(() => {
        if(doApagarRotina.current){
            console.log("Entrou no hook de deletar a rotina")
            const options = {
                'method':'DELETE',
                'headers':{
                    'Content-Type':'application/json',
                    'x-auth-token': localStorage.getItem('token'),

                }
            }
            request(requests.DELETE_ROTINA(rotinaAtual._id), options)
                .then(resp => {
                    console.log(resp)
                    if(resp.response.ok){

                        setModalAtivo(false);
                        setFormsAddList([]);
                        setReload(reload => reload + 1);

                        setMensagem('Rotina excluida com sucesso!')

                        clearTimeout(timeOutRef.current)

                        timeOutRef.current = setTimeout(() => {
                            setMensagem(null)
                            navigate("/editar/" + params.id +"/")
                        },1500)
                        
                    }
                })
        }
    },[apagarRotina])

    useEffect(() => {
        if(doRetirarRotina.current) {
            console.log("Entrou no hook de deletar a rotina do usuario")
            const body = {
                rotina: rotinaAtual._id
            }

            const options = {
                'method':'PUT',
                'headers':{
                    'Content-Type':'application/json',
                    'x-auth-token':localStorage.getItem('token')
                },
                'body': JSON.stringify(body)
            }
            request(requests.PUT_USUARIO_DECREMENTAR_ROTINA(idUsuario), options)
                .then(resp => {
                    console.log(resp)
                    if(resp.response.ok){
                        console.log(resp.json);
                        console.log("retirou a rotina do usuario!")
                        doApagarRotina.current = true;
                        setApagarRotina(apagarRotina => apagarRotina + 1)
                    }
                })
        }
    },[idUsuario])

    useEffect(() => {
        if(error){
            console.log(error)
            if(error.erro && error.erro.includes('Necessario informar o token') || error.message){

                setMensagem(new TratamentoErros(error).mensagemErro())
                console.log(new TratamentoErros(error).mensagemErro())

                clearTimeout(timeOutRef.current)

                timeOutRef.current = setTimeout(() => {
                    setMensagem(null)
                },1500)
            }
        }
        
    }, [error])

    const apagarAddCard = (index) => {
        setCardIndex(index)
        setApagarCard(apagarCard => apagarCard + 1)
        //navigate("/editar/" + params.id)
    }

    const apagarRotinaClick = () => {


        doRetirarRotina.current = true;
        setIdUsuario(rotinaAtual.usuario);
    }

    const fecharModal = ({target}) => {
        if(target == modalContainer.current || 
            target == botaoFechar.current ){
            setModalAtivo(false);
            setFormsAddList([]);
            navigate("/editar/" + params.id)
        }
    }
    
return(
    <>
    

    {error && mensagem && <Mensagem tipo='danger' conteudo={`${mensagem}`}/>
            }
    {(data && mensagem && !error) && <Mensagem conteudo={mensagem} tipo='sucess'/> }

    <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Editar Rotina</title>
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
                return <EditarExercicio 
                //parâmetro KEY é extremamente obrigatório passar para o react reconhecer
                //as mudanças!
                    key={exercicio._id}
                    exercicio={exercicio} 
                    setReloadPopup={setReloadPopup}
                ></EditarExercicio>
            })}
                {
                    formsAddList
                }
                
                <ActionAdicionar 
                    isAddCard={isAddCard}
                    setAddCard={setAddCard}
                    cardType='card-adicionar-exercicio'
                ></ActionAdicionar>
            </div>

            <div className="row">
                 <div className="popup-container-elements">
                    <div className="grid-4">
                        <button ref={botaoFechar}>Fechar</button>   
                    </div>
                    <div className="grid-4">
                        <button>Imprimir</button>   
                    </div>
                    <div className="grid-4">
                        <button  onClick={apagarRotinaClick}>Excluir</button>   
                    </div>
                </div>
            </div>
        </div>
    </section>
    }   
    </>   
)}

export default PopupEditarRotina;