import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvaliacaoFisica, DobrasCutaneas } from '../../../model/entities';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { AvaliacaoFisicaImcPage } from '../avaliacao-fisica-imc/avaliacao-fisica-imc';

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
  private dobrasCutaneas: DobrasCutaneas;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastDefautController,
    public formBuilder: FormBuilder
  ) {
    this.avaliacaoFisica = this.navParams.get('avaliacaoFisica');

    if(
        !this.avaliacaoFisica 
        || !this.avaliacaoFisica.avaliacaoAntropometrica
        || !this.avaliacaoFisica.avaliacaoAntropometrica.dobrasCutaneas
    ) {
      this.toast.create('Ocorre um erro ao se comunicar com o servidor');
      return null;
    }
  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    // assumindo como padrão o protocolo do Pollock
    this.dobrasCutaneas = this.avaliacaoFisica.avaliacaoAntropometrica.dobrasCutaneas;

    console.log("dobras cutaneas "+this.dobrasCutaneas);

    this.formDobras = this.formBuilder.group({
      // abdominal, utilizado em ambos os protocolos
      abdominal: [
        this.dobrasCutaneas.abdominal,
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      axilarMedia: [
        this.dobrasCutaneas.axilarMedia, 
        (!this.isProtocoloGuedes?
          Validators.compose([Validators.required, Validators.min(0)])
        :
          Validators.nullValidator
        )
      ],
      bicital: [this.dobrasCutaneas.bicital],
      coxa: [
        this.dobrasCutaneas.coxa,
        (!this.isProtocoloGuedes?
          Validators.compose([Validators.required, Validators.min(0)])
        :
          Validators.nullValidator
        )
      ],
      panturrilha: [this.dobrasCutaneas.panturrilha],
      peitoral: [this.dobrasCutaneas.peitoral],
      subescapular: [
        this.dobrasCutaneas.subescapular, 
        (!this.isProtocoloGuedes?
          Validators.compose([Validators.required, Validators.min(0)])
        :
          Validators.nullValidator
        )
      ],
      supraIliaca: [
        this.dobrasCutaneas.supraIliaca,
        (this.isProtocoloGuedes?
          Validators.compose([Validators.required, Validators.min(0)])
        :
          Validators.nullValidator
        )
      ],
      toracica: [
        this.dobrasCutaneas.toracica, 
        (!this.isProtocoloGuedes?
            Validators.compose([Validators.required, Validators.min(0)])
          :
            Validators.nullValidator
        )
      ],
      // triciptal utilizado em ambos os protocolos
      tricipal: [
        this.dobrasCutaneas.tricipal, 
        Validators.compose([Validators.required, Validators.min(0)])
      ],
    });

  }

  /**
   * Avança etapa
   */
  proximaEtapa(){
    console.log('dobras proximo, ir pra imc');
    this.avaliacaoFisica.avaliacaoAntropometrica.dobrasCutaneas = this.dobrasCutaneas;
    console.log(this.formDobras);
    this.navCtrl.push(AvaliacaoFisicaImcPage.name, {
      avaliacaoFisica: this.avaliacaoFisica
    });
  }


}
