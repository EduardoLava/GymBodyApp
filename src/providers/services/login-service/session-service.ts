import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { Storage } from '@ionic/storage';
import { Pessoa, Papel } from "../../../model/entities";

@Injectable()
export class SessionServiceProvider {

    private token: string;
    private jwtTokenName = 'jwt_token';
    private pessoaLodadaName = 'pessoa_logada';
    private pessoa: Pessoa;
    private isAdministradorOrPersonal: boolean = false;

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
        ).do(
            (token: string) => {
                this.setTokenTokenAtivo(token);
            }
        );
    }

    /**
      * Faz logout, setando o token para null no dispositivo
   */
    logout() {
        console.log('Fez Logout');
        this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
        this.setTokenTokenAtivo(null);
        this.setPessoaLogada(null);
    }

    /**
  * 
  * @param token 
  */
    public saveLogin(token: string) {
        this.setTokenTokenAtivo(token);
        console.log('salvou o token ' + token);
        return this.storage.set(this.jwtTokenName, token)
            .then(() => this.authUser.next(token))
            .then(() => token)
            ;
    }

    public salvaPessoaLogada(pessoa: Pessoa){
        this.storage.set(this.pessoaLodadaName, pessoa);
        console.log(pessoa);
        this.setPessoaLogada(pessoa);
        this.saveLogin(pessoa.tokenJwt);
    }

    public carregaPessoaLogada() : Observable<Pessoa>{
        return Observable.fromPromise(this.storage.get(this.pessoaLodadaName))
        .map((pessoa)=>{
            this.setPessoaLogada(pessoa);
            return pessoa;
        }) as Observable<Pessoa>
        ;
    }

    public get tokenTokenAtivo() {
        return this.token;
    }

    public setTokenTokenAtivo(token: string) {
        this.token = token;
    }

    public get pessoalogada(): Pessoa {
        return this.pessoa;
    }

    public setPessoaLogada(pessoa: Pessoa) {
        this.pessoa = pessoa;
        this.setIsAdministradorOrPersonal(pessoa);
        // console.log('PessoaLogada' + pessoa.id + ' ', pessoa.nome);
    }

    public getIsAdministradorOrPersonal(){
        return this.isAdministradorOrPersonal;
    }

    private setIsAdministradorOrPersonal(pessoa: Pessoa){
        this.isAdministradorOrPersonal = false;
        if(pessoa== null || pessoa.papeis == null){
            return false;
        }
        console.log('Papeis '+pessoa.papeis);
        pessoa.papeis.forEach((papel: Papel) =>{
            if(papel == 'ADMINISTRATOR' || papel == 'PERSONAL'){
                this.isAdministradorOrPersonal = true;
            }
        });

        console.log( this.isAdministradorOrPersonal)

    }

}    