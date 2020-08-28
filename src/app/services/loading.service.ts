import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingCtr: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingCtr.create({
      message: 'Cargando',
      cssClass: 'loading'
    });
    return await loading.present();
  }
  async closeLoading() {
    return await this.loadingCtr.dismiss();
  }

}
