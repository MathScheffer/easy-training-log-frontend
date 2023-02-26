import React from "react";

const Mensagem = ({tipo, conteudo}) => {

    return (
        <section id='mensagem' className={tipo}>
            <p>{conteudo}</p>
        </section>
    )
}

export default Mensagem;