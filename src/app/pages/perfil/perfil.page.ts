import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {FactoryService} from "../../services/factory.service";
import {LoadingService} from "../../services/loading.service";
import {NavController} from "@ionic/angular";
import {AlertService} from "../../services/alert.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  client;
  form;
  authState: any = null;
  photo;

  constructor(
      private afAuth: AngularFireAuth,
      private http: FactoryService,
      private loading: LoadingService,
      private navCtrl: NavController,
      private alert: AlertService
  ) {
    this.loading.presentLoading();
    this.afAuth.authState.subscribe(res => {
      this.authState = res;
      const userID = environment.production ? res.uid : 'MlrifWvUVnTps7GNvxoNjV48gbF2';
      this.getPhoto();
      this.http.setModule('clients');
      this.http.get({userID}).then((response: any) => {
        this.client = JSON.parse(JSON.stringify(response.data));
        this.form = response.data;
      }).finally(() => {
        this.loading.closeLoading();
      });
    });
  }
  getPhoto() {
    this.photo = this.authState ? this.authState.photoURL + '?type=large&redirect=true' :
        'https://graph.facebook.com/3107407929349183/picture?type=large&redirect=true';
  }

  save() {
    this.loading.presentLoading();
    this.http.setModule('clients/update');
    this.http.post(this.form).then((response: any) => {
      const header =  'Datos Actualziados';
      const message =  'Se actualizó los datos exitosamente';
      this.alert.messageSuccess(message, header);
    }).catch(error => {
      this.alert.messageError();
    }).finally(() => {
      this.loading.closeLoading();
    });
  }

  ngOnInit(): void {
  }
}
