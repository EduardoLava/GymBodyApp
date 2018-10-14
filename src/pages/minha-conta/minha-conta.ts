import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlterarSenhaPage } from './alterar-senha/alterar-senha';
import { AlterarDadosPage } from './alterar-dados/alterar-dados';
import { PessoaServiceProvider } from '../../providers/services/pessoa-service/pessoa-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pessoa } from '../../model/entities';
import { SessionServiceProvider } from '../../providers/services/login-service/session-service';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
import { ToastDefautController } from '../../utils/toast-default-contoller';

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
export class MinhaContaPage implements OnInit{

  // pessoa carregada na tela
  private pessoa: Pessoa;
  // token
  public user: string;

  apresentarMenu = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalControler: ModalController,
    private pessoaService: PessoaServiceProvider,
    private sessionService: SessionServiceProvider,
    jwtHelper: JwtHelperService,
    private loading: LoadingDefaultController,
    private toast: ToastDefautController,
  ) {

    this.pessoa = this.navParams.get('pessoa');

    this.sessionService.authUser.subscribe(jwt => {
      if (jwt) {
        const decoded = jwtHelper.decodeToken(jwt);
        this.user = decoded.sub
        console.log(this.user);
      }
      else {
        this.user = null;
      }
    });

  }

  ngOnInit(){
    
    if(this.pessoa != null){
      return;
    }
    this.apresentarMenu = true;
    this.loading.create('Carregando dados...');

    this.loading.loader.present();

    this.pessoaService.obtemPessoaLogada()
    .finally(()=> this.loading.loader.dismiss())
    .subscribe((pessoa:Pessoa) => {
      this.pessoa = pessoa;
    }, (erro: Error)=>{
      console.log(erro);
      this.toast.create(erro.message).present();
    });
  }

  // abre modal para alteração de senha
  abrirModalAlterarSenha(){

    this.modalControler.create(AlterarSenhaPage.name,{
      pessoa: this.pessoa
    }).present();

  }

  // abre modal para edicao de dados do usuário
  alterarDados(){

    let modal =this.modalControler.create(AlterarDadosPage.name,{
      pessoa: this.pessoa
    });

    modal.present();

  }

}
