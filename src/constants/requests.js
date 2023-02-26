exports.POST_ROTINA = () => `http://localhost:3000/api/rotinas`

exports.GET_ROTINA = (id_rotina) => `http://localhost:3000/api/rotinas/${id_rotina}`

exports.DELETE_ROTINA = (id_rotina) => `http://localhost:3000/api/rotinas/${id_rotina}`

exports.GET_EXERCICIO = (id) => 'http://localhost:3000/api/rotinas/exercicio/' + id;

exports.PUT_EXERCICIO = (id) => `http://localhost:3000/api/rotinas/exercicio/${id}/atualizar`;

exports.PUT_ADD_EXERCICIO = (id_rotina) => `http://localhost:3000/api/rotinas/${id_rotina}/exercicio/adicionar`;

exports.DELETE_EXERCICIO = (id_exercicio) => `http://localhost:3000/api/rotinas/exercicio/${id_exercicio}`

exports.GET_USUARIO_BY_ID = (id_usuario) => `http://localhost:3000/api/usuarios/${id_usuario}`

exports.GET_USUARIO_BY_NOME = (nome_usuario) => `http://localhost:3000/api/usuarios/query?nome=${nome_usuario}`

exports.DELETE_USUARIO = (id_usuario) => `http://localhost:3000/api/usuarios/${id_usuario}`

exports.PUT_USUARIO_INCREMENTAR_ROTINA= (id_usuario) => `http://localhost:3000/api/usuarios/incrementar-rotina/${id_usuario}`

exports.PUT_USUARIO_DECREMENTAR_ROTINA = (id_usuario) => `http://localhost:3000/api/usuarios/decrementar-rotina/${id_usuario}`

exports.POST_TOKEN = () => `http://localhost:3000/api/token/`

