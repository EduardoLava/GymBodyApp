import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PauseModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pause-modal',
  templateUrl: 'pause-modal.html',
})
export class PauseModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // fecha o modal
  continuar(){
    console.log('sadfafdsa');
    this.navCtrl.pop();
  }

}
