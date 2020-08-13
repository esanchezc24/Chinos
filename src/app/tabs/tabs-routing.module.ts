import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
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
        path: 'sedes',
        loadChildren: () => import('../pages/sedes/sedes.module').then(m => m.SedesPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule)
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
