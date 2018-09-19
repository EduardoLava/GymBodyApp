import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NavLifecycles } from '../../utils/nav-lifecycles';
import { TreinoDataServiceProvider } from '../../providers/services/treino-data-service/treino-data-service';
import { SessionServiceProvider } from '../../providers/services/login-service/session-service';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
import { TreinoData, Page } from '../../model/entities';
import { TreinoPage } from './treino/treino';

/**
 * Generated class for the ListaTreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-treino',
  templateUrl: 'lista-treino.html',
})
export class ListaTreinoPage implements NavLifecycles {
// listagem de treino

  public treinosData: TreinoData[];
  public dataAtual: string = new Date().toISOString();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private treinoService: TreinoDataServiceProvider,
    private alertControler: AlertController,
    private sessionService: SessionServiceProvider,
    private loading: LoadingDefaultController
  ) {

  }

  ionViewDidLoad() {
    
    this.loading.create('Carregando treinos').present();

    this.treinoService.listarTreinos(this.sessionService.pessoalogada.id)
    .finally(() => this.loading.loader.dismiss())
    .subscribe((treinosData: Page<TreinoData> ) =>{
      
      this.treinosData = treinosData.content;

      console.log(this.treinosData);

      console.log(this.treinosData[0].treino);

      console.log(this.treinosData[1].treino);
      
      console.log(this.treinosData[2].treino);

    });

  }

  iniciarTreino(treinoData: TreinoData){
    this.alertControler.create({
      title: 'Iniciar Treino',
      subTitle: 'Deseja iniciar o treino?',
      buttons: [
        {text: 'Não'},
        {text: 'Sim', handler: () => {
          console.log('Abrir tela');
          this.navCtrl.push(TreinoPage.name,{
            treinoData: treinoData 
          });
        }}
      ]
    }).present();
  }

}
