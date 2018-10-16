import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, NavParams } from 'ionic-angular';
import { Treino, Pessoa, TreinoData } from '../../model/entities';
import { ToastDefautController } from '../../utils/toast-default-contoller';
import { TreinoDataServiceProvider } from '../../providers/services/treino-data-service/treino-data-service';
import { SessionServiceProvider } from '../../providers/services/login-service/session-service';
import { DataUtil } from '../../utils/data-util';
import { CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';
import { TreinoDetalhesPage } from '../treino-detalhes/treino-detalhes';
import { TreinoServiceProvider } from '../../providers/services/treino-service/treino-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  treinosRealizados: Treino[];
  pessoaFiltrada: Pessoa;

  apresentarMenu = false;
  apresentarNome = true;

  constructor(
    public navCtrl: NavController,
    public navParamns: NavParams, 
    public sessionService: SessionServiceProvider,
    private toast: ToastDefautController,
    private treinoService: TreinoServiceProvider,
    private dataUtil: DataUtil,
    private alert: AlertController,
    private modalCntr: ModalController,
  ) {

    this.pessoaFiltrada = this.navParamns.get('pessoa');

    this.carregaDados();

  }

  carregaDados(){

    if(this.pessoaFiltrada == null){
      this.apresentarMenu = true;
      this.apresentarNome = false;
      
      this.sessionService.carregaPessoaLogada()
      .subscribe((pessoa: Pessoa) =>{ 
      this.pessoaFiltrada =  pessoa;

      if(this.pessoaFiltrada == null){
        this.sessionService.logout();
        return;
      }

      let dataInicio: Date = this.dataUtil.addDays(new Date(), -30);
      let dataTermino: Date = this.dataUtil.addDays(new Date(), 15);

      this.listByFilters( dataInicio, dataTermino);

    });

    }
  }

  ionViewDidLoad() {

    if(this.pessoaFiltrada == null){
      return;
    }

    let dataInicio: Date = this.dataUtil.addDays(new Date(), -30);
    let dataTermino: Date = this.dataUtil.addDays(new Date(), 15);

    this.listByFilters( dataInicio, dataTermino);
  }

  listByFilters(dataInicio: Date, dataTermino: Date){

    if(dataInicio == null || dataTermino == null){
      this.toast.create('Selecine um intervalo de datas').present();
      return;
    }

    this.treinoService.listarTreinosByFiltersHistorico(
      dataInicio, 
      dataTermino, 
      this.pessoaFiltrada.id
    ).subscribe((treinosData: TreinoData[])=>{
      this.treinosRealizados = treinosData;
      // console.log(treinosData);
    }, (error)=>{
      
      this.alert.create({
        buttons: ['Ok'],
        title: 'Error',
        subTitle: error.message
      }).present();


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
        this.listByFilters(date.from.dateObj, date.to.dateObj);
      } else {
        this.toast.create('Selecione um intervalo de datas').present();
      }

    });
  }

  /**
   * Abre tela para detalhar o treino executado na data XX
   * @param treinoData 
   */
  detalhar(treinoData: Treino){

    if(treinoData == null || treinoData.id == null){
      this.toast.create("Ocorreu um erro ao detalhar seu treino").present();
      return;
    }

    this.navCtrl.push(TreinoDetalhesPage.name, {
      treinoData: treinoData
    })

  }

}
