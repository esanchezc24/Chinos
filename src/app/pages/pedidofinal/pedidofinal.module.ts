import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidofinalPageRoutingModule } from './pedidofinal-routing.module';

import { PedidofinalPage } from './pedidofinal.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidofinalPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PedidofinalPage]
})
export class PedidofinalPageModule {}
