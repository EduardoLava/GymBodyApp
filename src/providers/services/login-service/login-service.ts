import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpServiceProvider } from '../http-service/http-service';
import { SessionServiceProvider } from './session-service';
import { Pessoa } from '../../../model/entities';
import { MenuController } from 'ionic-angular';

/**
 * 
 * Ele verifica o JWT, envia solicitações de login 
 *  e de inscrição para o servidor e manipula as resposta.
 * 
 * 
 * 
 */
@Injectable()
export class LoginServiceProvider {

  constructor(
    private http: HttpServiceProvider,
    private jwthelper: JwtHelperService,
    private sessionManagment: SessionServiceProvider,
    private menu: MenuController,
  ) {

  }

  verificaLogin() {

    this.sessionManagment.getToken()
      .subscribe(token => {
        // se tiver toke e ele não tiver expirado
        if (token && !this.jwthelper.isTokenExpired(token)) {
          // chama um metodo qualquer para que o jwtfilter verifique o token
          this.http.get('/api/valida-login')
          .map(() => {
            this.sessionManagment.carregaPessoaLogada();
            this.sessionManagment.setTokenTokenAtivo(token);
            this.sessionManagment.authUser.next(token),
              (erro) => this.logout();
          });
        } else {
          this.logout();
        }
      }, (erro) =>{
        console.log(erro.message);
      });
  }

  /**
   * Realiza chamada ao webservice fazendo login pelo jwt
   * @param login 
   */
  login(dadosLogin: any): Observable<any> {
    this.logout();
    console.log(dadosLogin);
    console.log({ 'login': dadosLogin.username, 'senha': dadosLogin.password });

    // let headers = new HttpHeaders();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );

    // let data= new FormData();
    // data.append('login', dadosLogin.username);
    // data.append('senha', dadosLogin.password);

    // return this.http.post(
    //   `${SERVER_URL}/api-login`,
    //   data
    // )
    // observable.subscribe((token)=> this.saveLogin(token));
    // .pipe(tap(token => this.saveLogin(token.data)));

    return this.http.post(
      '/api-login', 
      {'login': dadosLogin.username, 'senha': dadosLogin.password}
    )
    .pipe(tap(pessoa => this.sessionManagment.salvaPessoaLogada(pessoa)))
    .do(
      (pessoa: Pessoa) => {
        this.sessionManagment.setTokenTokenAtivo(pessoa.tokenJwt);
        // this.sessionManagment.setPessoaLogada(pessoa);
      }
    );

    
  }

  /**
   * Faz logout, setando o token para null no dispositivo
   */
  logout() {
    this.sessionManagment.logout();
    this.menu.enable(false);
  }


 


}
