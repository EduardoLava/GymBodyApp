import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { AvaliacaoFisica, ProtocoloGuedes, ProtocoloPollock, AvaliacaoAntropometrica } from '../../../model/entities';
import { Observable } from 'rxjs';

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

    protocolo.dobrasCutaneas = {updated: null};
    protocolo.indiceMassaCorporal = {updated: null};
    protocolo.predicaoGorduraSiri = {updated: null, densidadeCorporal: 1, gordura: 10};


    let avaliacao: AvaliacaoFisica = {
      avaliacaoAntropometrica: protocolo,
      pessoa: {nome:''},
      perimetria: {cintura: null},
      resposta: {doencaFamiliar: ''}
    }

    return avaliacao;
    
  }

  /**
   * 
   * Salva uma avaliacao fisica no servidor 
   * 
   * @param avaliacaoFisica 
   */
  salvarAvaliacaoFisica(avaliacaoFisica: AvaliacaoFisica) : Observable<AvaliacaoFisica>{
    
    return this.http.post(
      '/api/avaliacao-fisica', 
      avaliacaoFisica
    );
    
  }

}
