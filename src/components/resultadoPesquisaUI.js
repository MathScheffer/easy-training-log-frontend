import React from "react";

import Button from "./button";

const ResultadoPesquisaUi = ({usuario, excluirUsuario}) => {
    const excluir = () => {
        excluirUsuario(usuario._id)
    }

    return(
        <li key={usuario._id}>
            <span>{usuario.nome}</span> 
            <span>
                <Button 
                    type="link" 
                    url={`/editar/${usuario._id}`}
                    titulo="editar"
                />
                        
                <Button 
                    titulo="excluir"
                    onClick={excluir}
                />
            </span>
        </li>
    )
}

export default ResultadoPesquisaUi;