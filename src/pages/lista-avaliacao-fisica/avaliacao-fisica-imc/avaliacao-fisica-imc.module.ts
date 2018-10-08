import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoFisicaImcPage } from '../avaliacao-fisica-imc/avaliacao-fisica-imc';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AvaliacaoFisicaImcPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoFisicaImcPage),
    TranslateModule.forChild()
  ],
})
export class AvaliacaoFisicaImcPageModule {}
