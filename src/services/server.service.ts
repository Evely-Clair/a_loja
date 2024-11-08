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

  getProduto(barcode: string) {
    return this.request('GET', `${environment.serverUrl}/produto?barcode=${barcode}`);
  }

  getProdutoLocalizacao(barcode: string){
    return this.request('GET', `${environment.serverUrl}/produto/localizacao/${barcode}`);
  }

  getProdutoBySearch(search: string) {
    return this.request('GET', `${environment.serverUrl}/produto/search/${search}`);
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
    return this.request('PUT', `${environment.serverUrl}/produto/update/${produto.idArtigo}`, produto);
  }

  updateLocalizacao(localizacao :  []) {
    return this.request('PUT', `${environment.serverUrl}/produto/update/localizacao/`, localizacao);
  }
}
