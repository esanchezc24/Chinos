import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidofinalPage } from './pedidofinal.page';

const routes: Routes = [
  {
    path: '',
    component: PedidofinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidofinalPageRoutingModule {}
