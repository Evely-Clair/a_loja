import { NgModule } from '@angular/core';

import { ProdutoRoutingModule } from './produto-routing.module';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProdutoComponent } from './produto.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ProdutoRoutingModule],
  declarations: [ProdutoComponent],
})
export class ProdutoModule {}
