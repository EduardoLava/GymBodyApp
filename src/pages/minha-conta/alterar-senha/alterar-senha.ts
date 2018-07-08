import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Pessoa } from '../../../model/pessoa/pessoa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AlterarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html',
})
export class AlterarSenhaPage {

  // atributos necessarios para alteração de senha
 /*  public senhaAtual: string;
  public novaSenha: string;
  public confirmacaoSenha: string;
   */
  private pessoa: Pessoa;

  // form group 
  private formGroup: FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertControler: AlertController,
    private toast: ToastController
  ) {
    this.pessoa = this.navParams.get("pessoa");
    console.log(this.pessoa.senha);


    this.formGroup = this.formBuilder.group({
      senhaAtual: ['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      novaSenha: ['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      confirmacaoSenha: ['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])]
    });

  }

  confirmar( camposFormulario ){

    if(camposFormulario.senhaAtual != this.pessoa.senha) {

      this.alertControler.create({
        title: 'Erro',
        subTitle: 'O campo senha atual não confere com a sua senha!',
        buttons: ['OK']
      }).present();

      return;
    }

    if(camposFormulario.confirmacaoSenha != camposFormulario.novaSenha){

      this.alertControler.create({
        title: 'Campos inválidos',
        subTitle: 'A nova senha não confere com a confirmação!',
        buttons: ['OK']
      }).present();

      return;

    }

    if( this.formGroup.valid ){
      console.log('is valid');
      // manda salvar.....
      this.pessoa.senha = camposFormulario.novaSenha;
      this.navCtrl.pop();

      this.toast.create({
        message: 'Senha alterada com sucesso!',
        duration: 2000,
        position: 'middle'
      }).present();
    }
    

  }

  cancelar(){
    this.navCtrl.pop();
  }

}
