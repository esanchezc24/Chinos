import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSelect, MenuController, NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {FactoryService} from "../../services/factory.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {environment} from "../../../environments/environment";
import {EventsService} from "../../services/events.service";
import {CulqiService} from "../../services/culqi.service";
import {LoadingService} from "../../services/loading.service";
import {AlertService} from "../../services/alert.service";

@Component({
    selector: 'app-pedidofinal',
    templateUrl: './pedidofinal.page.html',
    styleUrls: ['./pedidofinal.page.scss'],
})
export class PedidofinalPage implements OnInit {
    @ViewChild('departament', {static: false}) departament: IonSelect;
    @ViewChild('zone', {static: false}) zone: IonSelect;
    form: FormGroup;
    formCulqi: FormGroup;
    zones = [];
    departaments = [];
    send;
    total = 0;
    subtotal = 0;
    LIBERTAD = 13;
    client;
    amountLesser;
    order;

    constructor(private fb: FormBuilder,
                private cartService: CartService,
                private http: FactoryService,
                private afAuth: AngularFireAuth,
                private culqiService: CulqiService,
                private navCtrl: NavController,
                private eventsService: EventsService,
                private loading: LoadingService,
                private alert: AlertService) {

    }

    ionViewWillEnter() {
        this.loading.presentLoading();
        this.afAuth.authState.subscribe(res => {
            //const userID = environment.production ? res.uid : 'd2GyxaOYgKMougvn6TZLXVCrYTr2';
            const userID = res.uid;
            this.http.setModule('clients');
            this.http.get({userID}).then((response: any) => {
                this.client = response.data;
                this.iniForm();
            }).finally(() => {
                this.loading.closeLoading();
            });
        });
    }

    ngOnInit() {

        this.initialLoad();
        this.subtotal = this.cartService.cartTotal();
        this.total = this.subtotal;

        this.eventsService.subscribe('event_pay', (data: any) => {
            // this.eventsService.destroy('event_pay');
        });
        this.eventsService.subscribe('event_pay_success', (data: any) => {
            this.changePayCulqi(data.id);
            // this.eventsService.destroy('event_pay_success');
        });
        this.eventsService.subscribe('event_pay_error', (error: any) => {
            console.log("EVENTO ERROR");
            this.loading.closeLoading();
            this.alert.messageError(error);

            // this.loadingCulqi.dismiss();
            // this.eventsService.unsubscribe('event_pay_error');
            //
        });
    }

    iniForm() {
        this.form = this.fb.group({
            address_order: [null],
            reference: [null],
            type_voucher: ['BOLETA', [Validators.required]],
            dni: [this.client ? this.client.dni : null, [Validators.required]],
            address: [this.client ? this.client.address : null],
            type_pay: ['EFECTIVO', [Validators.required]],
            amount_pay: [null, [Validators.required]],
            departament_id: [null],
            zone_id: [null],
            client_id: [this.client.id],
            type: [null,  [Validators.required]],
            phone: [null,  [Validators.required]],
        });
        this.formCulqi = this.fb.group({
            card: [!environment.production ? '4111111111111111' : null],
            cvv: [!environment.production ? '123' : null],
            month: [!environment.production ? '09' : null],
            year: [!environment.production ? '2025' : null],
        });
        this.departament.value = '';
        this.zone.value = '';
        this.send = null;
        this.total = this.subtotal;
    }

    private initialLoad() {
        this.http.setModule('zones');
        // this.loadingService.presentLoading();
        this.http.setModule('zones');
        this.http.get().then((res: any) => {
            this.zones = res.zones;
            this.departaments = res.departaments;

        }).finally(() => {
            // this.loadingService.closeLoading();
        });
    }

    changeZona(e) {
        this.send = this.zones.find(k => k.id === e.target.value);
        this.form.get('zone_id').setValue(this.send.id);
        this.total = this.subtotal + this.send.price;
    }

    changeDepartament(e) {
        if (e.target.value) {
            this.send = this.departaments.find(k => k.id === e.target.value);
            this.form.get('departament_id').setValue(this.send.id);
            this.total = this.subtotal + this.send.price;
            if (this.send.id === this.LIBERTAD) {
                this.changeValidator('zone_id', true);
            } else {
                this.changeValidator('zone_id', false);
            }
        }

    }

