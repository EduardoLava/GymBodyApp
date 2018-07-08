import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhaContaPage } from './minha-conta';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MinhaContaPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhaContaPage),
    TranslateModule.forChild(),
  ],
})
export class MinhaContaPageModule {}
