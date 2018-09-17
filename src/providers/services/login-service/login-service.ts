import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpServiceProvider } from '../http-service/http-service';
import { SessionServiceProvider } from './session-service';

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
    private sessionManagment: SessionServiceProvider
  ) {

  }

  verificaLogin() {
    this.sessionManagment.getToken()
      .subscribe(token => {
        // se tiver toke e ele não tiver expirado
        if (token && !this.jwthelper.isTokenExpired(token)) {
          // chama um metodo qualquer para que o jwtfilter verifique o token
          this.http.get('/api/teste')
          .subscribe(() => {
            this.sessionManagment.setTokenTokenAtivo(token);
            this.sessionManagment.authUser.next(token),
              (erro) => this.logout();
          });
        } else {
          this.logout();
        }
      })
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

    return this.http.postResponseText(
      '/api-login', 
      {'login': dadosLogin.username, 'senha': dadosLogin.password}
    )
    .pipe(tap(token => this.sessionManagment.saveLogin(token)))
    .do(
      (token: string) => this.sessionManagment.setTokenTokenAtivo(token)
    );

    
  }

  /**
   * Faz logout, setando o token para null no dispositivo
   */
  logout() {
    this.sessionManagment.logout()
  }


 


}
