import { Injectable } from "@angular/core";
import { ToastController, Toast } from "ionic-angular";

@Injectable()
export class ToastDefautController {

    private toast1: Toast;

    constructor(private toastCntrl: ToastController){
    }

    public create(mensagem: string){
        return this.toast1 = this.toastCntrl.create({
            message: mensagem,
            duration: 4000,
            position: 'middle'
        });
    }

    public get toast(){
        return this.toast1;
    }

}