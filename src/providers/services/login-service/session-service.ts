import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { Storage } from '@ionic/storage';

@Injectable()
export class SessionServiceProvider {


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
    public authUser = new ReplaySubject<any>(1);

    constructor(
        private storage: Storage,
    ) {

    }

    /**
     * Consulta no storage o token e retorna um observable
     */
    public getToken(): Observable<any> {
        console.log('chamou get token');
        return Observable.fromPromise(
            this.storage.get(this.jwtTokenName)
        );
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
  public saveLogin(token: string) {
    console.log('salvou o token '+token);

    return this.storage.set(this.jwtTokenName, token)
      .then(() => this.authUser.next(token))
      .then(() => token);
  }
  

}    