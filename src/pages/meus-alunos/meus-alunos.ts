import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Pessoa, Page } from '../../model/entities';
import { PessoaServiceProvider } from '../../providers/services/pessoa-service/pessoa-service';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
import { ListaTreinoPage } from '../lista-treino/lista-treino';
import { MinhaContaPage } from '../minha-conta/minha-conta';
import { HomePage } from '../home/home';

/**
 * Generated class for the MeusAlunosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-alunos',
  templateUrl: 'meus-alunos.html',
})
export class MeusAlunosPage {

  alunos: Pessoa[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaService: PessoaServiceProvider,
    private loader: LoadingDefaultController,
    private alertCntrl: AlertController,
    private actionSheet: ActionSheetController
  ) {
    this.alunos = [];
  }

  ionViewDidLoad() {
    this.listAlunosByNome("");
  }

  listAlunosByNome(nome: string){
    this.loader.create('Carregando alunos..').present();
    this.pessoaService.listarAlunosByNome(nome)
    .finally(()=> this.loader.loader.dismiss())
    .subscribe((alunos: Page<Pessoa>)=>{
      if(alunos){
        this.alunos = alunos.content;
      }
    }, (error) =>{
      this.alertCntrl.create({
        buttons: ['Ok'],
        title: 'Erro',
        subTitle: error.error
      });
    });
  }

  openAction(aluno: Pessoa){

    this.actionSheet.create({
      title: 'Visualizar',
      cssClass: 'action-sheet',
      buttons: [
        {
          text: 'Dados do aluno',
          icon: 'person',
          cssClass: 'item-action-sheet',
          handler: ()=> {
            this.visualizarDados(aluno)
          } 
        },
        {
          text: 'Treinos',
          icon: 'ai-fitness',
          cssClass: 'item-action-sheet',
          handler: ()=>{
            this.visualizarTreinos(aluno);
          }
        },
        {
          text: 'Histórico de treinos',
          icon: 'ai-history',
          cssClass: 'item-action-sheet',
          handler: ()=>{
            this.visualizarHistorico(aluno);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'exit',
          cssClass: 'item-action-sheet-cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();

  }

  visualizarTreinos(aluno: Pessoa){
    if(aluno) {
      this.navCtrl.push(ListaTreinoPage.name, {
        pessoa: aluno
      });
    }
  }

  visualizarDados(aluno: Pessoa){
    if(aluno) {
      this.navCtrl.push(MinhaContaPage.name, {
        pessoa: aluno
      });
    }
  }

  visualizarHistorico(aluno: Pessoa){
    if(aluno){
      this.navCtrl.push(HomePage, {
        pessoa: aluno
      });
    }
  }

}
