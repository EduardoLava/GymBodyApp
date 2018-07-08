import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Time } from '@angular/common';
import { Treino } from '../../../model/treino/treino';

/*
  Generated class for the TreinoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TreinoServiceProvider {

  constructor(public http: HttpClient) {
  }

  listarTreinos(){

    let horaInicio: Time = {
      hours: 10,
      minutes: 0
    };
    let horaFim: Time = {
      hours: 11,
      minutes: 0
    };

    let treinos: Treino[] = [
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"},
      {nome:"Treino A",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"A"}
    ];

    return treinos;
  }

}
