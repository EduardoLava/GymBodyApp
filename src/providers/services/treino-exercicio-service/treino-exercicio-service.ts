import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercicio } from '../../../model/treino/exercicio';
import { ExercicioTreinoData } from '../../../model/treino/exercicio-treino-data';
import { Time } from '@angular/common';
import { Treino } from '../../../model/treino/treino';

/*
  Generated class for the TreinoExercicioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TreinoExercicioServiceProvider {

  listaExerciciosByTreinoId(id: Number){
    
    let horaInicio: Time = {
      hours: 10,
      minutes: 0
    };
    let horaFim: Time = {
      hours: 11,
      minutes: 0
    };

    let treinos: Treino[] = [
      {id: 1, nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {id: 1, nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {id: 1, nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {id: 1, nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
    ];

  }

  constructor(public http: HttpClient) {
    console.log('Hello TreinoExercicioServiceProvider Provider');
  }

}
