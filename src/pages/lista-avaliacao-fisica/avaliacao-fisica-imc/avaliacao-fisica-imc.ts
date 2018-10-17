import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvaliacaoFisica, IndiceMassaCorporal } from '../../../model/entities';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { HomePage } from '../../home/home';
import { AvaliacaoFisicaServiceProvider } from '../../../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';
import { ListaAvaliacaoFisicaPage } from '../lista-avaliacao-fisica';
import { LoadingDefaultController } from '../../../utils/loading-default-controller';

/**
 * Generated class for the AvaliacaoFisicaImcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliacao-fisica-imc',
  templateUrl: 'avaliacao-fisica-imc.html',
})
export class AvaliacaoFisicaImcPage {

  // -----------------------------------------
  // ------------ ATRIBUTOS ------------------
  // -----------------------------------------

  public formImc: FormGroup;
  public avaliacaoAvaiacaoFisica: AvaliacaoFisica;
  public imc: IndiceMassaCorporal;
  public textoResultado: string = "";
  public corResultado: string;

  readOnly: boolean = false;
  edicao:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toast: ToastDefautController,
    private avaliacaoFisicaService: AvaliacaoFisicaServiceProvider,
    private loading: LoadingDefaultController
  ) {

    this.imc = {};

    this.avaliacaoAvaiacaoFisica = this.navParams.get('avaliacaoFisica');
    this.readOnly = navParams.get('readOnly');
    this.edicao = this.navParams.get('edicao');

    if(this.readOnly == null){
      this.readOnly = false;
      this.edicao = false;
    }
    if(
        this.avaliacaoAvaiacaoFisica == null 
        || this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica == null
        || this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica.indiceMassaCorporal == null
    ) {
      this.toast.create('Ocorreu um erro ao carregar a avaliação física');
      this.navCtrl.setRoot(HomePage.name);
    }

    this.imc = this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica.indiceMassaCorporal;
    this.calcularImc();
  }

  ionViewDidLoad() {}

  ngOnInit(){
    this.formImc = this.formBuilder.group({
      altura: [
        this.imc.altura,   
        Validators.compose([
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)'),
          Validators.required
        ]),
      ],
      peso: [
        this.imc.peso,
        Validators.compose([
          Validators.min(0), 
          Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)'),
          Validators.required
        ]),
      ]
    });

  }  
  
  /**
   * Realiza o calculo do imc de acodo com o preenchido no formulário
   */
  calcularImc(){
    
    
    if(
      this.imc == null
      || this.imc.altura == null 
      || this.imc.altura <= 0 
      || this.imc.peso == null
      || this.imc.altura.toString().length < 2
      || this.imc.peso.toString().length < 2
    ){
      this.imc.resultado = null;
      this.verificaResultado(this.imc.resultado);
      return;
    }

    console.log('this.imc.altura ' + this.imc.altura);

    let alturaMetros = (this.imc.altura / 100);
    console.log('Ametros '+alturaMetros);
    let alturaAoQuadrado: number = (alturaMetros * alturaMetros);

    console.log('quad '+alturaAoQuadrado);

    console.log('this.imc.peso '+this.imc.peso);

    this.imc.resultado = parseFloat((this.imc.peso / alturaAoQuadrado).toFixed(2));

    this.verificaResultado(this.imc.resultado);
  }

  verificaResultado(resultado: number){

    if(resultado == null){
      this.textoResultado = null,
      this.corResultado = null;
      return;
    }

    if(resultado < 16){
      this.textoResultado = "Magreza grave";
      this.corResultado = "magreza-grave";
    } else if(resultado < 17 ){
      this.textoResultado = "Magraza moderada";
      this.corResultado = "magreza-moderada";
    } else if(resultado < 18.5){
      this.textoResultado = "Magreza leve",
      this.corResultado = "magreza-leve";
    } else if(resultado < 25){
      this.textoResultado = "Saudável";
      this.corResultado = "saudavel";
    } else if(resultado < 30){
      this.textoResultado = "Sobrepeso";
      this.corResultado = "sobrepeso";
    } else if( resultado < 35 ){
      this.textoResultado = "Obesidade Grau I";
      this.corResultado = "obesidade-g1";
    } else if( resultado < 40 ){
      this.textoResultado = "Obesidade Grau II (severa)";
      this.corResultado = "obesidade-g2";
    } else {
      this.textoResultado = "Obesidade Grau III (mórbida)";
      this.corResultado = "obesidade-g3";
    }

  }

  salvar(){
    this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica.indiceMassaCorporal = this.imc;
    this.avaliacaoAvaiacaoFisica.pessoa.avaliacoesFisicas = null;

    this.loading.create('Salavando avaliação física').present();
    this.avaliacaoFisicaService.salvarAvaliacaoFisica(this.avaliacaoAvaiacaoFisica)
    .finally(()=>{
      this.loading.loader.dismiss();
    })
    .subscribe((avaliacao: AvaliacaoFisica) =>{
      this.avaliacaoAvaiacaoFisica = avaliacao;
      this.toast.create("Avaliacação física salva com sucesso!").present();
      this.navCtrl.setRoot(ListaAvaliacaoFisicaPage.name);
    }, (error) =>{
      console.log(error);
      this.toast.create(error.error).present();
    });

  }

  editar(){
    
    this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica.indiceMassaCorporal = this.imc;

    this.avaliacaoFisicaService
      .salvarAvaliacaoFisica(this.avaliacaoAvaiacaoFisica)
      .subscribe((avaliacao: AvaliacaoFisica) =>{
        this.toast.create('Avaliacao física atualizada com sucesso!').present();
        this.navCtrl.pop();
        }, (error) =>{
          this.toast.create('Erro ao salvar: '+ error.error).present();
        }
      );

  }

}
