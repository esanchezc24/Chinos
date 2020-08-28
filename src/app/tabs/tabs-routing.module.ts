import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'principal',
        loadChildren: () => import('../pages/principal/principal.module').then(m => m.PrincipalPageModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('../pages/categorias/categorias.module').then(m => m.CategoriasPageModule)
      },
      {
        path: 'subcategorias',
        loadChildren: () => import('../pages/subcategorias/subcategorias.module').then(m => m.SubcategoriasPageModule)
      },
      {
        path: 'detalle',
        loadChildren: () => import('../pages/detalle/detalle.module').then( m => m.DetallePageModule)
      },
      {
        path: 'pedido',
        loadChildren: () => import('../pages/pedido/pedido.module').then( m => m.PedidoPageModule)
      },
      {
        path: 'pedidofinal',
        loadChildren: () => import('../pages/pedidofinal/pedidofinal.module').then( m => m.PedidofinalPageModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('../pages/productos/productos.module').then(m => m.ProductosPageModule)
      },
      {
        path: 'sedes',
        loadChildren: () => import('../pages/sedes/sedes.module').then( m => m.SedesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/principal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/principal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
