import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, MenuController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/services/login-service/login-service';
import { finalize } from 'rxjs/operators';
import { LoadingDefaultController } from '../../utils/loading-default-controller';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    private readonly loading: LoadingDefaultController,
    private readonly authProvider: LoginServiceProvider,
    private readonly toastCtrl: ToastController,
    private menu: MenuController
  ) {

  }


  login(value: any) {
    let loading = this.loading.create('Fazendo Login..');

    loading.present();

    this.authProvider
      .login(value)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        () => {
          this.menu.enable(true)
        },
        err => this.handleError(err));
  }

  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Usuário ou senha incorretos';
    }
    else {
      message = 'Erro ao conectar com o servidor'
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
