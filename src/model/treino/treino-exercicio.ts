import { Treino } from "./treino";
import { DateTime } from "ionic-angular/umd";

export class TreinoExercicio{

    treino:         Treino; // referencia do treino
    dataInativacao: DateTime; // data e hora de inativação caso esteja inativo
    carga?:          Number; // peso utilizado para realizacao do exercicio
    repeticoes?:     Number; // quantidade de repeticoes que devem ser feitas
    tempoMin?:       Number; // tempo em min para realizacao de um exercicio
    observacoes?:    string; // observações caso o personal informe
    isAtivo:        boolean; // se o exercicio esta ativo no treino, se estiver inativo não deverá ser feito

}