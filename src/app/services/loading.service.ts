import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading;
  constructor(private loadingCtr: LoadingController) { }

  async presentLoading() {
    this.loading = await this.loadingCtr.create({
      message: 'Cargando',
      cssClass: 'loading'
    });
    return await this.loading;
  }
  async closeLoading() {
    return await this.loadingCtr.dismiss();
  }

}
