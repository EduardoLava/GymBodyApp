import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { PessoaServiceProvider } from '../../../providers/services/pessoa-service/pessoa-service';
import { Pessoa } from '../../../model/entities';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingDefaultController } from '../../../utils/loading-default-controller';

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

  private formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaService: PessoaServiceProvider,
    private dataPicker: DatePicker,
    private toast: ToastDefautController,
    private formBuilder: FormBuilder,
    private loading: LoadingDefaultController
  ) {
    this.pessoa = navParams.get('pessoa');
    // this.pessoa = this.pessoaService.obtemPessoaLogada();

    this.formGroup = formBuilder.group(
      {
        'nome': [this.pessoa.nome, Validators.required],
        'dataNascimento': [this.pessoa.dataNascimento, Validators.required],
        'genero' : [this.pessoa.genero, Validators.required],
        'login' : [this.pessoa.login, Validators.required]
      }
    );

  }

  // fecha a tela
  cancelar(){
    this.navCtrl.pop();
  }

  // invoca o servico para salvar os dados da pessoa
  salvar(){

    this.loading.create('Salvando...').present();

    this.pessoaService.salvar(this.pessoa).finally(
      () => this.loading.loader.dismiss()
    ).subscribe((pessoa: Pessoa)=>{

      this.pessoa = pessoa;

      this.toast.create(
        'Dados salvos com sucesso!'
      ).present();

      this.navCtrl.pop();

    });

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
