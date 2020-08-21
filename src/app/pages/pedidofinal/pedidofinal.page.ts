import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pedidofinal',
  templateUrl: './pedidofinal.page.html',
  styleUrls: ['./pedidofinal.page.scss'],
})
export class PedidofinalPage implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }



  ngOnInit() {
    this.iniForm();
    console.log(this.form);
  }
  iniForm() {
    this.form = this.fb.group({});
    this.form.addControl('type_voucher',
        new FormControl('BOLETA', [Validators.required]));
    this.form.addControl('date_shows', new FormControl(null, [Validators.required]));
    this.form.addControl('time_shows', new FormControl(null, [Validators.required]));
    this.form.addControl('type_pay',
        new FormControl('EFECTIVO', [Validators.required]));
    this.form.addControl('amount_pay',
        new FormControl(null));

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
