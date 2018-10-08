import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvaliacaoFisica } from '../../../model/entities';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { ListaAvaliacaoFisicaPage } from '../lista-avaliacao-fisica';
import { AvaliacaoFisicaServiceProvider } from '../../../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';
import { AvaliacaoFisicaAnamnesePage } from '../avaliacao-fisica-anamnese/avaliacao-fisica-anamnese';
import { AvaliacaoFisicaPerimetriaPage } from '../avaliacao-fisica-perimetria/avaliacao-fisica-perimetria';
import { AvaliacaoFisicaDobrasCutaneasPage } from '../avaliacao-fisica-dobras-cutaneas/avaliacao-fisica-dobras-cutaneas';
import { AvaliacaoFisicaImcPage } from '../avaliacao-fisica-imc/avaliacao-fisica-imc';

/**
 * Generated class for the AvaliacaoFisicaDetalharPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliacao-fisica-detalhar',
  templateUrl: 'avaliacao-fisica-detalhar.html',
})
export class AvaliacaoFisicaDetalharPage {

  avaliacaoFisica: AvaliacaoFisica;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastDefautController,
    private avaliacaoFisicaService: AvaliacaoFisicaServiceProvider
  ) {
    this.avaliacaoFisica = this.navParams.get('avaliacaoFisica');

    if(this.avaliacaoFisica == null){
      this.toast.create('Ocorreu um erro ao detalhar sua avaliação física').present();
      this.navCtrl.setRoot(ListaAvaliacaoFisicaPage.name);
    }
  }

  ionViewDidLoad() {
  }

  carregarDados(){
    this.avaliacaoFisicaService.findAvaliacaoFisicaById(this.avaliacaoFisica.id)
    .subscribe((avaliacaoFisica: AvaliacaoFisica) =>{
      this.avaliacaoFisica = avaliacaoFisica;
    }, (error)=>{
      this.toast.create(error.message).present();
    });

  }

  abrirAnamnese(avaliacaoFisica: AvaliacaoFisica){
    if(avaliacaoFisica == null){
      this.toast.create('Ocorreu um erro ao detalhar a anamnese');
      return;
    }

    this.navCtrl.push(AvaliacaoFisicaAnamnesePage.name, {
      avaliacaoFisica: avaliacaoFisica,
      readOnly: true
    });

  }

  abrirPerimetria(avaliacaoFisica: AvaliacaoFisica){
    if(avaliacaoFisica == null){
      this.toast.create('Ocorreu um erro ao detalhar a perimetria');
      return;
    }

    this.navCtrl.push(AvaliacaoFisicaPerimetriaPage.name, {
      avaliacaoFisica: avaliacaoFisica,
      readOnly: true
    });

  }

  abrirDobrasCutaneas(avaliacaoFisica: AvaliacaoFisica){
    if(avaliacaoFisica == null){
      this.toast.create('Ocorreu um erro ao detalhar as medidas das dobras cutâneas');
      return;
    }

    this.navCtrl.push(AvaliacaoFisicaDobrasCutaneasPage.name, {
      avaliacaoFisica: avaliacaoFisica,
      readOnly: true
    });

  }

  abrirImc(avaliacaoFisica: AvaliacaoFisica){
    if(avaliacaoFisica == null){
      this.toast.create('Ocorreu um erro ao visuaizar seu Imc');
      return;
    }

    this.navCtrl.push(AvaliacaoFisicaImcPage.name,{
      avaliacaoFisica: avaliacaoFisica,
      readOnly: true
    })

  }

}
