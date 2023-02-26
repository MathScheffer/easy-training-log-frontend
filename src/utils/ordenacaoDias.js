//TODO: criar camada de model e um objeto do tipo rotina para realizar este filtro.
import * as ROTINA_CONST from '../constants/rotinaContants' ;

export default class OrdenacaoDias {
    constructor(rotinas){
        this.rotinas = rotinas;
        this.dias = [];
        this.diasCompletos = 0;
        this.diasLetras = 0;
        this.controlador = true;
    }

    preencheDias(){
        this.rotinas.forEach(rotina => {
            this.dias.push(rotina.dia)
        });
    }

    setaVerificadores(){
        this.dias.forEach(dia => {
            if( ROTINA_CONST.DIAS_COMPLETOS.includes(dia.toLowerCase()) ){
                this.diasCompletos += 1;
            }else if ( ROTINA_CONST.DIAS_LETRAS.includes(dia.toUpperCase())){
                this.diasLetras += 1;
            }else{
                this.controlador = false;
            }
        })
    }

    ordenarRotina(){
        if((this.diasCompletos > 0 && this.diasLetras > 0) || this.controlador === false){
            return false;
        }else if(this.diasCompletos > 1){
            this.rotinas = this.rotinas.sort((a,b) => this.setarValorDia(a.dia) - this.setarValorDia(b.dia))
        }else{
            this.rotinas = this.rotinas.sort()
        }

        return this.rotinas
    }

    setarValorDia(dia){
        const diaFormatado = dia.toLowerCase();

        if(diaFormatado == "segunda"){
            return 1
        }else if(diaFormatado == "terça"){
            return 2
        }else if(diaFormatado == "quarta"){
            return 3
        }else if(diaFormatado == "quinta"){
            return 4
        }else if(diaFormatado == "sexta"){
            return 5
        }else if(diaFormatado == "sabado"){
            return 6
        }else if(diaFormatado == "domingo"){
            return 7
        }
    }

    getRotinaOrdenada(){
        this.preencheDias();
        this.setaVerificadores();
        return this.ordenarRotina();
    }

}

