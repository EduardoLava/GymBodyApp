import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the TreinoDaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TreinoDaoProvider {

  private createTable: string = 
  ' CREATE TABLE IF NOT EXISTS pessoa ( '+
  '   id INTEGER PRIMARY KEY, '+
  '   nome '
  ' ) ';

  constructor(public http: HttpClient, private sqlite: SQLite) {
  }

  salvar(){

    this.sqlite.create({
      name: 'gym-body-app',
      location: 'default'
    }).then( (db: SQLiteObject) => {

    });
  }

}
