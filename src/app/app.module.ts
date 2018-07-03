// angular imports 
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// fim angular imports

// ionic imports
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// fim ionic imports

// ng imports
import { TranslateModule, TranslateLoader, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// fim ng imports


// meus imports 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TreinoServiceProvider } from '../providers/treino-service/treino-service';
import { ListaTreinoPage } from '../pages/lista-treino/lista-treino';
// fim meus imports 


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListaTreinoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListaTreinoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TreinoServiceProvider
  ]
})
export class AppModule {

}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
