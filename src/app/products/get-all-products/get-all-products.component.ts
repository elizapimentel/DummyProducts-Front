import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-get-all-products',
  templateUrl: './get-all-products.component.html',
  styleUrl: './get-all-products.component.css'
})
export class GetAllProductsComponent implements OnInit{

  showProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe( (products: Product[] ) =>
    this.showProducts = products)
 }





}


// ver topico da udemy 51 e 52 (criar componentes e registrar rotas)
