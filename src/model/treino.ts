import { Time } from "@angular/common";

export interface Treino {

    nome: string;
    sigla: string;
    dataInicio: Date;
    dataFim: Date;
    horaPrevistaInicio: Time;
    horaPrevistaTermino: Time;

}