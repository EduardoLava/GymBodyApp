import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { Observable } from 'rxjs';
import { Page, TreinoExercicio } from '../../../model/entities';

/*
  Generated class for the TreinoExercicioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TreinoExercicioServiceProvider {

  constructor(private http: HttpServiceProvider) { }

  /**
   * 
   * Realiza uma busca dos exercicios de um treino através de seu ID
   * 
   * @param idTreino 
   * 
  */
  listaExerciciosByTreinoId(idTreino: Number) : Observable<Page<TreinoExercicio>>{

    return this.http.get<Page<TreinoExercicio>>('/api/treinos-exercicios/treino-id/'+idTreino);

  }

}
