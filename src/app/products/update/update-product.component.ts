import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @ViewChild('formProduct', { static: true }) formProduct: NgForm;
  product: Product;

  constructor(private service: ProductService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe((product: Product) => {
      this.product = product;
    });
  }

  updateProduct() {
    if (this.formProduct.form.valid) {
      this.service.update(this.product.id, this.product)
      .subscribe((updatedProduct: Product) => {
        // Atualiza o produto com os dados retornados após a atualização
        this.product = updatedProduct;
        // Navega para a página de detalhes do produto
        this.router.navigate(['/product', this.product.id]);
      });
    }
  }

}
