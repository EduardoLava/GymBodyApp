import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
import { TreinoData, ExercicioRealizado, Page } from '../../model/entities';
import { ExercicioRealizadoServiceProvider } from '../../providers/services/exercicio-realizado-service/exercicio-realizado-service';
import { Exercicio } from '../../model/treino/exercicio';
import { DetalharExercicioPage } from '../detalhar-exercicio/detalhar-exercicio';
import { ExercicioRealizadoDetalhesPage } from '../exercicio-realizado-detalhes/exercicio-realizado-detalhes';

/**
 * Generated class for the TreinoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-treino-detalhes',
  templateUrl: 'treino-detalhes.html',
})
export class TreinoDetalhesPage {

  treinoData: TreinoData;
  exerciciosRealizados: ExercicioRealizado[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public exercicioRealziadoService: ExercicioRealizadoServiceProvider,
    private loader: LoadingDefaultController,
    private alertCntrl: AlertController,
  ) {
    this.treinoData = this.navParams.get('treinoData');
    if(this.treinoData == null || this.treinoData.id == null){
      this.navCtrl.pop();
    }
    this.findExerciciosTreino(this.treinoData.id);
  }

  ionViewDidLoad() {
  }

  findExerciciosTreino(idDataTreino: number){
    
    if(idDataTreino == null){
      return;
    }

    this.loader.create("Carregando treino").present();

    this.exercicioRealziadoService.listExerciciosRealizadosByTreinoDataId(idDataTreino).
    finally(() =>{
      this.loader.loader.dismiss();
    }).subscribe((exerciciosRealizados: Page<ExercicioRealizado>) =>{
      this.exerciciosRealizados = [];
      if(exerciciosRealizados != null){
        this.exerciciosRealizados = exerciciosRealizados.content;
        console.log(this.exerciciosRealizados);
      }
    }, (erro) =>{
      this.alertCntrl.create({
        buttons: ['Ok'],
        title: 'Erro',
        subTitle: erro.error
      }).present();
    });
  }


  detalharExercicio(exercicioRealizado: ExercicioRealizado){
    if(exercicioRealizado){
      this.navCtrl.push(ExercicioRealizadoDetalhesPage.name, {
        exercicioRealizado: exercicioRealizado
      });
    }
  }

}
