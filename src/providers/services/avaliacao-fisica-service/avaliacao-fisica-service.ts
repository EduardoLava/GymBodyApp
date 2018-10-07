import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { AvaliacaoFisica, AvaliacaoAntropometrica, TipoProtocolo } from '../../../model/entities';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

/*
  Generated class for the AvaliacaoFisicaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvaliacaoFisicaServiceProvider {

  constructor(
    public http: HttpServiceProvider,
    private datePipe: DatePipe
  ) {
  }


  criaAvaliacaoFisica(protocoloSelecionado: TipoProtocolo) : AvaliacaoFisica{


    let protocolo: AvaliacaoAntropometrica = {};
    protocolo.tipoProtocolo = protocoloSelecionado;

    protocolo.dobrasCutaneas = {updated: null};
    protocolo.indiceMassaCorporal = {updated: null};
    protocolo.predicaoGorduraSiri = {updated: null, densidadeCorporal: 1, gordura: 10};


    let avaliacao: AvaliacaoFisica = {
      avaliacaoAntropometrica: protocolo,
      pessoa: {nome:''},
      perimetria: {cintura: null},
      resposta: {doencaFamiliar: ''},
      data: new Date()
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

  listaAvaliacoesFisicasByPessoaId(idPessoa: number){
    return this.http.get(idPessoa+"/pessoa-id");
  }

  listAvaliacaoFisicaByFilters(filters: string, dataInicio: Date, dataFim: Date){

    

    if(filters == null || filters == ''){
      filters = ' ';
    }else {
      filters = '/'+filters;
    }

    let dataInicioFormatada = '';
    if(dataInicio){
      dataInicioFormatada = this.datePipe.transform(dataInicio, "yyyy-MM-dd");
      console.log(dataInicioFormatada);
      dataInicioFormatada = '/'+dataInicioFormatada+'/inicio';
    }

    let dataFimFormatada = '';
    if(dataFim){
      dataFimFormatada = this.datePipe.transform(dataFim, "yyyy-MM-dd");
      dataFimFormatada  = '/'+dataFimFormatada+'/fim'
    }

    return this.http.get('/api/avaliacao-fisica/by-filters/ /inicio/'
      +this.datePipe.transform(dataInicio, "yyyy-MM-dd")+
      '/fim/'+this.datePipe.transform(dataFim, "yyyy-MM-dd")+'/')
    // return this.http.get('/api/avaliacao-fisica/'+filters+'/by-filters'+dataInicioFormatada+dataFimFormatada);
  }

}
