import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { Observable } from 'rxjs';
import { Page, ExercicioRealizado } from '../../../model/entities';

/*
  Generated class for the ExercicioRealizadoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExercicioRealizadoServiceProvider {

  constructor(public http: HttpServiceProvider) {
  }

  listExerciciosRealizadosByTreinoDataId(idTreinoData: number) : Observable<Page<ExercicioRealizado>>{
    return this.http.get('/api/exercicios-realizados/treino-data-id/'+idTreinoData+'/');
  }

}
