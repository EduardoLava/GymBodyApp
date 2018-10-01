import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoFisicaAnamnesePage } from './avaliacao-fisica-anamnese';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AvaliacaoFisicaAnamnesePage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoFisicaAnamnesePage),
    TranslateModule.forChild(),
  ],
})
export class AvaliacaoFisicaAnamnesePageModule {}
