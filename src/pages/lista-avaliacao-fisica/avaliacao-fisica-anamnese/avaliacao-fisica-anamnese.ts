import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvaliacaoFisica, Resposta } from '../../../model/entities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastDefautController } from '../../../utils/toast-default-contoller';

import { AvaliacaoFisicaPerimetriaPage } from '../avaliacao-fisica-perimetria/avaliacao-fisica-perimetria';
import { AvaliacaoFisicaServiceProvider } from '../../../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';

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

  // chamado ao detalhar
  readOnly: boolean = false;
  edicao: boolean = false;

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
    private toast: ToastDefautController,
    private avaliacaoFisicaService: AvaliacaoFisicaServiceProvider
  ) {
    
    this.resposta = {};

    this.avaliacaoFisica = this.navParams.get('avaliacaoFisica');
    this.readOnly = this.navParams.get('readOnly');
    this.edicao = this.navParams.get('edicao');

    if(this.readOnly == null){
      this.readOnly = false;
      this.edicao = false;
    }


    if(this.avaliacaoFisica == null || this.avaliacaoFisica.resposta == null) {
      this.toast.create('Ocorreu um erro ao iniciar a avaliação fisica');
      this.navCtrl.pop();
      return;
    }

    this.resposta = this.avaliacaoFisica.resposta;

    this.formAnamnese = this.formBuilder.group({  
      objetivosAtividadeFisica: [
        this.resposta.objetivosAtividadeFisica, 
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      praticaAtividade: [
        this.resposta.praticaAtividade, 
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      medicamento: [
        this.resposta.medicamento, 
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      cirurgia: [
        this.resposta.cirurgia, 
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      doencaFamiliar: [
        this.resposta.doencaFamiliar, 
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      observacao: [
        this.resposta.observacao,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ]
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

  editar(){
    
    this.avaliacaoFisica.resposta = this.resposta;

    this.avaliacaoFisicaService
      .salvarAvaliacaoFisica(this.avaliacaoFisica)
      .subscribe((avaliacao: AvaliacaoFisica) =>{
        this.toast.create('Avaliacao física atualizada com sucesso!').present();
        this.navCtrl.pop();
        }, (error) =>{
          this.toast.create('Erro ao salvar: '+ error.error).present();
        }
      );

  }

}
