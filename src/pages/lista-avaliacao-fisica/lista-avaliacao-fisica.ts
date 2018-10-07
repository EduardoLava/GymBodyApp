import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AvaliacaoFisicaSelecionarPessoaPage } from './avaliacao-fisica-selecionar-pessoa/avaliacao-fisica-selecionar-pessoa';
import { AvaliacaoFisicaServiceProvider } from '../../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';
import { TipoProtocolo, TipoProtocoloValues, Page, AvaliacaoFisica } from '../../model/entities';
import { CalendarComponentOptions, CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar'
import { ToastDefautController } from '../../utils/toast-default-contoller';
import { HttpServiceProvider } from '../../providers/services/http-service/http-service';

/**
 * Generated class for the ListaAvaliacaoFisicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-avaliacao-fisica',
  templateUrl: 'lista-avaliacao-fisica.html',
})
export class ListaAvaliacaoFisicaPage {

  protocolos: string[];
  avaliacoesFisicas: AvaliacaoFisica[];

  dateRange: { from: string; to: string; };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range'
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private avaliacaoFisicaService: AvaliacaoFisicaServiceProvider,
    private modalCntr: ModalController,
    private toast: ToastDefautController,
    private http: HttpServiceProvider
  ) {
    this.protocolos = TipoProtocoloValues;
  }

  ionViewDidLoad() {
  }

  novaAvaliacaoFisica(protocoloSelecionado: TipoProtocolo) {
    
    console.log(protocoloSelecionado);

    let avaliacaoFisica = this.avaliacaoFisicaService
      .criaAvaliacaoFisica(protocoloSelecionado);

      console.log(avaliacaoFisica);
    this.navCtrl.push(AvaliacaoFisicaSelecionarPessoaPage.name, { 
      avaliacaoFisica: avaliacaoFisica
    });
  }


  openCalendar() {

    this.toast.create("Clique no primeiro dia, depois no ultimo dia para selecionar um intervalo!")
    .present();

    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Selecione um intervalo de datas',
      doneIcon: true,
      closeIcon: true,
      closeLabel: null,
      from: new Date('2018-01-01')
    };

    let myCalendar = this.modalCntr.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      this.listByDateInterval(date.from.dateObj, date.to.dateObj);
    });
}

listByDateInterval(dataInicio: Date, dataFim: Date){
  this.avaliacaoFisicaService.listAvaliacaoFisicaByFilters(null, dataInicio, dataFim)
  .subscribe( (avaliacoesFisicas: Page<AvaliacaoFisica>) =>{
    if(avaliacoesFisicas){
      this.avaliacoesFisicas = avaliacoesFisicas.content;
    } else {
      this.avaliacoesFisicas = [];
    }

  }, (error)=>{
    this.toast.create(error.message).present();
  });
}

}
