import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-get-all-products',
  templateUrl: './get-all-products.component.html',
  styleUrl: './get-all-products.component.css'
})
export class GetAllProductsComponent implements OnInit {

  showProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.showProducts = products;
    });
  }
}
