import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import {CartService} from "../../services/cart.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  environment = environment;
  constructor(public cartService: CartService) { }

  ngOnInit() {
    console.log(this.cartService.cartTotal())
  }
  add(n, product) {
    product.qty += n;
    if (product.qty < 1) {
      product.qty += 1;
    }
  }
}
