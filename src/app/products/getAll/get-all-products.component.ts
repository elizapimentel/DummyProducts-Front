import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-all-products',
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.css']
})
export class GetAllProductsComponent implements OnInit {

  showProducts: Product[] = [];
  codeProduct: string;
  categoryProduct: string;

  constructor(private service: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.service.getAll().subscribe((products: Product[]) => {
      this.showProducts = products;
    });
  }

  getById() {
    const productId = parseInt(this.codeProduct);

      if (!isNaN(productId)) {
          this.router.navigate(['/product', productId]);
      } 
  }

}
