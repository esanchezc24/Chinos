import { Component, OnInit } from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {CartService} from "../../services/cart.service";
import {environment} from "../../../environments/environment";
import {Location} from "@angular/common";
import {ParamsService} from "../../services/params.service";

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  environment = environment;
  urlBack;
  constructor(public cartService: CartService,
              public navCtrl: NavController,
              private paramsService: ParamsService) { }

  ionViewWillEnter() {
    this.urlBack = atob(this.paramsService.getParams().urlProductBack);

  }
  ngOnInit() {
  }
  add(n, product) {
    product.qty += n;
    if (product.qty < 1) {
      product.qty += 1;
    }
  }
  back(){
    this.navCtrl.navigateBack(this.urlBack);
  }
}