    changeVoucher(event) {
        this.form.get('type_voucher').setValue(event.target.value);
        if (event.target.value === 'FACTURA') {
            this.form.addControl('business_name', new FormControl(null, [Validators.required]));
            this.form.addControl('ruc', new FormControl(null, [
                Validators.required, Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]));
            this.form.addControl('business_address', new FormControl(null, [Validators.required]));
            this.changeValidator('dni', false);
            this.changeValidator('address', false);
        } else {
            this.form.removeControl('business_name');
            this.form.removeControl('ruc');
            this.form.removeControl('business_address');
            this.changeValidator('dni', true);
            this.changeValidator('address', true);
        }
    }

    changePago(event) {
        this.form.get('type_pay').setValue(event.target.value);
        if (event.target.value === 'EFECTIVO') {
            this.changeValidator('amount_pay', true);
            this.changeValidatorCulqi('card', false);
            this.changeValidatorCulqi('cvv', false);
            this.changeValidatorCulqi('month', false);
            this.changeValidatorCulqi('year', false);
        } else {
            this.changeValidatorCulqi('card', true);
            this.changeValidatorCulqi('cvv', true);
            this.changeValidatorCulqi('month', true);
            this.changeValidatorCulqi('year', true);
            this.changeValidator('amount_pay', false);

        }
    }

    changeValidator(name, status) {
        this.form.get(name).setValue(null);
        if (status) {
            this.form.get(name).setValidators([Validators.required]);
        } else {
            this.form.get(name).setValidators(null);
        }
        this.form.get(name).updateValueAndValidity();
    }

    amountValid() {
        if (this.form.value.type_pay === 'EFECTIVO') {
            return this.form.value.amount_pay >= this.total;
        } else {
            return true;
        }

    }

    changeValidatorCulqi(name, status) {
        if (status) {
            this.formCulqi.get(name).setValidators([Validators.required]);
        } else {
            this.formCulqi.get(name).setValidators(null);
        }
        this.formCulqi.get(name).updateValueAndValidity();
    }

    save() {
        this.form.markAllAsTouched();
        this.formCulqi.markAllAsTouched();
        if (this.form.valid && this.formCulqi.valid) {
            this.amountLesser = false;
            if (!this.amountValid()) {
                this.amountLesser = true;
                return;
            }
            this.loading.presentLoading();
            const formData = this.getData();
            this.http.setModule('order');
            this.http.post(formData).then((res: any) => {
                if (this.form.value.type_pay === 'EFECTIVO') {
                    this.loading.closeLoading();
                    this.alert.messageSuccessOrder();
                    this.resetOrder();
                } else {
                    this.order = res.data;
                    this.culqiService.initCulqi();
                    this.culqiService.cfgFormulario(this.total * 100);
                    this.culqiService.createToken();
                }

            }).catch(e => {
                console.log("ERROR", e);
                this.loading.closeLoading();
                this.alert.messageError(e.error.message);
            });
        }
    }

    getData() {
        const formData = this.form.value;
        formData.products = [];
        formData.total = this.total;
        this.cartService.getCart().forEach(product => {
            formData.products.push(
                {id: product.id, qty: product.qty, color_id: product.color_id}
                );
        });
        return formData;
    }


    resetOrder() {
        this.cartService.clearCart();
        this.formCulqi.reset();
        this.form.reset();
        this.form.get('type_voucher').setValue('BOLETA');
        this.form.get('type_pay').setValue('EFECTIVO');
        this.departament.value = '';
        if (this.zone){
            this.zone.value = '';
        }
        this.send = null;
    }
    changeType(){
        if (this.form.value.type === 'DELIVERY'){
            this.changeValidator('address_order', true);
            this.changeValidator('departament_id', true);
        }else{
            this.changeValidator('address_order', false);
            this.changeValidator('departament_id', false);
        }
    }
    changePayCulqi(culqiId) {
        this.http.setModule('order/update');
        this.http.post({order_id: this.order.id, culqi_id: culqiId}).then((res: any) => {
            this.alert.messageSuccessOrder();
            this.resetOrder();
        }).catch(error => {
            this.alert.messageError();
        }).finally(() => {
            this.loading.closeLoading();
        });
    }
}
