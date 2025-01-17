import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DetallePageRoutingModule} from './detalle-routing.module';

import {DetallePage} from './detalle.page';
import {ComponentsModule} from '../../components/components.module';
import {IonicImageLoader} from "ionic-image-loader";
import {PipeModule} from "../../pipe/pipe.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetallePageRoutingModule,
        ComponentsModule,
        IonicImageLoader,
        PipeModule
    ],
    declarations: [DetallePage]
})
export class DetallePageModule {
}
