import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvaliacaoFisica } from '../../../model/entities';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { HomePage } from '../../home/home';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvaliacaoFisicaDobrasCutaneasPage } from '../avaliacao-fisica-dobras-cutaneas/avaliacao-fisica-dobras-cutaneas';

/**
 * Generated class for the AvaliacaoFisicaPerimetriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliacao-fisica-perimetria',
  templateUrl: 'avaliacao-fisica-perimetria.html',
})
export class AvaliacaoFisicaPerimetriaPage {

  // ---------------------------------------
  // ----------------- ATRIBUTOS -----------
  // ---------------------------------------
  public avaliacaoFisica: AvaliacaoFisica;
  public formPerimetria: FormGroup;

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   * @param toast 
   * @param formBuilder 
   */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: ToastDefautController,
    private formBuilder: FormBuilder
  ) {
    this.avaliacaoFisica = navParams.get('avaliacaoFisica');

    if(!this.avaliacaoFisica){
      this.toast.create('Ocorreu um erro ao ir para a etapa de permitria');
      this.navCtrl.setRoot(HomePage.name);
      return;
    }

  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    this.formPerimetria = this.formBuilder.group({
      pescoco: [this.avaliacaoFisica.perimetria.pescoco, Validators.min(0)],
      torax: [this.avaliacaoFisica.perimetria.torax, Validators.min(0)],
      bracoDireitoRelaxado: [this.avaliacaoFisica.perimetria.bracoDireitoRelaxado, Validators.min(0)],
      bracoEsquerdoRelaxado: [this.avaliacaoFisica.perimetria.bracoEsquerdoRelaxado, Validators.min(0)],
      bracoDireitoContraido: [this.avaliacaoFisica.perimetria.bracoDireitoContraido, Validators.min(0)],
      bracoEsquerdoContraido: [this.avaliacaoFisica.perimetria.bracoEsquerdoContraido, Validators.min(0)],
      antebracoDireito: [this.avaliacaoFisica.perimetria.antebracoDireito, Validators.min(0)],
      antebracoEsquerdo: [this.avaliacaoFisica.perimetria.antebracoEsquerdo, Validators.min(0)],
      cintura: [this.avaliacaoFisica.perimetria.cintura, Validators.min(0)],
      abdomen: [this.avaliacaoFisica.perimetria.abdomen, Validators.min(0)],
      quadril: [this.avaliacaoFisica.perimetria.quadril, Validators.min(0)],
      coxaProximalDireita: [this.avaliacaoFisica.perimetria.coxaProximalDireita, Validators.min(0)],
      coxaProximalEsquerda: [this.avaliacaoFisica.perimetria.coxaProximalEsquerda, Validators.min(0)],
      coxaMediaDireita: [this.avaliacaoFisica.perimetria.coxaMediaDireita, Validators.min(0)],
      coxaMediaEsquerda: [this.avaliacaoFisica.perimetria.coxaMediaEsquerda, Validators.min(0)],
      coxaDistalDireita: [this.avaliacaoFisica.perimetria.coxaDistalDireita, Validators.min(0)],
      coxaDistalEsquerda: [this.avaliacaoFisica.perimetria.coxaDistalEsquerda, Validators.min(0)],
      panturrilhaDireita: [this.avaliacaoFisica.perimetria.panturrilhaDireita, Validators.min(0)],
      panturrilhaEsquerda: [this.avaliacaoFisica.perimetria.panturrilhaEsquerda, Validators.min(0)],
    });
  }

  priximaEtapa(){
    this.navCtrl.push(AvaliacaoFisicaDobrasCutaneasPage.name, {
      avaliacaoFisica: this.avaliacaoFisica
    });
  }

}
