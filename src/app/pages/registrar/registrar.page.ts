import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  usuario = { nombres: '', dni:'', email: '', celular: '', password: '', 	userID: ''};
  constructor(private toastCtrl: ToastController, private authService: AuthService, private clienteService: ClienteService,public router: Router) { }

  ngOnInit() {
  }

  registrarse(usuario){
    let mensaje;
    if (this.usuario.nombres === '' || this.usuario.dni === '' || this.usuario.email === ''
        || this.usuario.celular === '' || this.usuario.password === '')
    {
      mensaje = 'Debe completar los datos';
      this.showToast(mensaje);
      return false;
    }
    else {
      this.authService.registro(usuario).then(res => {
        this.authService.getUserAuth().subscribe(user => {
          usuario.userID = user.uid;
          this.clienteService.registerClientes(usuario).then((response: any) => {
            mensaje = 'Cliente Registrado y logueado';
            this.router.navigate(['/tabs']);
            this.showToast(mensaje);
          });
        });
      }).catch(err => {
        alert('Los datos son incorrectos o el usuario ya existe');
      });
    }
  }

  showToast(mensaje) {

    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    }).then((toast) => {
      toast.present();
    });
  }

}
