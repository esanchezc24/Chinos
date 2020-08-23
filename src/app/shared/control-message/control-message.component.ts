import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

interface ErrorTypeMessage {
  required?: string;
  email?: string;
  pattern?: string;
}

@Component({
  selector: 'app-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.scss'],
})
export class ControlMessageComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() customMessages: ErrorTypeMessage;
  constructor() { }

  ngOnInit() {}
  get message() {
    if ( this.control ) {
      for ( const errorName in this.control.errors ) {
        if ( this.control.errors.hasOwnProperty( errorName ) && this.control.touched ) {
          return this.customMessages && this.customMessages[ errorName ]
              ? this.customMessages[ errorName ]
              : this.getMessage( errorName, this.control.errors[ errorName ] );
        }
      }
    }
    return null;
  }

  isInvalid( control: AbstractControl ) {
    return control.errors && control.touched;
  }

  private getMessage( errorName: string, errorValue: any ) {
    switch ( errorName ) {
      case 'required':
        return 'Campo requerido';
      case 'email':
        return 'El correo no es válido';
      case 'pattern':
        return 'No cumple con el formato permitido';
      case 'minlength':
        return `Debe tener al menos ${errorValue.requiredLength} caracteres`;
      case 'maxlength':
        return `Sólo se permiten ${errorValue.requiredLength} caracteres`;
      default:
        return null;
    }
  }
}
