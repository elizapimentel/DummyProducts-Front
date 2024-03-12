import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:8080/api/products';

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL).pipe(
      map((products: Product[]) => {
        products.forEach(product => {
          product.price = parseFloat(product.price).toFixed(2);
        });
        return products;
      })
    );
  }
}
