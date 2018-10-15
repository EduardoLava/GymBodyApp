import { Injectable } from '@angular/core';

/*
  Generated class for the TimeUtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimeUtilProvider {

  constructor() {
  }

  /**
   * Retorna a quantidade de horas, de acordo com os segundos passados
   * @param segundos 
   */
  public getHoras(segundos: number): number{

    if(segundos != null){
      let segundosParse = parseInt(segundos.toString(), 10); // don't forget the second param
      return Math.floor(segundosParse / 3600);
    }
    return null;
  }

  public getMinutos(segundos: number): number {

    if(segundos == null){
      return null;
    }

    let segundosParse = parseInt(segundos.toString(), 10); // don't forget the second param

    let horas = this.getHoras(segundos);

    return Math.floor((segundosParse - (horas * 3600)) / 60);
  }

  public getSegundos(segundos: number): number {
    if(segundos == null){
      return null;
    }

    let segundosParse = parseInt(segundos.toString(), 10); // don't forget the second param

    return segundosParse - (this.getHoras(segundosParse) * 3600) - (this.getMinutos(segundosParse) * 60);

  }

  /**
   * atraves da data atual, seta os minutos e segundos de acordo com o cronometro
   * @param segundos 
   */
  getDateTime(segundos: number){
    let dataAtual = new Date();
    dataAtual.setHours(this.getHoras(segundos))
    dataAtual.setMinutes(this.getMinutos(segundos));
    dataAtual.setSeconds(this.getSegundos(segundos));
    dataAtual.setMilliseconds(0);

    console.log(dataAtual);
    console.log(dataAtual.getHours());
    console.log(dataAtual);

    return dataAtual;
  }

  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}

}
