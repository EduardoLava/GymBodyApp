import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from '../http-service/http-service';
import { TreinoData } from '../../../model/entities';

/*
  Generated class for the TreinoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TreinoServiceProvider {

  constructor(private http: HttpServiceProvider) {
  }

  /**
   * 
   * busca um objeto do tipo TreinoData no servidor com os exercicios realizados
   * 
   * @param idTreino 
   */
  findTreinoDataById(idTreino: number) : Observable<TreinoData>{
    return this.http.get('/api/treino-datas/'+idTreino+'/');
  }


}
