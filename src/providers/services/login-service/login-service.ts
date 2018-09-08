import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ReplaySubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SERVER_URL } from '../../../config/configServer';

import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  private jwtTokenName = 'jwt_token';

  /**
   *  ReplaySubject fornecido pela biblioteca RxJs para notificar outras partes do aplicativo 
   * quando o estado de autorização é alterado. 
   * 
   * Este objeto representa uma sequência observável, 
   * bem como um observador. 
   * Toda vez que o aplicativo chama nexteste objeto, 
   * todos os assinantes serão notificados. 
   * 
   * Usamos esse mecanismo para navegação do LoginPage 
   * para o seguro HomePagee vice-versa.
   * 
   */
  authUser = new ReplaySubject<any>(1);

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private jwthelper: JwtHelperService
  ) {

  }

  verificaLogin() {
    this.storage.get(this.jwtTokenName)
      .then(token => {
        // se tiver toke e ele não tiver expirado
        if (token && !this.jwthelper.isTokenExpired(token)) {
          // chama um metodo qualquer para que o jwtfilter verifique o token
          let promisse = this.http.get(`${SERVER_URL}/teste`)
          .subscribe(() => {
            this.authUser.next(token),
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

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    //let options = new RequestOptions({ headers: headers });
    
    
    let data= JSON.stringify({'login': dadosLogin.username, 'senha': dadosLogin.password});
    console.log(data);
    return this.http.post('http://192.168.0.15:8080/api-login',data, { headers: headers })
    .pipe(tap(token => this.saveLogin(token.data)));

  }

  /**
   * Faz logout, setando o token para null no dispositivo
   */
  logout() {
    this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
  }


  /**
   * 
   * @param token 
   */
  private saveLogin(token: string) {
    return this.storage.set(this.jwtTokenName, token)
      .then(() => this.authUser.next(token))
      .then(() => token);
  }

}
