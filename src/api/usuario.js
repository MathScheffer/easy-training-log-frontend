import axios from 'axios';
const url = 'http://localhost:3000/api/rotinas/';

const _get = url => new Promise( (resolve, reject) => axios.get(url).then( res => resolve( res.data ) ) );
const _post = ( url, dados ) => new Promise( ( resolve, reject ) => axios.post( url, dados ).then( response => resolve( response.data ) ) );

export default class UsuarioAPI{
  listarUsuarios(){
    return _get(url);
  }

  adicionarProcessador(body){
    return _post(url+"computador/adicionar/processador",body)
  }
}
