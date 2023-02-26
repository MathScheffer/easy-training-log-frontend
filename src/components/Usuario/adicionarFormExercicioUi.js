import React from 'react';

import excluir from '../../assets/excluir-4.png'

const AdicionarExercicioUi = ({atributos, 
    nome, 
    series, 
    repeticoes, 
    onSubmit, 
    salvar,
    apagarCard,
    handleChange
}) => {
    return(
        <div className='adicionar-exercicio'>
            
        <button onClick={apagarCard} className="apagar-adicionar-exercicio-card">
            <img src={excluir} alt="" />
        </button>
        
        <form onSubmit={onSubmit} className="opcoes-container display-block" ref={atributos}>
            <textarea 
                required
                id="nome"
                className="name-input" 
                value={nome}
                onChange={handleChange}
            />

            <label data-serie='Series'>
                <input 
                    id="series"
                    placeholder={series}  
                    value={series}
                    onChange={handleChange}
                />
            </label>
            <label data-repeticoes='Repetições'>
                <input 
                    id="repeticoes"
                    placeholder={repeticoes}  
                    value={repeticoes}
                    onChange={handleChange}
                />
            </label>

            <button onClick={salvar}>Salvar</button>
        </form>
    </div>
    
    )
}

export default AdicionarExercicioUi;