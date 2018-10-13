import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the YoutubeUrlServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YoutubeUrlServiceProvider {

  constructor(public http: HttpClient) {
  }

  urlVideioByUrl(url: string): string{
    if(url == null || url == ''){
      return null;
    }

    let indiceInicio = url.indexOf('=')+1;
    let indiceFinal = url.length;

    if(url.indexOf('&') > 0){
      indiceFinal = url.indexOf('&')
    }


    let idVideo = url.substring(indiceInicio, indiceFinal);
    console.log(idVideo);
    return idVideo;

  }

}
