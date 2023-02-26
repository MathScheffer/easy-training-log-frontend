import React from "react";

import CardRotinaUi from "./cardRotinaUi";
import OrdenacaoDias from "../../utils/ordenacaoDias";
import EditarRotinaContext from './editarRotinaContext';
import PopupEditarRotina from "./popupEditarRotina";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionAdicionar from "./actionAdicionar";
import AdicionarRotina from "./adicionarRotina";

const EditarRotina = ({id,nome,rotina, reload, setReload}) => {
    const rotinaOrdenada = new OrdenacaoDias(rotina).getRotinaOrdenada();

    const isAddCard = useRef(false);
    const [modalAtivo, setModalAtivo] = useState(false);
    const [apagarCard, setApagarCard] = useState(0);
    const [cardIndex, setCardIndex] = useState();
    const [addCard, setAddCard] = useState(0);
    const [formsAddList, setFormsAddList] = useState([]);

    useEffect(() => {
        console.log("Rotina no EditarRotina")
        console.log(rotina)
        
    },[rotina])

    useEffect(() => {
        if(isAddCard.current){
            setFormsAddList([...formsAddList,
                <AdicionarRotina
                    indexCard={formsAddList.length}
                    key={formsAddList.length}
                    apagarAddCard={apagarAddCard}
                    setReload={setReload}
                    idUsuario={id}
                ></AdicionarRotina>])
        }  
    }, [addCard])

    useEffect(() => {
        console.log(cardIndex)
        let newCards = formsAddList;
        let indexCardsArray = newCards.map(card => card.props.indexCard)

        newCards.splice(indexCardsArray.indexOf(cardIndex), 1)

        setFormsAddList([...newCards])
    }, [apagarCard])
    
    const apagarAddCard = (index) => {
        setCardIndex(index)
        setApagarCard(apagarCard => apagarCard + 1)
    }

    return(
        <>
        <h1>{nome}</h1>
        
        <div className="row card-container-rotina-row">
                {rotinaOrdenada ? 
                rotinaOrdenada.map(rotinaOrdenada => {
                    return (
                        <CardRotinaUi 
                            key={rotinaOrdenada._id} 
                            rotina={rotinaOrdenada}
                        />
                    )
                }) : rotina.map(rotina => {
                    return (
                        <CardRotinaUi 
                            key={rotina._id} 
                            rotina={rotina}
                        />
                    )
                })
                }
                {
                    formsAddList
                }
                <ActionAdicionar
                    isAddCard={isAddCard}
                    setAddCard={setAddCard}
                    cardType='card-adicionar-rotina'
                ></ActionAdicionar>
        </div>
        </>
    )
}

export default EditarRotina;