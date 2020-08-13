import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

}
