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

  constructor(private service: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.service.getAll().subscribe((products: Product[]) => {
      this.showProducts = products;
    });
  }

  add() {
    this.router.navigate(['/newProd']);
  }
}
