import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvaliacaoFisica, ProtocoloGuedes } from '../../../model/entities';
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
  private isProtocoloGuedes: boolean = false;


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

    if(this.avaliacaoFisica.avaliacaoAntropometrica instanceof ProtocoloGuedes){
      this.isProtocoloGuedes = true;
    }

  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    // assumindo como padrão o protocolo do Pollock
    let dobrasCutaneas = this.avaliacaoFisica.avaliacaoAntropometrica.dobrasCutaneas;

    console.log("dobras cutaneas "+dobrasCutaneas);

    this.formDobras = this.formBuilder.group({
      // abdominal, utilizado em ambos os protocolos
      abdominal: [
        dobrasCutaneas.abdominal,
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      axilarMedia: [
        dobrasCutaneas.axilarMedia, 
        (!this.isProtocoloGuedes?
          Validators.compose([Validators.required, Validators.min(0)])
        :
          Validators.nullValidator
        )
      ],
      bicital: [dobrasCutaneas.bicital],
      coxa: [
        dobrasCutaneas.coxa,
        (!this.isProtocoloGuedes?
          Validators.compose([Validators.required, Validators.min(0)])
        :
          Validators.nullValidator
        )
      ],
      panturrilha: [dobrasCutaneas.panturrilha],
      peitoral: [dobrasCutaneas.peitoral],
      subescapular: [
        dobrasCutaneas.subescapular, 
        (!this.isProtocoloGuedes?
          Validators.compose([Validators.required, Validators.min(0)])
        :
          Validators.nullValidator
        )
      ],
      supraIliaca: [
        dobrasCutaneas.supraIliaca,
        (this.isProtocoloGuedes?
          Validators.compose([Validators.required, Validators.min(0)])
        :
          Validators.nullValidator
        )
      ],
      toracica: [
        dobrasCutaneas.toracica, 
        (!this.isProtocoloGuedes?
            Validators.compose([Validators.required, Validators.min(0)])
          :
            Validators.nullValidator
        )
      ],
      // triciptal utilizado em ambos os protocolos
      tricipal: [
        dobrasCutaneas.tricipal, 
        Validators.compose([Validators.required, Validators.min(0)])
      ],
    });

  }

}
