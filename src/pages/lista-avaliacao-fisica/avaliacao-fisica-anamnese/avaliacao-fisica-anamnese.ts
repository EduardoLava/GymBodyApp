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
    
    this.avaliacaoFisica = this.navParams.get('avaliacaoFisica');
    console.log('paramentros');

    console.log(this.avaliacaoFisica)

    if(this.avaliacaoFisica == null) {
      this.toast.create('Ocorreu um erro ao iniciar a avaliação fisica');
      this.navCtrl.pop();
      return;
    }

  }

  /**
   * Inicializa form
   */
  ngOnInit(){
    let resposta: Resposta = this.avaliacaoFisica.resposta;

    this.formAnamnese = this.formBuilder.group({  
      objetivosAtividadeFisica: [resposta.objetivosAtividadeFisica, Validators.required],
      praticaAtividade: [resposta.praticaAtividade, Validators.required],
      medicamento: [resposta.medicamento, Validators.required],
      cirurgia: [resposta.cirurgia, Validators.required],
      doencaFamiliar: [resposta.doencaFamiliar, Validators.required],
      observacao: [resposta.observacao]
    });
  }

  /**
   * Inicializa view
   */
  ionViewDidLoad() {
  }
  
  /**
   * Avança etapa
   */
  priximaEtapa(){
    console.log(this.avaliacaoFisica.resposta);
    this.navCtrl.push(AvaliacaoFisicaPerimetriaPage.name, {
      avaliacaoFisica: this.avaliacaoFisica
    });
  }

}
