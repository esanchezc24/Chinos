import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth) {
    }

    store(user) {
        localStorage.setItem('userx', btoa(JSON.stringify(user)));
    }

    get() {

    }
    getUserAuth()
  {
    return this.afAuth.authState;
  }

    registro(usuario){
        return new Promise((resolve, reject) => {
          this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password).then( res => {
            resolve(res);
          }).catch( err => reject(err));
        });
      }
      login(usuario){
        return new Promise((resolve, reject) => {
        this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password).then( res => {
          resolve(res);
        }).catch( err => reject(err));
        });
      }
}
