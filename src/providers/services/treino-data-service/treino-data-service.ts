import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TreinoData, Page } from '../../../model/entities';

@Injectable()
export class TreinoDataServiceProvider {

  constructor(
    public http: HttpServiceProvider,
    private datePipe: DatePipe
  ) {
  }

  /**
   * 
   * Lista treinos do aluno com base na data atual
   * 
   * @param idAluno 
   */
  listarTreinos(idAluno: number) : Observable<Page<TreinoData>> {

    let dataInicio = new Date();

    let url = '/api/treino-datas/data-inicio/'+this.datePipe.transform(dataInicio, "yyyy-MM-dd")+'/aluno/'+idAluno;

    return this.http.get<Page<TreinoData>>(url);
    // .map(t =>{
    //   return t.map(td =>{
    //     console.log(td);
    //     return new TreinoData(JSON.parse(JSON.stringify(td)));
    //   });
    // });
    
  }

}
