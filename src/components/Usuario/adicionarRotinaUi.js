import React from 'react'

import excluir from '../../assets/excluir-4.png'

const AdicionarRotinaUi =  ({atributos, 
    form, 
    onSubmit, 
    salvar,
    apagarCard,
    handleChange
}) => {
    return(
        <div className='adicionar-rotina'>
            
        <button onClick={apagarCard} className="apagar-adicionar-exercicio-card">
            <img src={excluir} alt="" />
        </button>
        
        <form onSubmit={onSubmit} className="opcoes-container display-block" ref={atributos}>
            <label data-serie='dia'>
                <input 
                    id="dia"
                    value={form.dia}
                    onChange={handleChange}
                />
            </label>
            <button onClick={salvar}>Salvar</button>
        </form>
    </div>
    
    )
}


export default AdicionarRotinaUi