import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { PessoaServiceProvider } from '../../../providers/services/pessoa-service/pessoa-service';
import { Pessoa } from '../../../model/entities';

/**
 * Generated class for the AlterarDadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alterar-dados',
  templateUrl: 'alterar-dados.html',
})
export class AlterarDadosPage {

  // pessoa logada no sistema
  private pessoa: Pessoa;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaService: PessoaServiceProvider,
    private dataPicker: DatePicker,
    private toastControler: ToastController
  ) {
    this.pessoa = {};
    // this.pessoa = this.pessoaService.obtemPessoaLogada();
  }

  // fecha a tela
  cancelar(){
    this.navCtrl.pop();
  }

  // invoca o servico para salvar os dados da pessoa
  salvar(){

    this.pessoaService.salvar(this.pessoa);

    this.toastControler.create({
      message: 'Dados salvos com sucesso!',
      duration: 4000,
      position: 'top'
    }).present();
    
    this.navCtrl.pop();

  }

  // abre modal com datepicker
  selecionaData(){
    this.dataPicker.show({
      date: new Date(),
      mode: 'date' 
    }).then(
      data => this.pessoa.dataNascimento = data
    );
  }

}
