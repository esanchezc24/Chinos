import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.page.html',
  styleUrls: ['./subcategorias.page.scss'],
})
export class SubcategoriasPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

}
