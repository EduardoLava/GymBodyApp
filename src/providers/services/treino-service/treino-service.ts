import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from '../http-service/http-service';
import { TreinoData, Page, Treino } from '../../../model/entities';
import { DataUtil } from '../../../utils/data-util';
import { DatePipe } from '@angular/common';

/*
  Generated class for the TreinoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TreinoServiceProvider {

  constructor(
    private http: HttpServiceProvider,
    private dataUtil: DataUtil,
    private datePipe: DatePipe
  ) {
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
    let url = '/api/treinos/data-inicio/'+
    this.datePipe.transform(dataInicio, "yyyy-MM-dd")+
    '/data-termino/'+
    this.datePipe.transform(dataTermino, "yyyy-MM-dd")+
    '/aluno/'+
    idAluno+
    '/somente-completos/'+false+'/';

    return this.http.get(url)
    .map((treinos: Page<Treino>)=>{
      let treinosData: TreinoData[] = [];
      if(treinos){
        treinos.content.forEach( (treino: Treino) =>{
          treino.treinoDatas.forEach( (treinoData: TreinoData ) =>{
            treinoData.treino = treino;
            treinosData.push(treinoData);
          })
        });
      }

      return this.ordenaPorData(treinosData);

    });
    
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

    let url = '/api/treinos/data-inicio/'+
    this.datePipe.transform(dataInicio, "yyyy-MM-dd")+
    '/data-termino/'+
    this.datePipe.transform(dataTermino, "yyyy-MM-dd")+
    '/aluno/'+
    idAluno+'/';

    return this.http.get<Page<Treino>>(url)
    .map((treinos: Page<Treino>)=>{
      let treinosData: TreinoData[] = [];
      if(treinos){
        treinos.content.forEach( (treino: Treino) =>{
          treino.treinoDatas.forEach( (treinoData: TreinoData ) =>{
            treinoData.treino = treino;
            treinosData.push(treinoData);
          })
        });
      }

      return this.ordenaPorData(treinosData);

    });
    
  }

  ordenaPorData(treinosData: TreinoData[]){
    if(treinosData){

      treinosData = treinosData.sort( (treinoData1, treinoData2): number => {
        console.log(treinoData1);
        console.log(treinoData2);

        let data1: Date = new Date(treinoData1.data);
        let data2: Date = new Date(treinoData2.data);

        if(data1 < data2) return -1;
        if(data1 > data2) return 1;
        return 0;
      });

      return treinosData;
    }
  }

}
