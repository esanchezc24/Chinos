import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from "@angular/fire/auth";
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
      public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
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

    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#ED3337');
      this.splashScreen.hide();
    });
  }
}
