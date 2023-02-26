export default class TratamentoErros {

    constructor(erro){
        this.erro = erro
        this.message = "";
        this.parametrosInformados = "";
        this.arrMessage = [];
        this.setaTipoErroEInformacoes();
    }

    setaTipoErroEInformacoes(){
        console.log(this.erro)
        if(this.erro.hasOwnProperty("uniqueError")){
            this.erro = this.erro.uniqueError
            this.message = this.erro.message;
            
            this.parametrosInformados = Object.entries(this.erro.parametro_informado)
            
        } else if(!(this.erro.erro || this.erro.message)){
            const arrAtributosUsuario = 
            ["nome" ,"senha","whatsapp","idade","peso","sexo","objetivo","rotina","CastError"]
            for (const obj of Object.entries(this.erro)){
                let k = obj[0]

                if(arrAtributosUsuario.includes(k)){
                    this.arrMessage.push(this.erro[k])
                }
                
            }
        }else {
            this.erro = this.erro.erro || this.erro.message
            console.log(this.erro)
        }
    }

    mensagemErro(){
        if(this.message == "O parametro informado ja esta sendo utilizado."){
            this.message = "Os seguintes dados ja estao sendo utilizados: "
            for (const obj of this.parametrosInformados){
                this.message  = this.message +  obj.join("= ")
            }
        }else if(this.arrMessage.length > 0){
            console.log(this.erro)
            this.message = this.arrMessage.join(",")
        }else if(this.erro){
            console.log(this.erro)
            this.message = this.erro
        }

        return this.message
    }
}