import Exercicio from "./Exercicio";

export default class ListOfExercicios{
    constructor(exercicios){
        this.exercicios = exercicios.map(exercicio => new Exercicio(exercicio))
    }

    
}