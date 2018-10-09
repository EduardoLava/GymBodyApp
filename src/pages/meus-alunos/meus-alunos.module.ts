import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusAlunosPage } from './meus-alunos';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MeusAlunosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusAlunosPage),
    TranslateModule.forChild()
  ],
})
export class MeusAlunosPageModule {}
