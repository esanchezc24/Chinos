import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {FactoryService} from "../../services/factory.service";

@Component({
  selector: 'app-pedidofinal',
  templateUrl: './pedidofinal.page.html',
  styleUrls: ['./pedidofinal.page.scss'],
})
export class PedidofinalPage implements OnInit {
  form: FormGroup;
  zones = [];
  zone;
  total = 0;
  subtotal = 0;
  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private http: FactoryService) { }



  ngOnInit() {
    this.iniForm();
    this.initialLoad();
    this.subtotal = this.cartService.cartTotal();
    this.total = this.subtotal;
  }
  iniForm() {
    this.form = this.fb.group({
      type_voucher: ['BOLETA', [Validators.required]],
      type_pay: ['type_pay', [Validators.required]],
      amount_pay: [null, [Validators.required]],
      zone_id: [null, [Validators.required]],
    });

  }
  private initialLoad() {
    this.http.setModule('zones');
    // this.loadingService.presentLoading();
    this.http.setModule('zones');
    this.http.get().then((res: any) => {
      this.zones = res.data;

    }).finally(() => {
      // this.loadingService.closeLoading();
    });
  }
  changeZona(e){
    this.zone = this.zones.find(k => k.id === e.target.value);
    this.form.get('zone_id').setValue(this.zone.id);
    this.total = this.subtotal + this.zone.price;
  }
  changeVoucher(event) {
    this.form.get('type_voucher').setValue(event.target.value);
    if (event.target.value === 'FACTURA') {
      this.form.addControl('business_name', new FormControl(null, [Validators.required]));
      this.form.addControl('ruc', new FormControl(null, [
        Validators.required, Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]));
      this.form.addControl('business_address', new FormControl(null, [Validators.required]));
    } else {
      this.form.removeControl('business_name');
      this.form.removeControl('ruc');
      this.form.removeControl('business_address');
    }
  }
  changePago(event) {
    this.form.get('type_pay').setValue(event.target.value);
    if (event.target.value === 'EFECTIVO') {
      this.changeValidator('amount_pay', true);
      // this.changeValidatorCulqi('card', false);
      // this.changeValidatorCulqi('cvv', false);
      // this.changeValidatorCulqi('month', false);
      // this.changeValidatorCulqi('year', false);
    // } else {
    //   this.changeValidatorCulqi('card', true);
    //   this.changeValidatorCulqi('cvv', true);
    //   this.changeValidatorCulqi('month', true);
    //   this.changeValidatorCulqi('year', true);
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
}
