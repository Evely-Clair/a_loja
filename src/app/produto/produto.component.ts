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
  localizacoesProduto: any = [];
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

  public getLocalProducto(barcode: string | null){
    this.server.getProdutoLocalizacao(barcode).then((response) => {
      this.localizacoesProduto = response;
    })
    .catch(error => {
      alert('Error fetching product:' + JSON.stringify(error));
    });
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
      const existingIndex = this.sublocais.findIndex(sublocal => sublocal.idArtigoLocal === idArtigoLocal);
      if (existingIndex !== -1) {
        this.sublocais[existingIndex].sublocais = response;
      } else {
        this.sublocais.push({ idArtigoLocal, sublocais: response });
      }
    })
    .catch(error => {
      alert('Error fetching sublocations: ' + JSON.stringify(error));
    });
  }
  
  public getPosicoes(idArtigoLocal: number, idSubLocal: number) {
    this.server.getPosicoes(idSubLocal).then((response) => {
      const existingIndex = this.posicoes.findIndex(posicao => posicao.idArtigoLocal === idArtigoLocal);
      if (existingIndex !== -1) {
        this.posicoes[existingIndex].posicoes = response;
      } else {
        this.posicoes.push({ idArtigoLocal, posicoes: response });
      }
    })
    .catch(error => {
      alert('Error fetching positions:' + JSON.stringify(error));
    });
  }

  public onShowForm() {
    if(this.sublocais.length === 0){
      for (var i = 0; i < this.localizacoesProduto.length ;i++){
        this.getSubLocais(i, this.localizacoesProduto[i]['idLocalizacao']);
        this.getPosicoes(i, this.localizacoesProduto[i]['idSubLocalizacao']);  
      }
    }
  }

  public onSelectChange(event: any, index: number, type: string) {
    const selectedValue = event.target.value;
    if (type ==  'localizacao') {
      this.getSubLocais(index, selectedValue)
      this.getPosicoes(index, selectedValue)
    } 
    if(type ==  'sublocalizacao') {
      this.getPosicoes(index, selectedValue)
    }
  }

  public editarLocais(event: any){
    const updatedData = event.target.elements; 
    for(var i = 0; i < this.localizacoesProduto.length; i++){
      this.localizacoesProduto[i]['idLocalizacao'] = parseInt(updatedData.localizacao[i].value);
      this.localizacoesProduto[i]['idSubLocalizacao'] = parseInt(updatedData.sublocalizacao[i].value);
      this.localizacoesProduto[i]['idPosicao'] = parseInt(updatedData.posicao[i].value);
      this.localizacoesProduto[i]['qtLocal'] = parseInt(updatedData.qtLocal[i].value);
    }
    if(this.produto !== null){
      this.produto.qt = parseInt(updatedData[0].value);
    }
    this.showUpdate = false;
    this.updateArtigo(this.produto);
  }

  public updateArtigo(produto: any) {
    this.server.updateProdutoQT(produto).catch(error => {
      alert('Error updating product:' + JSON.stringify(error));
    });
    this.server.updateLocalizacao(this.barcode ,this.localizacoesProduto).catch(error => {
      alert('Error updating local:' + JSON.stringify(error));
    });
    this.getLocalProducto(this.barcode);
  } 

  public insertLocalArtigo(localizacoesNovas : []) {
    this.server.insertArtigo(localizacoesNovas).catch(error => {
      alert('Error inserting local:' + JSON.stringify(error));
    });
  }

  public deleteLocalArtigo(localizacao : []) {
    this.server.deleteLocalArtigo(localizacao).catch(error => {
      alert('Error inserting local:' + JSON.stringify(error));
    });
  }
}
