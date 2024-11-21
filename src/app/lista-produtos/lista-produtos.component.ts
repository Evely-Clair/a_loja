import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss'],
})
export class ListaProdutosComponent implements OnInit {
  @Input() search: string | null = null;
  produtos: any[] = [];
  errorMsg: string | null = null;
  filtros: any = {
    marcas: [],
    fornecedores: [],
    categorias: [],
    familias: [],
    subfamilias: []
  };
  filters = {
    marca: '',
    fornecedor: '',
    categoria: '',
    familia: '',
    subfamilia: ''
  };

  constructor(private route: ActivatedRoute, private server: ServerService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.search = params.get('search');
      if (this.search) {
        this.getProdutos(this.search);
      }
    });
    this.loadFilters()
  }

  loadFilters() {
    this.server.getMarcas().then(marcas => this.filtros.marcas = marcas);
    this.server.getFornecedores().then(fornecedores => this.filtros.fornecedores = fornecedores);
    this.server.getCategorias().then(categorias => this.filtros.categorias = categorias);
    this.server.getFamilias().then(familias => this.filtros.familias = familias);
    this.server.getSubfamilias().then(subfamilias => this.filtros.subfamilias = subfamilias);
  }

  public getProdutos(search: string) {
    this.server.getProdutoBySearch(search, this.filters).then((response: any) => {
      this.produtos = response;
      this.errorMsg = null; 
    })
    .catch(error => {
      alert('Error fetching product:' + JSON.stringify(error));
      this.errorMsg = 'Could not fetch product details. Please try again later.';
    });
  }
}
