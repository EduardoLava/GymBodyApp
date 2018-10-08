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

  readOnly: boolean = false;

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
    this.readOnly = navParams.get('readOnly');

    if(this.readOnly == null){
      this.readOnly = false;
    }

    if(!this.avaliacaoFisica || !this.avaliacaoFisica.perimetria){
      this.toast.create('Ocorreu um erro ao ir para a etapa de permitria');
      this.navCtrl.setRoot(HomePage.name);
      return;
    }

  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    this.formPerimetria = this.formBuilder.group({
      pescoco: [
        this.avaliacaoFisica.perimetria.pescoco, 
        Validators.compose([
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      torax: [
        this.avaliacaoFisica.perimetria.torax, 
        Validators.compose([
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      bracoDireitoRelaxado: [
        this.avaliacaoFisica.perimetria.bracoDireitoRelaxado, 
        Validators.compose([
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      bracoEsquerdoRelaxado: [
        this.avaliacaoFisica.perimetria.bracoEsquerdoRelaxado, 
        Validators.compose([
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      bracoDireitoContraido: [
        this.avaliacaoFisica.perimetria.bracoDireitoContraido, 
        Validators.compose([
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      bracoEsquerdoContraido: [
        this.avaliacaoFisica.perimetria.bracoEsquerdoContraido, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)'),
        ])
      ],
      antebracoDireito: [
        this.avaliacaoFisica.perimetria.antebracoDireito, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      antebracoEsquerdo: [
        this.avaliacaoFisica.perimetria.antebracoEsquerdo, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      cintura: [
        this.avaliacaoFisica.perimetria.cintura, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      abdomen: [
        this.avaliacaoFisica.perimetria.abdomen, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      quadril: [
        this.avaliacaoFisica.perimetria.quadril, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      coxaProximalDireita: [
        this.avaliacaoFisica.perimetria.coxaProximalDireita, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      coxaProximalEsquerda: [
        this.avaliacaoFisica.perimetria.coxaProximalEsquerda, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      coxaMediaDireita: [
        this.avaliacaoFisica.perimetria.coxaMediaDireita, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      coxaMediaEsquerda: [
        this.avaliacaoFisica.perimetria.coxaMediaEsquerda, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      coxaDistalDireita: [
        this.avaliacaoFisica.perimetria.coxaDistalDireita, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      coxaDistalEsquerda: [
        this.avaliacaoFisica.perimetria.coxaDistalEsquerda, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      panturrilhaDireita: [
        this.avaliacaoFisica.perimetria.panturrilhaDireita, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
      panturrilhaEsquerda: [
        this.avaliacaoFisica.perimetria.panturrilhaEsquerda, 
        Validators.compose([
          Validators.required,
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)')
        ])
      ],
    });

  }

  priximaEtapa(){
    this.navCtrl.push(AvaliacaoFisicaDobrasCutaneasPage.name, {
      avaliacaoFisica: this.avaliacaoFisica
    });
  }

}
