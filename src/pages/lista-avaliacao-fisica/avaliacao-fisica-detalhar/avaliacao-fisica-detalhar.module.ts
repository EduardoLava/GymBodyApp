import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoFisicaDetalharPage } from './avaliacao-fisica-detalhar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AvaliacaoFisicaDetalharPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoFisicaDetalharPage),
    TranslateModule.forChild()
  ],
})
export class AvaliacaoFisicaDetalharPageModule {}
