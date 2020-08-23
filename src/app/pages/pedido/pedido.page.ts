import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import {CartService} from "../../services/cart.service";
import {environment} from "../../../environments/environment";
import {Location} from "@angular/common";

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  environment = environment;
  constructor(public cartService: CartService,
              private location: Location) { }

  ngOnInit() {
    console.log(this.cartService.cartTotal())
  }
  add(n, product) {
    product.qty += n;
    if (product.qty < 1) {
      product.qty += 1;
    }
  }
  back(){
    this.location.back();
  }
}
