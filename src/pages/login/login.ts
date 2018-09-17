import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  constructor(private readonly navCtrl: NavController,
    private readonly loading: LoadingDefaultController,
    private readonly authProvider: LoginServiceProvider,
    private readonly toastCtrl: ToastController,
  ) {

  }


  login(value: any) {
    let loading = this.loading.create('Fazendo Login..');

    loading.present();

    this.authProvider
      .login(value)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        () => {console.log('sucesso')},
        err => this.handleError(err));
  }

  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Falha ao fazer login';
    }
    else {
      message = `Ocorreu um erro ao tentar fazer login: ${error.statusText}`;
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}