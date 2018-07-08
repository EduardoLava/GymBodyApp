import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NavLifecycles } from '../../utils/nav-lifecycles';
import { TreinoData } from '../../model/treino/treino-data';
import { TreinoPage } from './treino/treino';
import { TreinoDataServiceProvider } from '../../providers/services/treino-data-service/treino-data-service';

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
  ) {

  }

  ionViewDidLoad() {

    this.treinosData = this.treinoService.listarTreinos();

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
