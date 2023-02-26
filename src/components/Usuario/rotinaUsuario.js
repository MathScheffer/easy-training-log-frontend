import React from "react";

import CardRotinaUi from "./cardRotinaUi";
import OrdenacaoDias from "../../utils/ordenacaoDias";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

const RotinaUsuario = ({ nome,rotina }) => {
    const rotinaOrdenada = new OrdenacaoDias(rotina).getRotinaOrdenada();
    
    useEffect(() => {
        console.log("Rotina no RotinaUsuario")
        console.log(rotina)
        
    },[rotina])

    return(
        <>
        <Helmet>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Rotina Usuario</title>
        </Helmet>
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
        </div>
        </>
    )
}

export default RotinaUsuario;