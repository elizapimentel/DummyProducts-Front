import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-by-category',
  templateUrl: './get-by-category.component.html',
  styleUrls: ['./get-by-category.component.css']
})
export class GetByCategoryComponent implements OnInit {

  @ViewChild('formProduct', { static: true }) formProduct: NgForm;
  products: Product[] = [];
  categoryName: string;
  codeProduct: string;

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['category'];
      this.findProductByCategory();
    });
  }

  findProductByCategory() {
    this.service.getByCategory(this.categoryName).subscribe(
      (item => {
        this.products = item
      }),
      error => {
        console.log('Error:',error);
      }
    );

  }

  getById() {
    const productId = parseInt(this.codeProduct);

    if (!isNaN(productId)) {
      this.router.navigate(['/product', productId]);
    }
  }

}
