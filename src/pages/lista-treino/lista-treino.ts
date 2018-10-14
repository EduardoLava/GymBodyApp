import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NavLifecycles } from '../../utils/nav-lifecycles';
import { TreinoDataServiceProvider } from '../../providers/services/treino-data-service/treino-data-service';
import { SessionServiceProvider } from '../../providers/services/login-service/session-service';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
import { TreinoData, Pessoa } from '../../model/entities';
import { TreinoPage } from './treino/treino';
import { DatePipe } from '@angular/common';
import { ToastDefautController } from '../../utils/toast-default-contoller';

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

  pessoa: Pessoa;
  apresentarMenu = false;
  apresentarNome = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private treinoService: TreinoDataServiceProvider,
    private alertControler: AlertController,
    private sessionService: SessionServiceProvider,
    private loading: LoadingDefaultController,
    private datePipe: DatePipe,
    private toast: ToastDefautController
  ) {
    this.dataAtual = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    
    this.pessoa = this.navParams.get('pessoa');
    if(this.pessoa == null){
      this.apresentarNome = false;
      this.apresentarMenu = true;
      this.pessoa = this.sessionService.pessoalogada;
    }

  }

  ionViewDidLoad() {
    
    this.loading.create('Carregando treinos').present();

    if(this.pessoa == null){
      this.loading.loader.dismiss();
      return;
    } 
    this.treinosData = null;

    this.treinoService.listarTreinosByAluno(this.pessoa.id)
    .subscribe((treinosData: TreinoData[] ) =>{
      this.loading.loader.dismiss();
      this.treinosData = treinosData;

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

    if(this.pessoa == null || this.sessionService.pessoalogada == null){
      this.sessionService.logout();
      return;
    }

    if(this.pessoa.id != this.sessionService.pessoalogada.id){
      this.toast.create('Você não pode iniciar o treino de: '+this.pessoa.nome).present();
      return;
    }

    this.alertControler.create({
      title: 'Iniciar Treino',
      subTitle: 'Deseja iniciar o treino?',
      buttons: [
        {text: 'Não'},
        {text: 'Sim', handler: () => {
          this.navCtrl.push(TreinoPage.name,{
            treinoData: treinoData 
          });
        }}
      ]
    }).present();
  }

}
