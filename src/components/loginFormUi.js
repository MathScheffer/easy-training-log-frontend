import React  from 'react';
import '../css/style.css'

const LoginFormUi = ({handleChange, onSubmit, usuario, senha, logar}) => {

  return (
    <div className='container'>
        <section id="login-form">
            <div className='content'>
                <h1>Bem Vindo!</h1>

                <div className='form-login-container'>
                    <form className="loginForm" 
                    onSubmit={onSubmit}
                    >
                        <div className='input-container'>
                            <label htmlFor="usuario">Usuario</label>
                            <input 
                                required
                                id='usuario'
                                name="usuario" 
                                value={usuario}
                                placeholder='usuario'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor="senha">Senha</label>
                            <input 
                            required
                                id='senha'
                                name="senha" 
                                value={senha}
                                placeholder='senha'
                                onChange={handleChange}    
                            />
                        </div>
                        <button onClick={logar}>Logar</button>
                    </form>
                </div>
            </div>
        </section>
    </div>
  );
}

export default LoginFormUi;