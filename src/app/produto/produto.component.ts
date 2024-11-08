import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { Produto } from '../../services/produto.class';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  @Input() barcode: string | null = null;
  produtos: Produto | null = null;
  produto: Produto | null = null;
  localizacoesProduto = [];
  locais = [];
  sublocais: { idArtigoLocal: number; sublocais: any[] }[] = [];  
  posicoes: { idArtigoLocal: number; posicoes: any[] }[] = [];  
  QT: number = 0;
  showUpdate: boolean = false;

  constructor(private route: ActivatedRoute, private server: ServerService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.barcode = params.get('barcode');
      if (this.barcode) {
        this.getProduto(this.barcode);
        this.getLocalProducto(this.barcode);
      }
    });
    this.getLocais();
  }

  public getProduto(barcode: string) {
    this.server.getProduto(barcode).then((response) => {
      this.produto = response[0];
      this.produtos = response;
    })
    .catch(error => {
      alert('Error fetching product:' + JSON.stringify(error));
    });
  }

  public getLocalProducto(barcode: string){
    this.server.getProdutoLocalizacao(barcode).then((response) => {
      this.localizacoesProduto = response;
    })
    .catch(error => {
      alert('Error fetching product:' + JSON.stringify(error));
    });
  }

  public editarHideShowUpdate(value: boolean, form: string ) {
    this.showUpdate = value;
    if (this.showUpdate){
      if (!form) {
        for (var i = 0; i < this.localizacoesProduto.length ;i++){
          this.getSubLocais(this.localizacoesProduto[i]['idArtigoLocalizacao'], this.localizacoesProduto[i]['idLocalizacao']);
          this.getPosicoes(this.localizacoesProduto[i]['idArtigoLocalizacao'], this.localizacoesProduto[i]['idSubLocalizacao']);  
        }
      } else {

      }
    }
  }

  public getLocais() {
    this.server.getLocais().then((response) => {
      this.locais = response;
    })
    .catch(error => {
      alert('Error fetching locations:' + JSON.stringify(error));
    });
  }

  public getSubLocais(idArtigoLocal: number, idLocal: number) {
    this.server.getSubLocais(idLocal).then((response) => {
      this.sublocais.push({ idArtigoLocal, sublocais: response });
    })
    .catch(error => {
      alert('Error fetching sublocations:' + JSON.stringify(error));
    });
  }

  public getPosicoes(idArtigoLocal: number, idSubLocal: number) {
    this.server.getPosicoes(idSubLocal).then((response) => {
      this.posicoes.push({ idArtigoLocal: idArtigoLocal, posicoes: response });
    })
    .catch(error => {
      alert('Error fetching positions:' + JSON.stringify(error));
    });
  }

  public updateArtigo() {

  }
}
