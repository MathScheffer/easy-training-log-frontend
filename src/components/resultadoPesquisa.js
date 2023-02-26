import React from "react"


import Button from "./button"
import ResultadoPesquisaUi from "./resultadoPesquisaUI"
const ResultadoPesquisa = ({usuarios, excluirUsuario}) => {

    const renderResultadoPesquisaUi =() => {

        if(usuarios){
            return usuarios.map(usuario =>{
               return (
                    <ResultadoPesquisaUi 
                        key={usuario._id}
                        usuario={usuario}
                        excluirUsuario={excluirUsuario}
                    />
                )
            })
        }
        
    }

    return (
        <div id="resultado">
            <ul>
                { renderResultadoPesquisaUi() }
            </ul>
        </div>
    )
}

export default ResultadoPesquisa