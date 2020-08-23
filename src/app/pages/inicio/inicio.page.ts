import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {Router} from "@angular/router";
import {Client} from "../../interface/client.interface";
import {AngularFireAuth} from "@angular/fire/auth";
import {FactoryService} from "../../services/factory.service";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook/ngx";
import {auth} from 'firebase';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
    client = new Client();
    loading;

    constructor(private afAuth: AngularFireAuth,
                private fb: Facebook,
                private factoyService: FactoryService,
                private navCtrl: NavController,
                private router: Router) {
    }


    ngOnInit() {
    }
    login() {
        this.fb.login(['email']).then(res => {
            this.authFirebase(res);
        }).catch(error => {
            console.log('LOGIN ERROR ' + error);
        });
    }

    authFirebase(res: FacebookLoginResponse) {
        // this.loading = this.presentLoading();
        const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.afAuth.signInWithCredential(facebookCredential)
            .then(response => {
                this.client.userID = response.user.uid;
                this.client.names = response.user.displayName;
                this.client.email = response.user.email;
                this.saveClient();
            }).catch(error => {
            console.log('FIREBASE ERROR ' + JSON.stringify(error));
        });
    }
    saveClient() {
        this.navCtrl.navigateRoot(['/tabs']);

        this.factoyService.setModule('clients');
        this.factoyService.post(this.client).then(res => {
            this.navCtrl.navigateRoot('/tabs');
        }).catch(erros => {
            // this.messageError('Ha ocurrido un error y el servicio no está disponible temporalmente');
        }).finally(() => {
            // this.loading.then(() => {
            //     this.loadingCtrl.dismiss();
            // });
        });
    }
}
