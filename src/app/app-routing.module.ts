import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pag-principal',
    pathMatch: 'full',
  },
  {
    path: 'pag-principal',
    loadChildren: () =>
      import('./pag-principal/pag-principal.module').then(
        (m) => m.PagPrincipalModule,
      ),
  },
  {
    path: 'lista-produtos',
    loadChildren: () =>
      import('./lista-produtos/lista-produtos.module').then(
        (m) => m.ListaProdutosModule,
      ),
  },
  {
    path: 'produto',
    loadChildren: () =>
      import('./produto/produto.module').then(
        (m) => m.ProdutoModule,
      ),
  },
  {
    path: 'venda',
    loadChildren: () =>
      import('./venda/venda.module').then(
        (m) => m.VendaModule,
      ),
  },
  {
    path: 'recolha',
    loadChildren: () =>
      import('./recolha/recolha.module').then(
        (m) => m.RecolhaModule,
      ),
  },
  {
    path: '**',
    redirectTo: 'pag-principal',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
