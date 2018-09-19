import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TimerComponent } from '../../../components/timer/timer';
import { PauseModalPage } from '../treino/pause-modal/pause-modal';
import { TreinoExercicio } from '../../../model/treino/treino-exercicio';
import { TreinoData } from '../../../model/entities';
// import { TreinoExercicioServiceProvider } from '../../../providers/services/treino-exercicio-service/treino-exercicio-service';

/**
 * Generated class for the TreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage {
// realizacao de treino

  @ViewChild('timerPrincipal')
  private timerPrincipal: TimerComponent;

  public treinoData: TreinoData;

  public treinosExercicios: TreinoExercicio[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private modalControler: ModalController,
    // private treinoExercicioService: TreinoExercicioServiceProvider
  ) {
    this.treinoData = navParams.get('treinoData');
    console.log(this.treinoData);
  }

  listarExercios(){
    // this.treinosExercicios = this.treinoExercicioService.listaExerciciosByTreinoId(this.treinoData.treino.id);
  }

  pause(){

    this.timerPrincipal.pauseTimer();
    let modal = this.modalControler.create(
      PauseModalPage.name
    );

    // evento de quando o modal é fechado
    modal.onDidDismiss( () => {
      this.timerPrincipal.resumeTimer();
    });

    // abre o modal
    modal.present();

  }


}
