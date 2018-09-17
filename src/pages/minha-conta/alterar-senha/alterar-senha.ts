import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pessoa } from '../../../model/entities';
import { PessoaServiceProvider } from '../../../providers/services/pessoa-service/pessoa-service';
import { ToastDefautController } from '../../../utils/toast-default-contoller';
import { LoadingDefaultController } from '../../../utils/loading-default-controller';

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
    private loading: LoadingDefaultController,
    private toast: ToastDefautController,
    private pessoaService: PessoaServiceProvider,
  ) {
    
    this.pessoa = this.navParams.get('pessoa');

    console.log(this.pessoa);
    console.log(this.pessoa.senha);


    this.formGroup = this.formBuilder.group({
      senhaAtual: ['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      novaSenha: ['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      confirmacaoSenha: ['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])]
    });

  }

  confirmar( camposFormulario ){

    // senha está criptografada, validação é feita no servidor
    // if(camposFormulario.senhaAtual != this.pessoa.senha) {

    //   this.alertControler.create({
    //     title: 'Erro',
    //     subTitle: '',
    //     buttons: ['OK']
    //   }).present();

    //   return;
    // }

    if(camposFormulario.confirmacaoSenha != camposFormulario.novaSenha){

      this.alertControler.create({
        title: 'Campos inválidos',
        subTitle: 'A nova senha não confere com a confirmação!',
        buttons: ['OK']
      }).present();

      return;

    }

    if( this.formGroup.valid ){

      this.loading.create('Aguarde...').present();

      this.pessoaService.alteraSenha(
        this.pessoa.id, 
        camposFormulario.novaSenha, 
        camposFormulario.senhaAtual
      )
      .finally(()=> this.loading.loader.dismiss())
      .subscribe(
        () =>{
          // manda salvar.....
          this.toast.create('Senha alterada com sucesso').present();
          this.pessoa.senha = camposFormulario.novaSenha;
          this.navCtrl.pop();
        }, 
        (erro) =>{

          this.alertControler.create({
              buttons: ['Ok'],
              subTitle: erro.error,
              title: 'Erro ao alterar senha',
            }).present();

          }
        );

      }

  }

  cancelar(){
    this.navCtrl.pop();
  }

}
