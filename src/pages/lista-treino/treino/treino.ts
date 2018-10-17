import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Navbar } from 'ionic-angular';
import { TimerComponent } from '../../../components/timer/timer';
import { PauseModalPage } from '../treino/pause-modal/pause-modal';
import { TreinoData, TreinoExercicio, Page, ExercicioRealizado } from '../../../model/entities';
import { LoadingDefaultController } from '../../../utils/loading-default-controller';
import { TreinoExercicioServiceProvider } from '../../../providers/services/treino-exercicio-service/treino-exercicio-service';
import { TreinoDataServiceProvider } from '../../../providers/services/treino-data-service/treino-data-service';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavLifecycles } from '../../../utils/nav-lifecycles';
import { YoutubeUrlServiceProvider } from '../../../providers/youtube-url-service/youtube-url-service';
// import { Observable } from 'rxjs';
import { ListaTreinoPage } from '../lista-treino';
import { DetalharExercicioPage } from '../../detalhar-exercicio/detalhar-exercicio';
import { TimeUtilProvider } from '../../../providers/time-util/time-util';
import { DatePipe } from '@angular/common';
// import { TreinoExercicioServiceProvider } from '../../../providers/services/treino-exercicio-service/treino-exercicio-service';

/**
 * 
 */
@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage implements NavLifecycles{

  @ViewChild(Navbar) navBar: Navbar;

// realizacao de treino

  @ViewChild('timerPrincipal')
  private timerPrincipal: TimerComponent;

  // treino da data escolhida
  public treinoData: TreinoData;

  // // exercicios do meu treino atual
  // public exercicioRealizacao: ExercicioRealizado[];

  // indice para apresentação na tela
  private indiceTreinoAtual: number;
  // treino no indice atual
  public exercicioAtual: ExercicioRealizado;

  imageUrl: string = '../../../assets/imgs/imagem-default.png';

  // percentual completo do treino, apresentado na tela
  percentualCompleto;
  // numero de exercicios já realizados
  quantidadeExerciciosCompletos: number;

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   * @param modalControler 
   * @param loading 
   * @param treinoExercicioService 
   * @param alertController 
   * @param treinoDataService 
   * @param toast 
   * @param timerUtil 
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private modalControler: ModalController,
    private loading: LoadingDefaultController,
    private treinoExercicioService: TreinoExercicioServiceProvider,
    private alertController: AlertController,
    private treinoDataService: TreinoDataServiceProvider,
    private toast: ToastDefautController,
    private timerUtil: TimeUtilProvider,
    private datePipe: DatePipe
  ) {

    this.treinoData = navParams.get('treinoData');
    // console.log(this.treinoData);
    if(this.treinoData == null){
      this.navCtrl.setRoot(ListaTreinoPage.name)
      return;
    }

    this.treinoData.horaInicio = new Date();

    if(this.treinoData.exerciciosRealizados == null){
      this.treinoData.exerciciosRealizados = [];
    }

    this.quantidadeExerciciosCompletos = 0;

  }
  
  /**
   * 
   */
  ionViewDidLoad(){

    this.navBar.backButtonClick = (e:UIEvent)=>{

      this.alertController.create({
        title: 'Sair do treino',
        subTitle: 'Se você voltar perderá todo seu progresso neste treino.\nDeseja continuar?',
         buttons: [
          {
            text: 'Não',
          },
          {
           text: 'Sim',
           handler: ()=> {this.navCtrl.pop()}
          }
        ]
      }).present();

     }

    this.carregaExercicios();

    // this.timerPrincipal.pauseTimer();

  }

  /**
   * Carrega os exercicios de um treino e popula a lista
   */
  carregaExercicios(){
    
    let loader = this.loading.create('Carregando seus exercícios..');
    loader.present();

    if(this.treinoData && this.treinoData.treino){
      this.treinoExercicioService
        .listaExerciciosByTreinoId(
          this.treinoData.treino.id
        ).finally( () => { 
          loader.dismiss(); 
        })
        .subscribe((exerciciosTreino: Page<TreinoExercicio>)=>{
          
          // console.log(exerciciosTreino);

          exerciciosTreino.content.forEach( (treinoExercicio: TreinoExercicio) =>{
            
            treinoExercicio.treino = null;

            let exercicioNovo = {treinoExercicio: treinoExercicio }

            this.treinoData.exerciciosRealizados.push(exercicioNovo);

          });

          this.indiceTreinoAtual = 0;

          this.setItemExercicioAtual(this.indiceTreinoAtual);

        }, 
        (erro) =>{
          this.loading.loader.dismiss();
          // apresenta mensagem de erro
          this.alertController.create({
            buttons: [{text: 'Ok'}],
            title: 'Problema de conexão',
            subTitle: 'Ocorreu um erro ao se conectar com o servidor, verifique sua conexão com a internet e tente novamente',
            message: "error "+ erro.error
          }).present();

          // depois fecha a tela de treinos
          this.navCtrl.pop();

        }
      );
    } else {
      loader.dismiss();
      this.alertController.create({
        buttons: [
          {
            text: 'Ok',
            handler: ()=>{ 
              this.navCtrl.pop();
            }
          }
        ],
        title: 'Erro',
        subTitle: 'Ocorreu um erro ao carregar os exercícios do seu treino.'
      }).present();

    }

  }

  /**
   * Avança para o próximo exericicio sem marca-lo com completo
   */
  proximoExercicio(){

    // verifica se a lista terá tamanho para pegar o proximo item
    if(!(this.treinoData.exerciciosRealizados.length == (this.indiceTreinoAtual + 1))){
      this.indiceTreinoAtual = this.indiceTreinoAtual + 1;
      
      this.setItemExercicioAtual(this.indiceTreinoAtual); 

      return;
      
    } 
    
    this.finalizar();
    
  }

  /**
   * Retorna ao exercicio anterior
   */
  exercicioAnterior(){
    
    if(this.indiceTreinoAtual != 0) {

      this.indiceTreinoAtual = this.indiceTreinoAtual - 1;

      this.setItemExercicioAtual(this.indiceTreinoAtual);

    }

  }
  
  /**
   * Seta qual é o exericicio atual do treino
   * @param indice 
   */
  setItemExercicioAtual(indice: number){

    this.exercicioAtual = this.treinoData.exerciciosRealizados[indice];

    if(this.exercicioAtual == null){
      return;
    }

    this.calculaPercentualCompleto();

    // if(this.exercicioAtual != null && this.exercicioAtual.treinoExercicio != null){
    //   // this.idVideo = this.youtubeServiceProvider.urlVideioByUrl(this.exercicioAtual.treinoExercicio.exercicio.linkVideo+'');
    //   // this.preparavideo(this.idVideo);
    // }

  }

  calculaPercentualCompleto(){
    
    this.percentualCompleto = (
      this.quantidadeExerciciosCompletos * 100
    )/this.treinoData.exerciciosRealizados.length;
    
    // arredonda para uma casa decimal
    this.percentualCompleto = this.percentualCompleto.toFixed(1);

  }
  
  completarExercicio(){

    this.exercicioAtual.completo = true;
    if(this.quantidadeExerciciosCompletos < this.treinoData.exerciciosRealizados.length){
      this.quantidadeExerciciosCompletos ++;
    }

    this.calculaPercentualCompleto();
    this.proximoExercicio();

  }

  /**
   * Carrega o vídeo para ser possível realizar sua execução no dispositivo
   * @param id 
   */
  // preparavideo(id){
  //   this.urlVideo = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+id);
  // }

  /**
   * Abra modal para detalhar exercicio, para que o usuári possa ver mais detalhes
   */
  detalharExercicio(){
    this.navCtrl.push(DetalharExercicioPage.name, {
      exercicio: this.exercicioAtual.treinoExercicio.exercicio
    });
  }

  /**
   * marca todos os exercícios do treino como completo e manda salvar no servidor
   */
  finalizar(){
    
    this.alertController.create({
      title: 'Finalizar treino',
      subTitle: 'Deseja finalizar o treino?',
      buttons: [
        {text: 'Não'},
        {text: 'Sim', handler: () => {
          
          this.loading.create('Salvando seu treino...').present();

          this.treinoData.exerciciosRealizados.forEach((exercicioRealizado: ExercicioRealizado)=>{
            exercicioRealizado.completo = true;
          });

          this.treinoData.exerciciosRealizados = this.treinoData.exerciciosRealizados;
          this.salvar(this.treinoData);

        }}
      ]
    }).present();

  }

  /**
   * envia os dados para api
   */
  salvar(treinoData: TreinoData){
    this.timerPrincipal.pauseTimer();

    let segundos = this.timerPrincipal.timer.timeRemaining;

    this.treinoData.tempoGasto = this.timerUtil.getDateTime(segundos);
    
    this.treinoData.tempoGasto = this.timerUtil.convertUTCDateToLocalDate(this.treinoData.tempoGasto);

    this.treinoData.horaTermino = new Date();

    this.treinoData.treino.treinoDatas = null;

    this.treinoDataService.salvarTreinoData(treinoData).subscribe(
      (treinoData: TreinoData) =>{

        this.treinoData = treinoData;
    
        // console.log(treinoData);
        this.loading.loader.dismiss();
        this.navCtrl.setRoot(ListaTreinoPage.name);

        this.toast.create(
          'Treino salvo com sucesso!'+
          '\nTempo total gasto: '+this.datePipe.transform(this.treinoData.tempoGasto, "HH:mm:ss")
        ).present();

      }, 
      (erro) =>{
        this.loading.loader.dismiss();
        this.alertController.create({
          buttons: [
            {
              text: 'Tentar novamente',
              handler: () => {
                this.salvar(treinoData);
              }
            },
            {
              text: 'Mais tarde',
              handler: () =>{
                // TODO salvar localmente
                this.navCtrl.setRoot(ListaTreinoPage.name); 
              }
            }
          ],
          title: 'Ocorreu ao finalizar',
          subTitle: 'Ocorreu um problema ao conectar-se com o servidor. Você pode verificar sua conexão com a internet e tentar novamente, ou deixar para mais tarde!'
        }).present();
      }
    );

  }


  // viewVideo(){
  //   let videoId = '4T7GoZBJIIc'
  //   //if we are on a device where cordova is available we user the youtube video player
  //   if (this.platform.is('cordova')) {
  //     this.youtubePlayer.openVideo(videoId);//opens video with videoId
  //   } else {
  //     //if we are not on a device where cordova is available we open the video in browser.
  //     window.open('https://www.youtube.com/watch?v=' + videoId);
  //   }
  // }

  // listarExercios(){
  //   // this.treinosExercicios = this.treinoExercicioService.listaExerciciosByTreinoId(this.treinoData.treino.id);
  // }

  /**
   * Da pause no cronômetro e apresenta modal para que o usuário possa continuar
   */
  pause(){

    this.timerPrincipal.pauseTimer();
    let modal = this.modalControler.create(
      PauseModalPage.name
    );

    // evento de quando o modal é fechado
    modal.onDidDismiss( () => {
      this.timerPrincipal.resumeTimer();
    });

    // abre o modal
    modal.present();

  }


}
