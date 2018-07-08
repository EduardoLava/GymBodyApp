import { Time } from "@angular/common";

export class Treino {

    nome:                   string; // nome do treino
    sigla:                  string; // sigla do treino
    dataInicio:             Date;   // data de inicio
    dataFim:                Date;   // data de fim
    horaPrevistaInicio:     Time;   // hora prevista para realizacao
    horaPrevistaTermino:    Time;   // hora prevista para termino do treino

}