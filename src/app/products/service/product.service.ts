import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly URL = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient, private cacheService: CacheService) {
    // Verifica se o objeto window está disponível
    if (typeof window !== 'undefined') {
      // Adiciona um listener para o evento beforeunload
      window.addEventListener('beforeunload', () => this.clearCacheOnPageClose());
    }
  }

  getAll(): Observable<Product[]> {
     const cachedData = this.cacheService.get('products');

     if (cachedData) {
       return of(cachedData);
     } else {
    return this.http.get<Product[]>(this.URL).pipe(
      map((products: Product[]) => {
        products.forEach(product => {
          product.price = parseFloat(product.price).toFixed(2);
        });
        this.cacheService.set('products', products);
        return products;
      })
    );
    }
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.URL + `/newProd`, product)
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`).pipe(
      map((product: Product) => {
        product.price = parseFloat(product.price).toFixed(2);
        return product;
      })
    );
  }

  getByCategory(categoryName: string): Observable<Product[]> {
    const cacheKey = `category_${categoryName}`;
    const cachedData = this.cacheService.get(cacheKey); // Verifica se os dados estão em cache

    if (cachedData) {
      // Se os dados estiverem em cache, retorna-os imediatamente
      return of(cachedData);
    } else {
      const options = categoryName
        ? {
          params: new HttpParams().set('category', categoryName)
        }
        : {};

      return this.http.get<Product[]>(`${this.URL}`, options)

        .pipe(
          map((products: Product[]) => {
            return products.filter(
              product => product.category.toLowerCase() === categoryName.toLowerCase()
            );
          }),
          map((filteredProducts: Product[]) => {
            filteredProducts.forEach(product => {
              product.price = parseFloat(product.price).toFixed(2);
            });
            // Armazena os dados em cache
            this.cacheService.set('category_' + categoryName.toLowerCase(), filteredProducts);
            return filteredProducts;
          }),
          catchError(error => {
            // Lida com erros
            console.error('Error fetching data:', error);
            return throwError(error);
          })
        );
    }
  }

  // Limpa o cache quando a página é fechada
  clearCacheOnPageClose(): void {
    this.cacheService.clear();
  }

}
