// angular imports 
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// fim angular imports

// ionic imports
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePicker } from '@ionic-native/date-picker';
// import { SQLite } from '@ionic-native/sqlite';
// fim ionic imports

// ng imports
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// fim ng imports

import 'rxjs/add/operator/do';

// meus imports 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TreinoServiceProvider } from '../providers/services/treino-service/treino-service';
import { PessoaServiceProvider } from '../providers/services/pessoa-service/pessoa-service';
import { TreinoDataServiceProvider } from '../providers/services/treino-data-service/treino-data-service';
import { TreinoExercicioServiceProvider } from '../providers/services/treino-exercicio-service/treino-exercicio-service';
import { TreinoDaoProvider } from '../providers/daos/treino-dao/treino-dao';
import { LoginPage } from '../pages/login/login';


import {Storage, IonicStorageModule} from "@ionic/storage";

// fim meus imports 

// JWT 
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import { LoginServiceProvider } from '../providers/services/login-service/login-service';
import { HttpServiceProvider } from '../providers/services/http-service/http-service';
import { SessionServiceProvider } from '../providers/services/login-service/session-service';
import { LoadingDefaultController } from '../utils/loading-default-controller';
import { ToastDefautController } from '../utils/toast-default-contoller';
import { DatePipe } from '@angular/common';
import { YoutubeUrlServiceProvider } from '../providers/youtube-url-service/youtube-url-service';
import { TimeUtilProvider } from '../providers/time-util/time-util';
import { AvaliacaoFisicaServiceProvider } from '../providers/services/avaliacao-fisica-service/avaliacao-fisica-service';

import { CalendarModule } from "ion2-calendar";
import { DataUtil } from '../utils/data-util';
import { ExercicioRealizadoServiceProvider } from '../providers/services/exercicio-realizado-service/exercicio-realizado-service';

// import {} from 
// FIM JWT

export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => storage.get('jwt_token'),
    // diz que somente solicitacoes enviadas para localhost conterao Authorization no cabeçalho
    // nao é ncessário iniciar com http:// pois pode ocorrer de não enviar os headers
    whitelistedDomains: ['192.168.137.1:8080'],
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    IonicModule.forRoot(MyApp),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TreinoServiceProvider,
    PessoaServiceProvider,
    DatePicker,
    TreinoDataServiceProvider,
    TreinoExercicioServiceProvider,
    // SQLite,
    TreinoDaoProvider,
    LoginServiceProvider,
    HttpServiceProvider,
    SessionServiceProvider,
    LoadingDefaultController,
    ToastDefautController,
    DatePipe,
    YoutubeUrlServiceProvider,
    TimeUtilProvider,
    AvaliacaoFisicaServiceProvider,
    DataUtil,
    ExercicioRealizadoServiceProvider
    // YoutubeVideoPlayer
  ],
})
export class AppModule {

}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
