import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Client} from '../../interface/client.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {FactoryService} from '../../services/factory.service';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {auth} from 'firebase';
import {LoadingService} from "../../services/loading.service";
import {AlertService} from "../../services/alert.service";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
    client = new Client();

    constructor(private afAuth: AngularFireAuth,
                private fb: Facebook,
                private factoyService: FactoryService,
                private navCtrl: NavController,
                private loading: LoadingService,
                private alert: AlertService,
                private router: Router) {
    }


    ngOnInit() {
    }
    login() {
        this.loading.presentLoading();
        this.fb.login(['email']).then(res => {
            this.authFirebase(res);
        }).catch((error) => {
            console.log(error);
            this.loading.closeLoading();
            this.alert.messageError();
        });
    }

    authFirebase(res: FacebookLoginResponse) {
        const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.afAuth.signInWithCredential(facebookCredential)
            .then(response => {
                this.client.userID = response.user.uid;
                this.client.names = response.user.displayName;
                this.client.email = response.user.email;
                this.saveClient();
            }).catch(error => {
            this.loading.closeLoading();
            this.alert.messageError();
            console.log('FIREBASE ERROR ' + JSON.parse(error));
        });
    }
    saveClient() {
        this.factoyService.setModule('clients');
        this.factoyService.post(this.client).then(res => {
            this.navCtrl.navigateRoot('/tabs');
        }).catch(erros => {
            this.alert.messageError();
        }).finally(() => {
            this.loading.closeLoading();
        });
    }
}
