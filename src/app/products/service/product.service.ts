import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly URL = 'http://localhost:8080/api/products';
  
  

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL + `/db`)
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.URL + `/newProd` , product)
  }
  

}
