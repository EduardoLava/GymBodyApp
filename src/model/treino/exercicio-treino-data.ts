import { TreinoExercicio } from "./treino-exercicio";
import { TreinoData } from "./treino-data";

export class ExercicioTreinoData {

    treinoExercicio:    TreinoExercicio;// para saber qual o exercicio, repeticoes e sessoes que serao feitas
    treinoData:         TreinoData;// contem a data e o treino
    completo:           boolean;// se o aluno completou ou nao o exercicio do treino

}