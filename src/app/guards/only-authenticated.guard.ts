import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OnlyAuthenticatedGuard implements CanActivate {
    isLogin;

    constructor(private afAuth: AngularFireAuth,
                private router: Router,
                public navCtrl: NavController) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!environment.production){
            return true;
        }

        this.afAuth.authState.subscribe(status => {
            this.isLogin = status ? true : false;
        });
        return this.isLogin;
    }

}


