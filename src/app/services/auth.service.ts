import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    store(user) {
        localStorage.setItem('userx', btoa(JSON.stringify(user)));
    }

    get() {

    }
}
