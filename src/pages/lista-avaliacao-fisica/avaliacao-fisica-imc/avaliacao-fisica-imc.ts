import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvaliacaoFisica, IndiceMassaCorporal } from '../../../model/entities';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { HomePage } from '../../home/home';
import { AvaliacaoFisicaServiceProvider } from '../../../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';
import { ListaAvaliacaoFisicaPage } from '../lista-avaliacao-fisica';

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

  private formImc: FormGroup;
  private avaliacaoAvaiacaoFisica: AvaliacaoFisica;
  private imc: IndiceMassaCorporal;
  public textoResultado: string = "";
  public corResultado: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toast: ToastDefautController,
    private avaliacaoFisicaService: AvaliacaoFisicaServiceProvider,
  ) {
    this.avaliacaoAvaiacaoFisica = this.navParams.get('avaliacaoFisica');

    if(
        this.avaliacaoAvaiacaoFisica == null 
        || this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica == null
        || this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica.indiceMassaCorporal == null
    ) {
      this.toast.create('Ocorreu um erro ao carregar a avaliação física');
      this.navCtrl.setRoot(HomePage.name);
    }

    this.imc = this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica.indiceMassaCorporal;
  }

  ionViewDidLoad() {
  }  
  
  ngOnInit(){
    console.log('passsou');
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
      this.imc.altura == null 
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

    console.log(typeof this.avaliacaoAvaiacaoFisica.avaliacaoAntropometrica);

    console.log('save');
    this.avaliacaoFisicaService.salvarAvaliacaoFisica(this.avaliacaoAvaiacaoFisica)
    .subscribe((avaliacao: AvaliacaoFisica) =>{
      this.avaliacaoAvaiacaoFisica = avaliacao;
      this.toast.create("Avaliacação física salva com sucesso!").present();
      this.navCtrl.setRoot(ListaAvaliacaoFisicaPage.name);
    }, (error) =>{
      this.toast.create(error.message).present();
    });

  }

}
