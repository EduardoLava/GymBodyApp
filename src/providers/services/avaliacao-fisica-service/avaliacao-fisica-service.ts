import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { AvaliacaoFisica, ProtocoloGuedes, ProtocoloPollock } from '../../../model/entities';

/*
  Generated class for the AvaliacaoFisicaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvaliacaoFisicaServiceProvider {

  constructor(public http: HttpServiceProvider) {
  }


  criaAvaliacaoFisica(protocoloSelecionado: string) : AvaliacaoFisica{


    let protocolo = (
      protocoloSelecionado == 'GUEDES'?
        new ProtocoloGuedes()
      :
        new ProtocoloPollock()
    );

    let avaliacao: AvaliacaoFisica = {
      avaliacaoAntropometrica: protocolo,
      pessoa: {nome:''},
      perimetria: {cintura: null},
      resposta: {doencaFamiliar: ''}
    }

    return avaliacao;
    
  }

}
