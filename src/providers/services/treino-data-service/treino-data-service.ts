import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { DatePipe } from '@angular/common';
import { TreinoData, Page } from '../../../model/entities';
import { DataUtil } from '../../../utils/data-util';

@Injectable()
export class TreinoDataServiceProvider {

  constructor(
    public http: HttpServiceProvider,
    private datePipe: DatePipe,
    private dataUtil: DataUtil
  ) {
  }

  /**
   * 
   * Lista treinos do aluno com base na data atual
   * 
   * @param idAluno 
   */
  listarTreinosByAluno(idAluno: number): Observable<TreinoData[]> {

    let dataInicio = new Date();

    let dataTermino = new Date();
    dataTermino = this.dataUtil.addDays(dataTermino,90);
    console.log('listarTreinos');
    let url = '/api/treino-datas/data-inicio/'+
    this.datePipe.transform(dataInicio, "yyyy-MM-dd")+
    '/data-termino/'+
    this.datePipe.transform(dataTermino, "yyyy-MM-dd")+
    '/aluno/'+
    idAluno+
    '/somente-completos/'+false+'/';

    // let url = '/api/treino-datas/data-inicio/'+this.datePipe.transform(dataInicio, "yyyy-MM-dd")+'/aluno/'+idAluno;

    return this.http.get<Page<TreinoData>>(url)
      .map((pageTrainosDatas: Page<TreinoData>)=>{
        return pageTrainosDatas.content.map((td: TreinoData) =>{
          return Object.assign(td);
        });
    }) as Observable<TreinoData[]>;
    
  }

  /**
   * Lista os treinos de acordo com os filtros
   * @param dataInicio 
   * @param dataTermino 
   * @param idAluno 
   * @param isSomenteCompletos 
   */
  listarTreinosByFilters(
    dataInicio: Date, 
    dataTermino: Date, 
    idAluno: number,
    isSomenteCompletos: boolean
  ): Observable<TreinoData[]> {

    let url = '/api/treino-datas/data-inicio/'+
    this.datePipe.transform(dataInicio, "yyyy-MM-dd")+
    '/data-termino/'+
    this.datePipe.transform(dataTermino, "yyyy-MM-dd")+
    '/aluno/'+
    idAluno+
    (
      isSomenteCompletos == null ?
      '/'
      :
      '/somente-completos/'+isSomenteCompletos+'/'
    );

    // let url = '/api/treino-datas/data-inicio/'+this.datePipe.transform(dataInicio, "yyyy-MM-dd")+'/aluno/'+idAluno;

    return this.http.get<Page<TreinoData>>(url)
      .map((pageTrainosDatas: Page<TreinoData>)=>{
        return pageTrainosDatas.content.map((td: TreinoData) =>{
          return Object.assign(td);
        });
    }) as Observable<TreinoData[]>;
    
  }

  /**
   * Busca os treinos para o histórico, 
   * 
   * @param dataInicio 
   * @param dataTermino 
   * @param idAluno 
   */
  listarTreinosByFiltersHistorico(
    dataInicio: Date, 
    dataTermino: Date, 
    idAluno: number,
  ): Observable<TreinoData[]> {

    let url = '/api/treino-datas/data-inicio/'+
    this.datePipe.transform(dataInicio, "yyyy-MM-dd")+
    '/data-termino/'+
    this.datePipe.transform(dataTermino, "yyyy-MM-dd")+
    '/aluno/'+
    idAluno+'/';

    // let url = '/api/treino-datas/data-inicio/'+this.datePipe.transform(dataInicio, "yyyy-MM-dd")+'/aluno/'+idAluno;

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
