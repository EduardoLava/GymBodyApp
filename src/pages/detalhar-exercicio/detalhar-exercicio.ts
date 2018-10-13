import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Exercicio } from '../../model/entities';

/**
 * Generated class for the DetalharExercicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhar-exercicio',
  templateUrl: 'detalhar-exercicio.html',
})
export class DetalharExercicioPage {

  public exercicio: Exercicio;
  imagemDefault = '../../assets/imgs/imagem-default.png';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.exercicio = navParams.get('exercicio');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalharExercicioPage');
  }

}
