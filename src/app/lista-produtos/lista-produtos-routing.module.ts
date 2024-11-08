import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdutosComponent } from './lista-produtos.component';

const routes: Routes = [
  {
    path: ':search',
    component: ListaProdutosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaProdutosRoutingModule {}
