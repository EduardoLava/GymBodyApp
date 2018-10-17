import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvaliacaoFisica, DobrasCutaneas } from '../../../model/entities';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { AvaliacaoFisicaImcPage } from '../avaliacao-fisica-imc/avaliacao-fisica-imc';
import { ListaAvaliacaoFisicaPage } from '../lista-avaliacao-fisica';
import { AvaliacaoFisicaServiceProvider } from '../../../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';

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

  readOnly: boolean = false;
  edicao:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastDefautController,
    public formBuilder: FormBuilder,
    private avaliacaoFisicaService: AvaliacaoFisicaServiceProvider,
  ) {
    this.avaliacaoFisica = this.navParams.get('avaliacaoFisica');
    this.readOnly = navParams.get('readOnly');
    this.edicao = this.navParams.get('edicao');

    if(this.readOnly == null){
      this.readOnly = false;
      this.edicao = false;
    }

    if(
        this.avaliacaoFisica == null
        || this.avaliacaoFisica.avaliacaoAntropometrica == null
        || this.avaliacaoFisica.avaliacaoAntropometrica.dobrasCutaneas == null
    ) {
      this.toast.create('Ocorre um erro ao se comunicar com o servidor');
      this.navCtrl.setRoot(ListaAvaliacaoFisicaPage.name);
      return;
    }
  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    // assumindo como padrão o protocolo do Pollock
    if(
      this.avaliacaoFisica == null
      || this.avaliacaoFisica.avaliacaoAntropometrica == null
      || this.avaliacaoFisica.avaliacaoAntropometrica.dobrasCutaneas == null
    ) {
      this.navCtrl.setRoot(ListaAvaliacaoFisicaPage.name);
      return;
    }

    this.dobrasCutaneas = this.avaliacaoFisica.avaliacaoAntropometrica.dobrasCutaneas;

    console.log("dobras cutaneas "+this.dobrasCutaneas);

    console.log('Is guedes '+this.isProtocoloGuedes);

    this.formDobras = this.formBuilder.group({
      // abdominal, utilizado em ambos os protocolos
      abdominal: [
        this.dobrasCutaneas.abdominal,
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      axilarMedia: [
        this.dobrasCutaneas.axilarMedia, 
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      bicital: [this.dobrasCutaneas.bicital],
      coxa: [
        this.dobrasCutaneas.coxa,
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      panturrilha: [
        this.dobrasCutaneas.panturrilha,
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      peitoral: [
        this.dobrasCutaneas.peitoral,
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      subescapular: [
        this.dobrasCutaneas.subescapular, 
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      supraIliaca: [
        this.dobrasCutaneas.supraIliaca,
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      toracica: [
        this.dobrasCutaneas.toracica, 
        Validators.compose([Validators.required, Validators.min(0)])
      ],
      // triciptal utilizado em ambos os protocolos
      tricipal: [
        this.dobrasCutaneas.tricipal, 
        Validators.compose([Validators.required, Validators.min(0)])
      ],
    });

    console.log(this.formDobras);

  }

  /**
   * Avança etapa
   */
  proximaEtapa(){
    this.avaliacaoFisica.avaliacaoAntropometrica.dobrasCutaneas = this.dobrasCutaneas;
    console.log(this.formDobras);
    this.navCtrl.push(AvaliacaoFisicaImcPage.name, {
      avaliacaoFisica: this.avaliacaoFisica
    });
  }

  editar(){
    
    this.avaliacaoFisica.pessoa.avaliacoesFisicas = null;

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
