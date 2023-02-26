import React from 'react';

const EditarTreinoUi = ({atributos, 
    nome, 
    series, 
    repeticoes, 
    repeticoesFeitas,
    carga,
    cargaAlcancada,
    onSubmit, 
    salvar,
    handleChange

}) => {
    return(
        <div className='editar-exercicio'>

        <form onSubmit={onSubmit} className="opcoes-container display-block" ref={atributos}>
            <textarea
                disabled
                placeholder={nome} 
                id="nome"
                className="name-input" 
                value={nome}
                onChange={handleChange}
            />
            <label data-serie='Series'>
                <input 
                    disabled
                    id="series"
                    placeholder={series}  
                    value={series}
                    onChange={handleChange}
                />
            </label>
            <label data-repeticoes='Repetições'>
            <input 
                disabled    
                id="repeticoes"
                placeholder={repeticoes}  
                value={repeticoes}
                onChange={handleChange}
            />
            </label>
            
            <label data-carga='Carga'>
                <input 
                    id="carga"
                    placeholder={carga}  
                    value={carga}
                    onChange={handleChange}
                />
            </label>
            <label data-cargaalcan='Carga Alcançada'>
                <input 
                    id="cargaAlcancada"
                    placeholder={cargaAlcancada}  
                    value={cargaAlcancada}
                    onChange={handleChange}
                />
            </label>
            <label data-repeticoesf='Repetições Feitas'>
                <input 
                    id="repeticoesFeitas"
                    placeholder={repeticoesFeitas}  
                    value={repeticoesFeitas}
                    onChange={handleChange}
                />
            </label>

        </form>
                    
        <div className="container-buttons">
                <button onClick={salvar}>
                    Salvar
                </button>
            </div>
    </div>
    
    )
}

export default EditarTreinoUi;