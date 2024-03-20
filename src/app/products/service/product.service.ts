import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly URL = 'http://localhost:8080/api/products';
  
  

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL + `/db`).pipe(
      map((products: Product[]) => {
        products.forEach(product => {
          product.price = parseFloat(product.price).toFixed(2);
        });
        return products;
      })
    );
 
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.URL + `/newProd` , product)
  }

  getById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.URL}/${id}`).pipe(
      map((product: Product) => {
        product.price = parseFloat(product.price).toFixed(2);
        return product;
      })
    );
  }
  

}
