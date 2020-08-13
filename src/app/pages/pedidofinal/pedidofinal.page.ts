import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pedidofinal',
  templateUrl: './pedidofinal.page.html',
  styleUrls: ['./pedidofinal.page.scss'],
})
export class PedidofinalPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

}
