import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PedidofinalPageRoutingModule} from './pedidofinal-routing.module';

import {PedidofinalPage} from './pedidofinal.page';
import {ComponentsModule} from '../../components/components.module';
import {SharedModule} from "../../shared.module";
import {SharedComponentsModule} from "../../shared/shared-components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PedidofinalPageRoutingModule,
        ComponentsModule,
        SharedComponentsModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: [PedidofinalPage]
})
export class PedidofinalPageModule {
}
