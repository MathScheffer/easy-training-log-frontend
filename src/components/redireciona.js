import React from "react";
import Button from "./button";

const Redireciona = () => {

    const limparToken = () => {
        localStorage.clear()
    }
    return(
        <section id="redirecionar">
            <h1>Você não possui permissão para acessar este conteúdo OU seu token expirou.</h1>

            <Button 
                onClick={limparToken}
                titulo='Logar novamente' 
                type='link'
                url='/login'
            />
        </section>
    )
}

export default Redireciona