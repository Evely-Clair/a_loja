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

  constructor(private route: ActivatedRoute, private server: ServerService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.search = params.get('search');
      if (this.search) {
        this.getProdutos(this.search);
      }
    });
  }

  public getProdutos(search: string) {
    this.server.getProdutoBySearch(search).then((response: any) => {
      this.produtos = response;
      this.errorMsg = null; 
    })
    .catch(error => {
      alert('Error fetching product:' + JSON.stringify(error));
      this.errorMsg = 'Could not fetch product details. Please try again later.';
    });
  }
}
