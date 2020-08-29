import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import {ComponentsModule} from "../../components/components.module";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProductosPageRoutingModule,
        ComponentsModule,
        IonicImageLoader
    ],
  declarations: [ProductosPage]
})
export class ProductosPageModule {}