import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-get-by-id',
  templateUrl: './get-by-id.component.html',
  styleUrls: ['./get-by-id.component.css']
})
export class GetByIdComponent {

  @ViewChild('formProduct', { static: true }) formProduct: NgForm;
  products: Product;

  constructor(private service: ProductService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findProductById();
  }

  findProductById() {
    const id = +this.route.snapshot.paramMap.get('id'); //o + converte para number
    this.service.getById(id).subscribe(item => this.products = item);
  }


}
