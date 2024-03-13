import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {CacheService} from "./cache.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL = 'http://localhost:8080/api/products/db';

  constructor( private http: HttpClient, private cacheService: CacheService ) { }

  getAll(): Observable<Product[]> {
    const cachedData = this.cacheService.get('products');
    if (cachedData) {
      return new Observable<Product[]>(observer => {
        observer.next(cachedData);
        observer.complete();
      });
    } else {
      return this.http.get<Product[]>(this.URL).pipe(
        map((products: Product[]) => {
          products.forEach(product => {
            product.price = parseFloat(product.price).toFixed(2);
          });
          this.cacheService.set('products', products); // Salve os dados em cache
          return products;
        })
      );
    }
  }
}
