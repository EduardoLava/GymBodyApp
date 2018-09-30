import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Time } from '@angular/common';
import { Treino } from '../../../model/treino/treino';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from '../http-service/http-service';
import { ExercicioRealizado } from '../../../model/entities';

/*
  Generated class for the TreinoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TreinoServiceProvider {

  constructor(private http: HttpServiceProvider) {
  }


  public salvar(exerciciosRealizados: ExercicioRealizado[]) {


  }




}
