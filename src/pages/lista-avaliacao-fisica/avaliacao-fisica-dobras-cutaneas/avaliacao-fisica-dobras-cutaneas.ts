import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvaliacaoFisica } from '../../../model/entities';
import { ToastDefautController } from '../../../utils/toast-default-contoller';

/**
 * Generated class for the AvaliacaoFisicaDobrasCutaneasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliacao-fisica-dobras-cutaneas',
  templateUrl: 'avaliacao-fisica-dobras-cutaneas.html',
})
export class AvaliacaoFisicaDobrasCutaneasPage {

  // ------------------------------------
  // -------------- ATRIBUTOS -----------
  // ------------------------------------
  public avaliacaoFisica: AvaliacaoFisica;
  public formDobras: FormGroup;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastDefautController,
    public formBuilder: FormBuilder
  ) {
    this.avaliacaoFisica = this.navParams.get('avaliacaoFisica');

    if(!this.avaliacaoFisica) {
      this.toast.create('Ocorre um erro ao se comunicar com o servidor');
      return null;
    }

  }

  ionViewDidLoad() {
  }


  ngOnInit(){
    this.formDobras = this.formBuilder.group({
      
    });
  }

}
