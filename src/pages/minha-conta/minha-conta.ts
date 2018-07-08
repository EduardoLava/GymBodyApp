import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlterarSenhaPage } from './alterar-senha/alterar-senha';
import { AlterarDadosPage } from './alterar-dados/alterar-dados';
import { PessoaServiceProvider } from '../../providers/services/pessoa-service/pessoa-service';

/**
 * Generated class for the MinhaContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html',
})
export class MinhaContaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalControler: ModalController,
    private pessoaService: PessoaServiceProvider
  ) {
  }

  get pessoa(){
    return this.pessoaService.obtemPessoaLogada();
  }

  // abre modal para alteração de senha
  abrirModalAlterarSenha(){

    this.modalControler.create(AlterarSenhaPage.name,{
      pessoa: this.pessoa
    }).present();

  }

  // abre modal para edicao de dados do usuário
  alterarDados(){

    this.modalControler.create(AlterarDadosPage.name,{
      pessoa: this.pessoa
    }).present();

  }

}
