import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagPrincipalComponent } from './pag-principal.component';

const routes: Routes = [
  {
    path: '',
    component: PagPrincipalComponent,
  },
  {
    path: 'produto',
    loadChildren: () =>
      import('../produto/produto.module').then(
        (m) => m.ProdutoModule,
      ),
  },
  {
    path: 'lista-produtos',
    loadChildren: () =>
      import('../lista-produtos/lista-produtos.module').then(
        (m) => m.ListaProdutosModule,
      ),
  },
  {
    path: 'venda',
    loadChildren: () =>
      import('../venda/venda.module').then(
        (m) => m.VendaModule,
      ),
  },
  {
    path: 'recolha',
    loadChildren: () =>
      import('../recolha/recolha.module').then(
        (m) => m.RecolhaModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagPrincipalRoutingModule {}
