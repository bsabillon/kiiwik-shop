import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  public endpoint = 'https://kiiwik-server.herokuapp.com';

  constructor(private http: HttpClient, public router: Router) { }

  getProducts(storeDomain: string){
    return this.http.get(`${this.endpoint}/products/byStoreDomain/${storeDomain}`);
  }

  getCategories(storeId: number){
    return this.http.get(`${this.endpoint}/categories/byStoreId/${storeId}`);
  }
}
