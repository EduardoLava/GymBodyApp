import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExercicioRealizado } from '../../model/entities';

/**
 * Generated class for the ExercicioRealizadoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercicio-realizado-detalhes',
  templateUrl: 'exercicio-realizado-detalhes.html',
})
export class ExercicioRealizadoDetalhesPage {

  exercicioRealizado: ExercicioRealizado;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.exercicioRealizado = this.navParams.get('exercicioRealizado');
    console.log(this.exercicioRealizado);
  }

  ionViewDidLoad() {
  }

}
