import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, any> = new Map();

  constructor() { }

  get(key: string): any {
    return this.cache[key];
  }

  set(key: string, value: any): void {
    this.cache[key] = value;
  }

  clear(): void {
    this.cache.clear();
  }
}
