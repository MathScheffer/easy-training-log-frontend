import React from 'react';

import cruz from '../../assets/cruz.png';
import excluir_img from '../../assets/excluir-2.png';
import salvar_img from '../../assets/salve-.png';

const EditarExercicioUi = ({atributos, 
    nome, 
    series, 
    repeticoes, 
    repeticoesFeitas,
    carga,
    cargaAlcancada,
    id,
    onSubmit, 
    salvar,
    excluir,
    handleChange
}) => {
    return(
        <div className='editar-exercicio'>

        <form onSubmit={onSubmit} className="opcoes-container display-block" ref={atributos}>
            <textarea
                placeholder={nome} 
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
                <button onClick={excluir}>
                    Excluir
                </button>
            </div>
    </div>
    
    )
}

export default EditarExercicioUi;