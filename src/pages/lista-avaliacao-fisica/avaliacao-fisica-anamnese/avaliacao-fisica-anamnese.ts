import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvaliacaoFisica, Pessoa, Resposta } from '../../../model/entities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastDefautController } from '../../../utils/toast-default-contoller';

import { AvaliacaoFisicaPerimetriaPage } from '../avaliacao-fisica-perimetria/avaliacao-fisica-perimetria';

/**
 * Generated class for the AvaliacaoFisicaAnamnesePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliacao-fisica-anamnese',
  templateUrl: 'avaliacao-fisica-anamnese.html',
})
export class AvaliacaoFisicaAnamnesePage {

  // ---------------------------------
  // ---------------- ATRIBUTOS ------
  // ---------------------------------

  public avaliacaoFisica: AvaliacaoFisica;
  public resposta: Resposta;
  public formAnamnese: FormGroup;


  /**
   * 
   * @param navCtrl 
   * @param navParams 
   * @param formBuilder 
   * @param toast 
   */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private toast: ToastDefautController
  ) {
    
    this.resposta = {};

    this.avaliacaoFisica = this.navParams.get('avaliacaoFisica');
    console.log('paramentros');

    if(this.avaliacaoFisica == null || this.avaliacaoFisica.resposta == null) {
      this.toast.create('Ocorreu um erro ao iniciar a avaliação fisica');
      this.navCtrl.pop();
      return;
    }

    this.resposta = this.avaliacaoFisica.resposta;

    this.formAnamnese = this.formBuilder.group({  
      objetivosAtividadeFisica: [
        this.resposta.objetivosAtividadeFisica, 
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      praticaAtividade: [
        this.resposta.praticaAtividade, 
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      medicamento: [
        this.resposta.medicamento, 
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      cirurgia: [
        this.resposta.cirurgia, 
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      doencaFamiliar: [
        this.resposta.doencaFamiliar, 
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      observacao: [this.resposta.observacao]
    });

  }

  /**
   * Inicializa form
   */
  ionViewDidLoad(){
    
  }
  
  /**
   * Avança etapa
   */
  priximaEtapa(){
    this.avaliacaoFisica.resposta = this.resposta;
    console.log(this.formAnamnese);
    this.navCtrl.push(AvaliacaoFisicaPerimetriaPage.name, {
      avaliacaoFisica: this.avaliacaoFisica
    });
  }

}
