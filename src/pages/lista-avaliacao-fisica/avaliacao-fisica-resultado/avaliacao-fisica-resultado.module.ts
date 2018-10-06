import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoFisicaResultadoPage } from '../avaliacao-fisica-resultado/avaliacao-fisica-resultado';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AvaliacaoFisicaResultadoPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoFisicaResultadoPage),
    TranslateModule.forChild()
  ],
})
export class AvaliacaoFisicaResultadoPageModule {}
