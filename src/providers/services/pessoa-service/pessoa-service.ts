import { Injectable } from '@angular/core';
import { Pessoa } from '../../../model/entities';
import { HttpServiceProvider } from '../http-service/http-service';
import 'rxjs/add/operator/mergeMap';
import { LoginServiceProvider } from '../login-service/login-service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionServiceProvider } from '../login-service/session-service';


/*
  Generated class for the PessoaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PessoaServiceProvider {

  // pessoa logada no aplicativo
  private pessoaLogada: Pessoa;

  constructor(
    public http: HttpServiceProvider,
    public loginService: LoginServiceProvider,
    private sessionaManagment: SessionServiceProvider
  ) {}

  // obtem pessoa logada no sistema caso exista
  obtemPessoaLogada() : Observable<any> {
    
    console.log('obtem pessoa logada');

      // flat map para encadear a chamada de observables
      return this.sessionaManagment.getToken().flatMap(token => {

        let params = new HttpParams();
        params = params.append('token', token);

        return this.http.get('/api/pessoa-token', params);

      });

  }

  // salva pessoa no bd e remotamente
  salvar(pessoa: Pessoa){
    console.log(pessoa);
    ///
  }

}
