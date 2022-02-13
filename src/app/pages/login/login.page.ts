import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = { email: '', password: ''};

  constructor(private authService: AuthService, public router: Router,
    private clienteService: ClienteService) { }

  ngOnInit() {
  }

  login(usuario){
    /*this.clienteService.verificacionCliente(usuario).then((res: any) => {
      console.log(res);
      if (res === false){
        alert('No existe el correo, porfavor registrarse');
      }else{*/
        this.authService.login(usuario).then(() => {
          alert('Logueado Correctamente');
          this.router.navigate(['/tabs']);
        }).catch(err => {
          alert('Los datos son incorrectos');
        });
      /*}
    });*/
  }

}
