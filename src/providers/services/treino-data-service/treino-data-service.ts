import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
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
  listarTreinos(idAluno: number): Observable<TreinoData[]> {

    let dataInicio = new Date();

    let url = '/api/treino-datas/data-inicio/'+this.datePipe.transform(dataInicio, "yyyy-MM-dd")+'/aluno/'+idAluno;

    
    return this.http.get<Page<TreinoData>>(url)
      .map((pageTrainosDatas: Page<TreinoData>)=>{
        return pageTrainosDatas.content.map((td: TreinoData) =>{
          return Object.assign(td);
        });
    }) as Observable<TreinoData[]>;
    
  }

  salvarTreinoData(treinoDataRealizado: TreinoData): Observable<TreinoData> {

    // salvar localmente antes de enviar

    return this.http.post('/api/treino-datas/', treinoDataRealizado);

  }

}
