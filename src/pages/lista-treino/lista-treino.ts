import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavLifecycles } from '../../utils/nav-lifecycles';
import { Treino } from '../../model/treino';
import { TreinoServiceProvider } from '../../providers/treino-service/treino-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ListaTreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-treino',
  templateUrl: 'lista-treino.html',
})
export class ListaTreinoPage implements NavLifecycles {

  treinos: Treino[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private treinoService: TreinoServiceProvider,
    public translateService: TranslateService
  ) {

  }

  ionViewDidLoad() {

    this.treinos = this.treinoService.listarTreinos();

    // this.translate.get("LISTAGEM.TREINO").subscribe((res:string) => {
      // console.log(res);
    // });
  }

}
