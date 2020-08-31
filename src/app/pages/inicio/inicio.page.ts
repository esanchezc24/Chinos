import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Client} from '../../interface/client.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {FactoryService} from '../../services/factory.service';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {auth} from 'firebase';
import {LoadingService} from '../../services/loading.service';
import {AlertService} from '../../services/alert.service';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
    client = new Client();
    result;
    resultFire;

    constructor(private afAuth: AngularFireAuth,
                private fb: Facebook,
                private factoyService: FactoryService,
                private navCtrl: NavController,
                private loading: LoadingService,
                private alert: AlertService,
                private router: Router,
                private googlePlus: GooglePlus) {
    }


    ngOnInit() {
    }

    loginFacebook() {
        this.loading.presentLoading();
        this.fb.login(['email']).then(res => {
            this.authFirebase(res, 'facebook');
        }).catch((error) => {
            this.loading.closeLoading();
            this.alert.messageError();
        });

    }

    loginGoogle() {
        this.loading.presentLoading();
        // {
        //     webClientId: '960461558806-934dd53oa29hfsjsj2qurgb0ueta2j93.apps.googleusercontent.com',
        //         offline: true
        // }
        console.log('GOOGLE CREDENCIALES', this.googlePlus.getSigningCertificateFingerprint());
        this.googlePlus.login({})
            .then(result => {
                console.log('GOOGLE', result);
                // this.result = JSON.stringify(result);
                this.authFirebase(result, 'google');
            })
            .catch(err => {
                console.log('GOOGLE ERROR', JSON.stringify(err));
                this.result = JSON.stringify(err);
                this.loading.closeLoading();
                this.alert.messageError();
            });
    }

    authFirebase(res, provider) {
        let credential = null;
        if (provider === 'facebook') {
            credential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        } else {
            credential = auth.GoogleAuthProvider.credential(null, res.accessToken);
        }
        console.log('CRENDECIALES', credential);
        this.afAuth.signInWithCredential(credential)
            .then(response => {
                console.log('FIREBASE', response);
                // this.resultFire = JSON.stringify(response);
                this.client.userID = response.user.uid;
                this.client.names = response.user.displayName;
                this.client.email = response.user.email;
                this.saveClient();
            }).catch(error => {
            this.loading.closeLoading();
            this.alert.messageError();
            console.log('FIREBASE ERROR ' + error);
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
