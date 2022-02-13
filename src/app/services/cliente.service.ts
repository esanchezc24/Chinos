import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}
  registerClientes(params){
    return this.http.post(environment.apiUrl + '/api/registerclient', {params}).toPromise();
  }
  verificacionCliente(params){
    return this.http.post(environment.apiUrl + '/api/cliente_verificacion_json', {params}).toPromise();
  }
}
