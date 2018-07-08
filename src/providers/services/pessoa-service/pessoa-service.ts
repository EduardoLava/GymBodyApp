import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../../../model/pessoa/pessoa';

/*
  Generated class for the PessoaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PessoaServiceProvider {

  // pessoa logada no aplicativo
  private pessoaLogada: Pessoa;

  constructor(public http: HttpClient) {}

  // obtem pessoa logada no sistema caso exista
  obtemPessoaLogada(){

    if(this.pessoaLogada == null){
      let pessoa = new Pessoa();
      pessoa.dataNascimento = new Date('2018-01-01').toISOString();
      pessoa.email="teste@email.com";
      pessoa.isAtivo = true;
      pessoa.login = "pessoa.teste";
      pessoa.nome= "personal teste";
      pessoa.objetivo = "Ganhar mass,a muscular, teste teste teste teste teste teste teste teste ";
      pessoa.senha = "senhasenha";
      pessoa.genero = "Feminino";
    
      this.pessoaLogada = pessoa;
    }

    return this.pessoaLogada;
  }

  // salva pessoa no bd e remotamente
  salvar(pessoa: Pessoa){
    console.log(pessoa);
    ///
  }

}
