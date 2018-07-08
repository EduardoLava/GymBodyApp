import { Treino } from "./treino";
import { Time } from "@angular/common";

export class TreinoData{

    treino: Treino; // referencia do treino
    data: Date; // data de realizacao
    horaInicio?: Time; // hora que foi iniciado o treino
    horaTermino?: Time; // hora de termino do treino
    completo: boolean; // se foi completo ou não

}