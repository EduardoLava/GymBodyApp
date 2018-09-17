import { LoadingController, App, Config, Loading, LoadingOptions } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingDefaultController  {

    private loading;

    constructor(private loadingCtrl: LoadingController){
    }

    create(content: string){
        return this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: content
        });
    }

    get loader(): Loading{
        return this.loading;
    }
}