import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NavLifecycles } from '../../utils/nav-lifecycles';
import { TreinoDataServiceProvider } from '../../providers/services/treino-data-service/treino-data-service';
import { SessionServiceProvider } from '../../providers/services/login-service/session-service';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
import { TreinoData, Page } from '../../model/entities';
import { TreinoPage } from './treino/treino';
import { DatePipe } from '@angular/common';

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
  public dataAtual: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private treinoService: TreinoDataServiceProvider,
    private alertControler: AlertController,
    private sessionService: SessionServiceProvider,
    private loading: LoadingDefaultController,
    private datePipe: DatePipe
  ) {
    this.dataAtual = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  ionViewDidLoad() {
    
    this.loading.create('Carregando treinos').present();

    if(!this.sessionService.pessoalogada){
      this.loading.loader.dismiss();
      return;
    } 

    this.treinosData = null;

    this.treinoService.listarTreinos(this.sessionService.pessoalogada.id)
    .finally(() => this.loading.loader.dismiss())
    .subscribe((treinosData: TreinoData[] ) =>{
      
      this.treinosData = treinosData;
      console.log(this.treinosData);

    }, (error)=>{
      this.loading.loader.dismiss();
      this.alertControler.create({
        title: 'Erro',
        subTitle: 'Ocorreu um erro ao consultar seus treinos!\nVerifique sua conexão!',
        buttons: ['Ok']
      }).present();
    });

  }

  iniciarTreino(treinoData: TreinoData){
    this.alertControler.create({
      title: 'Iniciar Treino',
      subTitle: 'Deseja iniciar o treino?',
      buttons: [
        {text: 'Não'},
        {text: 'Sim', handler: () => {
          this.navCtrl.setRoot(TreinoPage.name,{
            treinoData: treinoData 
          });
        }}
      ]
    }).present();
  }

}
