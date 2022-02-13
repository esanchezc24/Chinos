import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from "@angular/fire/auth";
import { AuthService } from 'src/app/services/auth.service';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private afAuth: AngularFireAuth,
      public navCtrl: NavController,
      private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.getUserAuth().subscribe( result => {
      console.log(result);
      if (!result) {
        this.navCtrl.navigateRoot('/inicio');
      } else {
        this.navCtrl.navigateRoot('/tabs');
      }

    });
    /*
    if (!environment.production){
      this.navCtrl.navigateRoot('/tabs');
    }else{
      this.afAuth.authState.subscribe(status => {
        if (status){
          this.navCtrl.navigateRoot('/tabs');
        }else{
          this.navCtrl.navigateRoot('/inicio');
        }
      });
    }
    */
    this.navCtrl.navigateRoot('/inicio');

    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#ED3337');
      this.splashScreen.hide();
    });
  }
}
