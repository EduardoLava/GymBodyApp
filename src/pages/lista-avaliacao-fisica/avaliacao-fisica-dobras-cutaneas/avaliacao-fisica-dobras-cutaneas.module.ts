import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoFisicaDobrasCutaneasPage } from './avaliacao-fisica-dobras-cutaneas';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AvaliacaoFisicaDobrasCutaneasPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoFisicaDobrasCutaneasPage),
    TranslateModule.forChild(),
  ],
})
export class AvaliacaoFisicaDobrasCutaneasPageModule {}
