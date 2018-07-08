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

// cordova imports
import { DatePicker } from '@ionic-native/date-picker';
// Fim cordova imports

// ng imports
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// fim ng imports


// meus imports 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TreinoServiceProvider } from '../providers/services/treino-service/treino-service';
import { PessoaServiceProvider } from '../providers/services/pessoa-service/pessoa-service';
import { TreinoDataServiceProvider } from '../providers/services/treino-data-service/treino-data-service';
// fim meus imports 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TreinoServiceProvider,
    PessoaServiceProvider,
    DatePicker,
    TreinoDataServiceProvider
  ],
})
export class AppModule {

}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
