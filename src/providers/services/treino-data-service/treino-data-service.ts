import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Time } from '@angular/common';
import { Treino } from '../../../model/treino/treino';
import { TreinoData } from '../../../model/treino/treino-data';

@Injectable()
export class TreinoDataServiceProvider {

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
      {nome:"Treino B",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"B"},
      {nome:"Treino C",dataFim:new Date('2018-07-30'),dataInicio: new Date('2018-07-01'),horaPrevistaInicio: horaInicio ,  horaPrevistaTermino: horaFim ,sigla:"C"},
    ];

    let treinoData: TreinoData[] = [
      {completo: true, data: new Date('2018-07-07'), treino: treinos[0]},
      {completo: false, data: new Date('2018-07-08'), treino: treinos[1]},
      {completo: false, data: new Date('2018-07-09'), treino: treinos[2]}
    ];

    /* let hoje = false;
    let proximo = false;
    let anterior = false;

    let dataAtual = new Date().toISOString();
    
    treinoData.forEach(t => {
      if(hoje == false && t.data.toISOString() == dataAtual){
        hoje = true;
        t.intervaloTempo = TipoSessao.HOJE;
      }
      if(anterior == false && t.data.toISOString() < dataAtual){
        anterior = true;
        t.intervaloTempo = TipoSessao.HOJE;
      }
      if(proximo == false && t.data.toISOString() < dataAtual){
        proximo = true;
        t.intervaloTempo = TipoSessao.HOJE;
      }
    }); */

    return treinoData;
  }

}
