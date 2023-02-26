/**
 * limpa as chaves vazias do formulario, impedindo que um formulario com chaves vazias seja
 * enviado para a api
 * @returns void
 * 
 */
 exports.imparChavesVazias = (obj) => {
    let body = obj;

    for(var a in body){
        if(!body[a]){
            delete body[a]
        }
    }

    return body
}

exports.montarNomeUsuario = (nomeComSobrenome) => {
    console.log(nomeComSobrenome)
    nomeComSobrenome = nomeComSobrenome.split(" ");
    nomeComSobrenome[0] = nomeComSobrenome[0][0].toUpperCase() + nomeComSobrenome[0].slice(1)
    nomeComSobrenome[1] = nomeComSobrenome[1][0].toUpperCase() + nomeComSobrenome[1].slice(1)
    nomeComSobrenome = nomeComSobrenome.join(" ")

    return nomeComSobrenome;
}