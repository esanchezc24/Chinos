import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {FactoryService} from "../../../services/factory.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {ParamsService} from "../../../services/params.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../../services/loading.service";
import {environment} from "../../../../environments/environment";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  client;
  authState: any = null;
  orders: any = [];
  constructor(
      private afAuth: AngularFireAuth,
      private factoyService: FactoryService,
      private loading: LoadingService,
      private alert: AlertService,
      private paramsService: ParamsService,
      private router: Router
  ) {

  }

  ionViewWillEnter() {
    this.loading.presentLoading();
    this.afAuth.authState.subscribe(res => {
      this.authState = res;
      const userID = environment.production ? res.uid : 'JE6zUXXprRhynhafxKn2M9XiLf73';
      this.getOrders(userID);
    });
  }
  ngOnInit() {
  }
  getOrders(userID) {
    this.factoyService.setModule('my-orders');
    this.factoyService.get({userID}).then((response: any) => {
      this.orders = response.data;
    }).catch(error => {
      this.alert.messageError(error.error.message);
    }).finally(() => {
      this.loading.closeLoading()
    });
  }

  detail(item){
    this.paramsService.clearParams();
    this.paramsService.setParams(item);
    this.router.navigate(['/order-detail']);
  }
}
