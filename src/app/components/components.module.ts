import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadermenuComponent } from './headermenu/headermenu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderatrasComponent } from './headeratras/headeratras.component';
import { HeadertituloComponent } from './headertitulo/headertitulo.component';
import { HeadertituloatrasComponent } from './headertituloatras/headertituloatras.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeadermenuComponent,
    HeaderatrasComponent,
    HeadertituloComponent,
    HeadertituloatrasComponent,
    MenuComponent
  ],
  exports: [
    HeadermenuComponent,
    HeaderatrasComponent,
    HeadertituloComponent,
    HeadertituloatrasComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
