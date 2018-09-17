import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../../config/configServer';
import { Observable } from 'rxjs';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  constructor(
    public http: HttpClient,
  ) {
  }

  get headers(){
    let headers = new HttpHeaders();
    return headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // return headers = headers.set('Authorization', this.sessionService.getToken(). )
     // headers.append('Access-Control-Allow-Origin' , '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    //let options = new RequestOptions({ headers: headers });
  }

  // -----------------------------------------------
  // --------------- post --------------------------
  // -----------------------------------------------


    /**
   * Faz uma requisicao do tipo POST no servidor 
   * e captura a response com ContentType = Json
   * @param url 
   * @param data 
   */
  post(url: string, data: any): Observable<any> {

    data = JSON.stringify(data);

    url = `${SERVER_URL}`+url;

    return this.http.post(url, data, { 
      headers: this.headers, 
      responseType: 'json'
    }) ;

  }

  /**
   * Faz uma requisicao do tipo POST no servidor 
   * e captura a response com ContentType = Text
   * @param url 
   * @param data 
   */
  postResponseText(url: string, data: any): Observable<any> {

    data = JSON.stringify(data);

    url = `${SERVER_URL}`+url;

    console.log(url);
    console.log(data);

    return this.http.post(url, data, { 
      headers: this.headers, 
      responseType: 'text'
    }) ;

  }

  // ---------------------------------------------
  // -----------------  GET ----------------------
  // ---------------------------------------------

  /**
   * Faz uma requisição do tipo GET no servidor
   * 
   * @param url 
   */
  // get(url: string): Observable<any> {
  //   url = `${SERVER_URL}`+url;
  //   console.log(url);
  //   return this.http.get(url, {headers: this.headers});
  // }
  get(url: string, params?: HttpParams){
    url = `${SERVER_URL}`+url;


    console.log('Get in url '+url);
    console.log('http paramns '+ params);
    return this.http.get(url, {
      headers: this.headers,
      params: params
    });
  }

  // -----------------------------------------------
  // -----------------   PUT -----------------------
  // -----------------------------------------------

  /**
   * Realiza uma requisição do tipo PUT, 
   * @param url url para realização
   * @param data objeto json
   */
  put(url: string, data: string): Observable<any>{

    url = `${SERVER_URL}`+url;

    return this.http.put(url, data, {
      headers: this.headers,
      responseType: 'json'
    });


  }


}
