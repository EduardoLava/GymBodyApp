import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoFisicaPerimetriaPage } from './avaliacao-fisica-perimetria';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AvaliacaoFisicaPerimetriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoFisicaPerimetriaPage),
    TranslateModule.forChild(),
  ],
})
export class AvaliacaoFisicaPerimetriaPageModule {}
