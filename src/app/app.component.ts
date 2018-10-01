import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListaTreinoPage } from '../pages/lista-treino/lista-treino';
import { TranslateService } from '@ngx-translate/core';
import { MinhaContaPage } from '../pages/minha-conta/minha-conta';
import { LoginServiceProvider } from '../providers/services/login-service/login-service';
import { LoginPage } from '../pages/login/login';
import { SessionServiceProvider } from '../providers/services/login-service/session-service';

import { ListaAvaliacaoFisicaPage } from '../pages/lista-avaliacao-fisica/lista-avaliacao-fisica';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //aqui troca a pagina de inico do app
  public rootPage:any = LoginPage;

  /*para recuperar um componente da view */
  @ViewChild(Nav)
  public nav: Nav;

  public paginas = [
    { titulo: 'MENU.HISTORICO', componente: ListaTreinoPage.name, icone: 'ai-history' },
    { titulo: 'MENU.TREINOS', componente: ListaTreinoPage.name, icone: 'ai-fitness' },
    { titulo: 'MENU.CONTA', componente: MinhaContaPage.name, icone: 'person' },
    { titulo: 'MENU.ALUNOS', componente: ListaTreinoPage.name, icone: 'people' },
    // { titulo: 'MENU.AGENDA', componente: ListaTreinoPage.name, icone: 'calendar' },
    { titulo: 'MENU.AVALIACAO.FISICA', componente: ListaAvaliacaoFisicaPage.name, icone: 'pulse' },
    { titulo: 'MENU.NOTIFICACOES', componente: ListaTreinoPage.name, icone: 'notifications' }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    translate: TranslateService,
    private sessionService: SessionServiceProvider,
    private loginService: LoginServiceProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // como usar o i18n https://github.com/ngx-translate/core#usage

    // para o caso de não existir outro idioma este será o padrao
    translate.addLangs(["pt-BR"]);
    translate.setDefaultLang("pt-BR");

    // defina para utitlizar o pt-br
    translate.use("pt-BR");

    this.verificarLogin();

  }

  irParaPagina(componente) {
    this.nav.setRoot(componente);
  }

  // get usuarioLogado(){ 
  //   return this.pessoaService.obtemPessoaLogada();
  // }

  /**
   * Fica ouvindo user auth, quando o método next é chamado
   * caso seja null volta para a pagina de login 
   * 
   * caso contrario vai para a página principal
   * 
   */
  verificarLogin(){
    this.sessionService.authUser.subscribe(token=>{
      if(token){
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage
      }
    });

    this.loginService.verificaLogin();

  }

  get token(){
    return this.sessionService.tokenTokenAtivo;
  }

  logout(){
    this.loginService.logout();
  }

}

