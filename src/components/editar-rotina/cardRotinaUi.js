import React from 'react';

import excluir from '../../assets/excluir-4.png'

import { Link, useNavigate } from "react-router-dom";
import EditarRotinaContext from "./editarRotinaContext";

const CardRotinaUi = ({rotina}) => {
    const navigate = useNavigate();


    const goTo = () => {
        navigate(`rotina/${rotina._id}`)
    }

    return(
        <div className='card-rotina-container' onClick={goTo}>
            <div className="card-rotina">
                <div className="centro">
                    <Link to={`rotina/${rotina._id}`}>{rotina.dia}</Link>
                </div>
            </div>
        </div>
    )
}

export default CardRotinaUi;