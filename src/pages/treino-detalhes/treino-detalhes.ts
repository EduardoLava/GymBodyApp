import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Treino } from '../../model/treino/treino';
import { TreinoServiceProvider } from '../../providers/services/treino-service/treino-service';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
import { TreinoData } from '../../model/entities';
import { CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';

/**
 * Generated class for the TreinoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-treino-detalhes',
  templateUrl: 'treino-detalhes.html',
})
export class TreinoDetalhesPage {

  treinoData: TreinoData;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private treinoService: TreinoServiceProvider,
    private loader: LoadingDefaultController,
    private alertCntrl: AlertController,
  ) {
    this.treinoData = this.navParams.get('treinoData');
    this.findExerciciosTreino(this.treinoData.id);
  }

  ionViewDidLoad() {
  }

  findExerciciosTreino(idTreino: number){
    
    if(idTreino == null){
      return;
    }

    this.loader.create("Carregando treino").present();

    this.treinoService.findTreinoDataById(idTreino).
    finally(() =>{
      this.loader.loader.dismiss();
    }).subscribe((treinoData: TreinoData) =>{
      this.treinoData = treinoData;
      console.log(this.treinoData.exerciciosRealizados.length);
    }, (erro) =>{
      this.alertCntrl.create({
        buttons: ['Ok'],
        title: 'Erro',
        subTitle: erro.error
      }).present();
    });
  }


}
