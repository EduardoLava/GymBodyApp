import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AvaliacaoFisicaSelecionarPessoaPage } from './avaliacao-fisica-selecionar-pessoa/avaliacao-fisica-selecionar-pessoa';
import { AvaliacaoFisicaServiceProvider } from '../../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';
import { TipoProtocolo, Page, AvaliacaoFisica } from '../../model/entities';
import {  CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar'
import { ToastDefautController } from '../../utils/toast-default-contoller';
import { DataUtil } from '../../utils/data-util';
import { AvaliacaoFisicaDetalharPage } from './avaliacao-fisica-detalhar/avaliacao-fisica-detalhar';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
import { SessionServiceProvider } from '../../providers/services/login-service/session-service';

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

  // protocolos: string[];
  // avaiações físicas listadas na tela
  avaliacoesFisicas: AvaliacaoFisica[];

  isPersonal: boolean = false;

  dataInicio: Date;
  dataFim: Date;
  filtro: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private avaliacaoFisicaService: AvaliacaoFisicaServiceProvider,
    private modalCntr: ModalController,
    private toast: ToastDefautController,
    private dataUtil: DataUtil,
    private loading: LoadingDefaultController,
    session: SessionServiceProvider
  ) {
    this.isPersonal = session.getIsAdministradorOrPersonal();
  }

  /**
   * Inicializa a view, consultado as avaiações fisicas dos últimos
   * trinta dias
   */
  ionViewDidLoad() {
    
    let dataInicio: Date = this.dataUtil.addDays(new Date(), -30);

    this.listByDateInterval(null, dataInicio, new Date());
  }

  /**
   * Incia os steps de uma avaliacao fisica 
   * 
   * @param protocoloSelecionado 
   */
  novaAvaliacaoFisica(protocoloSelecionado: TipoProtocolo) {
    
    let avaliacaoFisica = this.avaliacaoFisicaService
      .criaAvaliacaoFisica(protocoloSelecionado);

      console.log(avaliacaoFisica);
    this.navCtrl.push(AvaliacaoFisicaSelecionarPessoaPage.name, { 
      avaliacaoFisica: avaliacaoFisica
    });
  }

  /**
   * Abre um modal com o calendário para selecionar o intervalo de datas.
   */
  openCalendar() {

    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Selecione um intervalo de datas',
      doneIcon: true,
      closeIcon: true,
      closeLabel: null,
      defaultScrollTo: new Date(),
      from: new Date('2018-02-01'),
      showYearPicker: true
    };

    let myCalendar = this.modalCntr.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {

      if(date && date.from && date.to ){
        this.listByDateInterval(this.filtro, date.from.dateObj, date.to.dateObj);
      } else {
        this.toast.create('Selecione um intervalo de datas').present();
      }

    });
  }

  buscarPorfiltro(filtro: string){
    this.filtro = filtro;
    this.listByDateInterval(filtro, this.dataInicio, this.dataFim);
  }

  /**
   * Lista avaliações físicas de acordo com as datas informadas
   * 
   * @param dataInicio 
   * @param dataFim 
   */
  listByDateInterval(filter: string, dataInicio: Date, dataFim: Date){

    this.avaliacoesFisicas = null;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;

    this.loading.create('Carregando as avaliações').present();

    this.avaliacaoFisicaService.listAvaliacaoFisicaByFilters(filter, null, dataInicio, dataFim)
    .finally(()=> this.loading.loader.dismiss())
    .subscribe( (avaliacoesFisicas: Page<AvaliacaoFisica>) =>{
      if(avaliacoesFisicas){
        this.avaliacoesFisicas = avaliacoesFisicas.content;
      } 

    }, (error)=>{
      this.toast.create(error.message).present();
    });
  }

  detalharAvaliacaoFisica(avaliacaoFisica: AvaliacaoFisica){

    if(avaliacaoFisica == null){
      this.toast.create('Ocorreu um erro ao detalhar esta avalaicão física').present();
      return;
    }

    this.navCtrl.push(AvaliacaoFisicaDetalharPage.name, {
      avaliacaoFisica : avaliacaoFisica
    });

  }

}
