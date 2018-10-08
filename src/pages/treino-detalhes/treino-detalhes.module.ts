import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreinoDetalhesPage } from './treino-detalhes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TreinoDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(TreinoDetalhesPage),
    TranslateModule.forChild()
  ],
})
export class TreinoDetalhesPageModule {}
