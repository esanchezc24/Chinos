import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventsService} from './events.service';
import {environment} from "../../environments/environment";


declare let Culqi: any;

@Injectable({
    providedIn: 'root'
})
export class CulqiService {
    settings: any = {
        title: '',
        currency: '',
        description: '',
        amount: 0
    };

    constructor(public http: HttpClient, private events: EventsService) {
        document.addEventListener('payment_event', (token: any) => {
            if (!token.detail.id) {
                this.events.publish('event_pay_error', token.detail.user_message);
                return;
            }
            const tokeId = token.detail.id;
            const email = token.detail.email;
            const url = 'https://api.culqi.com/v2/charges';

            this.events.publish('event_pay', '');
            const headers = new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', environment.production ? 'Bearer sk_live_741b4a9411baeaef' : 'Bearer sk_test_xwkHomTsCZT4dig7');

            const body = JSON.stringify({
                amount: this.settings.amount,
                currency_code: 'PEN',
                email,
                source_id: tokeId
            });
            this.http.post(url, body, {headers}).subscribe(
                response => {
                    console.log(response);
                    this.events.publish('event_pay_success', response);
                }, error => {
                    console.log('error pago');
                    this.events.publish('event_pay_error', error.error.user_message);
                });
        });
    }

    initCulqi() {
        Culqi.publicKey = environment.production ? 'pk_live_dc5c2efcd30d2489' : 'pk_test_xbWjwLBukeC5lSrD';
        Culqi.init();
    }

    createToken() {
        Culqi.createToken();
    }

    cfgFormulario(cantidad: number) {
        this.settings.title = 'Culqi - Ionic';
        this.settings.currency = 'PEN';
        this.settings.description = 'Pedido Bermanlab';
        this.settings.amount = cantidad;
    }


}
