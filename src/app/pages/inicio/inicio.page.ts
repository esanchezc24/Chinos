import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(public menuCtrl: MenuController,
              private router: Router) { }

  ionViewWillEnter(
  ) {
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }
  login(){
    this.router.navigate(['/tabs']);
  }
}
