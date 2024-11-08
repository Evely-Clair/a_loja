import { NgModule } from '@angular/core';

import { ListaProdutosRoutingModule } from './lista-produtos-routing.module';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaProdutosComponent } from './lista-produtos.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ListaProdutosRoutingModule],
  declarations: [ListaProdutosComponent],
})
export class ListaProdutosModule {}
