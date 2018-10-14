import { Injectable } from '@angular/core';
import { Pessoa, Page } from '../../../model/entities';
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
  public pessoaLogada: Pessoa;

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

  /**
   * 
   * Altera senha de uma pessoa no servidor
   * 
   * @param idPessoa 
   * @param novaSenha 
   * @param senhaAntiga 
   */
  alteraSenha(idPessoa: number, novaSenha: string, senhaAntiga: string): Observable<any>{

    let parametros = {'senha' : novaSenha, 'id': idPessoa.toString(), 'senhaAntiga': senhaAntiga};

    return this.http.postResponseText('/api/pessoas/alterar-senha', parametros);
  }

  // salva pessoa no bd e remotamente
  salvar(pessoa: Pessoa): Observable<any>{
    
    console.log(pessoa+'\n\n');
    console.log( JSON.stringify(pessoa));

    return this.http.put('/api/pessoas', JSON.stringify(pessoa));
  } 

  /**
   * Lista pessoas por filtro
   * @param filter 
   */
  listPessoasByFilters(filter: string): Observable<Page<Pessoa>>{
    return this.http.get('/api/pessoas/'+filter.toString()+'/filters');
  }

  /**
   * Lista somente alunos por filtro
   * @param nome 
   */
  listarAlunosByNome(nome: string) : Observable<Page<Pessoa>>{

    if(nome != null && nome != ''){
      nome = nome+'/';
    }

    return this.http.get<Page<Pessoa>>('/api/pessoas/alunos/'+nome);

  }

}
