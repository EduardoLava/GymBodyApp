import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalharExercicioPage } from './detalhar-exercicio';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetalharExercicioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalharExercicioPage),
    TranslateModule.forChild(),
  ],
})
export class DetalharExercicioPageModule {}
