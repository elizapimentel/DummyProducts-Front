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
  private readonly DbURL = 'http://localhost:8080/api/products/db';

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
      return this.http.get<Product[]>(this.DbURL).pipe(
        map((products: Product[]) => {
          products.forEach(product => {
            product.price = parseFloat(product.price).toFixed(2).replace(',', '.');
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
        product.price = parseFloat(product.price).toFixed(2).replace(',', '.');
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
              product.price = parseFloat(product.price).toFixed(2).replace(',', '.');
            });
            // Armazena os dados em cache
            this.cacheService.set('category_' + categoryName.toLowerCase(), filteredProducts);
            return filteredProducts;
          }),
          catchError(error => {
            console.error('Error fetching data:', error);
            return throwError(error);
          })
        );
    }
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.URL}/update/${id}`, product).pipe(
      map((product: Product) => {
        product.price = parseFloat(product.price).toFixed(2).replace(',', '.');
        return product;
      })
    );
  }

  delete(id: number, deleteWholeItem: boolean, quantity?: number): Observable<any> {
    let url = `${this.URL}/delete/${id}?deleteWholeItem=${deleteWholeItem}`;
    if (!deleteWholeItem && quantity) {
      url += `&quantity=${quantity}`;
    }
  
    return this.http.delete(url).pipe(
      tap(() => {
        if (!deleteWholeItem) {
          // Atualizar o cache apenas se for uma exclusão parcial
          const cachedProducts: Product[] = this.cacheService.get('products');
          if (cachedProducts) {
            const updatedProducts = cachedProducts.map(product => {
              if (product.id === id) {
                // Diminuir o estoque do produto no cache
                product.stock -= quantity;
              }
              return product;
            });
            this.cacheService.set('products', updatedProducts);
          }
        } else {
          // Remover o produto do cache se for uma exclusão completa
          const cachedProducts: Product[] = this.cacheService.get('products');
          if (cachedProducts) {
            const updatedProducts = cachedProducts.filter(product => product.id !== id);
            this.cacheService.set('products', updatedProducts);
          }
        }
      })
    );
  }
  

  // Limpa o cache quando a página é fechada
  clearCacheOnPageClose(): void {
    this.cacheService.clear();
  }

}
