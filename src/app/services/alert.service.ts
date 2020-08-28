import {Injectable} from '@angular/core';
import {AlertController, NavController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private alerCtrl: AlertController,
                private navCtrl: NavController) {
    }

    messageError(message = null) {
        const msg = message ? message : 'Ha ocurrido un error y el servicio no está disponible temporalmente';
        return this.alerCtrl.create({
            cssClass: 'detalle',
            header: 'Mensaje',
            message: msg,
            buttons: [{text: 'Aceptar'}],
            backdropDismiss: false
        }).then(a => a.present());
    }

    messageSuccess(message, header, ruta = null) {
        return this.alerCtrl.create({
            cssClass: 'detalle',
            header: header ? header : 'Mensaje',
            message,
            buttons: [{
                text: 'Aceptar', handler: () => {
                    if (ruta) {
                        this.navCtrl.navigateRoot(ruta);
                    }
                }
            }],
            backdropDismiss: false
        }).then(a => a.present());
    }
    messageSuccessOrder() {
        return this.alerCtrl.create({
            cssClass: 'detalle',
            message: '<img src="../../../assets/img/icongracias.png">' +
                '<h4>Felicitaciones</h4>' +
                '<p class="mb-0">Su Pedido fue procesado con éxito y estaremos en contácto</p>'
            ,
            buttons: [{
                text: 'Aceptar', handler: () => {
                    this.navCtrl.navigateRoot('/tabs');
                }
            }],
            backdropDismiss: false
        }).then(a => a.present());
    }
}
