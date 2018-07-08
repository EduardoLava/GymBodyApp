import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarDadosPage } from './alterar-dados';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AlterarDadosPage,
  ],
  imports: [
    IonicPageModule.forChild(AlterarDadosPage),
    TranslateModule.forChild(),
  ],
})
export class AlterarDadosPageModule {}
