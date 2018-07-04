import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListaTreinoPage } from '../pages/lista-treino/lista-treino';
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //aqui troca a pagina de inico do app
  rootPage:any = HomePage;

  /*para recuperar um componente da view */
  @ViewChild(Nav)
  public nav: Nav;

  public paginas = [
    { titulo: 'MENU.HISTORICO', componente: ListaTreinoPage.name, icone: 'ai-history' },
    { titulo: 'MENU.TREINOS', componente: ListaTreinoPage.name, icone: 'ai-fitness' },
    { titulo: 'MENU.CONTA', componente: ListaTreinoPage.name, icone: 'person' },
    { titulo: 'MENU.ALUNOS', componente: ListaTreinoPage.name, icone: 'people' },
    { titulo: 'MENU.AGENDA', componente: ListaTreinoPage.name, icone: 'calendar' },
    { titulo: 'MENU.AVALIACAO.FISICA', componente: ListaTreinoPage.name, icone: 'pulse' },
    { titulo: 'MENU.NOTIFICACOES', componente: ListaTreinoPage.name, icone: 'notifications' }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    translate: TranslateService
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

  }

  irParaPagina(componente) {
    this.nav.push(componente);
  }

}

