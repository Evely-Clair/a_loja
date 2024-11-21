import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Produto } from './produto.class';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) {}

  private async request(method: string, url: string, data?: any): Promise<any> {
    return this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
    }).toPromise().catch(error => {
      console.error('HTTP Request Error: ', error);
      throw error;
    });
  }

  insertArtigo(localizacoesNovas : []){
    return this.request('POST', `${environment.serverUrl}/insert/local`, localizacoesNovas);
  }

  getProduto(barcode: string) {
    return this.request('GET', `${environment.serverUrl}/produto?barcode=${barcode}`);
  }
  getProdutoLocalizacao(barcode: string | null){
    return this.request('GET', `${environment.serverUrl}/produto/localizacao/${barcode}`);
  }
  getMarcas(){    
    return this.request('GET', `${environment.serverUrl}/filtros/marcas`);
  };
  getFornecedores(){    
    return this.request('GET', `${environment.serverUrl}/filtros/fornecedores`);
  };
  getCategorias(){    
    return this.request('GET', `${environment.serverUrl}/filtros/categorias`);
  };
  getFamilias(){   
    return this.request('GET', `${environment.serverUrl}/filtros/familias`);
  };
  getSubfamilias(){
    return this.request('GET', `${environment.serverUrl}/filtros/subfamilias`);
  };


  getProdutoBySearch(search: string, filters: any) {
    let queryParams = `?search=${encodeURIComponent(search)}`;
    if (filters.marca) queryParams += `&marca=${encodeURIComponent(filters.marca)}`;
    if (filters.fornecedor) queryParams += `&fornecedor=${encodeURIComponent(filters.fornecedor)}`;
    if (filters.categoria) queryParams += `&categoria=${encodeURIComponent(filters.categoria)}`;
    if (filters.familia) queryParams += `&familia=${encodeURIComponent(filters.familia)}`;
    if (filters.subfamilia) queryParams += `&subfamilia=${encodeURIComponent(filters.subfamilia)}`;
      return this.request('GET', `${environment.serverUrl}/produto/search${queryParams}`);
  }
    getLocais() {
    return this.request('GET', `${environment.serverUrl}/local`)
  }
  getSubLocais(idLocal : number) {
    return this.request('GET', `${environment.serverUrl}/local/sublocal/${idLocal}`)
  }
  getPosicoes(idSubLocal : number) {
    return this.request('GET', `${environment.serverUrl}/local/sublocal/posicao/${idSubLocal}`)
  }
  updateProdutoQT(produto: Produto) {
    return this.request('PUT', `${environment.serverUrl}/update/qt/${produto.idArtigo}`, produto);
  }
  updateLocalizacao(idArtigo: string | null, localizacao : []) {
    return this.request('PUT', `${environment.serverUrl}/update/local/${idArtigo}`, localizacao);
  }
  deleteLocalArtigo(localizacao : []){
    return this.request('DELETE', `${environment.serverUrl}/delete/localArtigo`, localizacao);
  }
}
