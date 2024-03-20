import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-create-new-product',
  templateUrl: './create-new-product.component.html',
  styleUrls: ['./create-new-product.component.css']
})
export class CreateNewProductComponent implements OnInit{

  @ViewChild('formProduct', { static: true }) formProduct: NgForm;
  products: Product= {
    title: '',
    description: '',
    price: null,
    discountPercentage: null,
    rating: null,
    stock: null,
    brand: '',
    category: '',
    thumbnail: '',
    images: []
  };

  addImage() {
    this.products.images.push(''); // Adiciona um objeto de imagem vazio à lista de imagens
  }
  
  removeImage(index: number) {
    this.products.images.splice(index, 1); // Remove o objeto de imagem no índice especificado
  }

  constructor(private service: ProductService, private route: ActivatedRoute,
    private router: Router) {}
  
  
  ngOnInit(): void {
  }

  createProduct() {
      this.service.create(this.products).subscribe(
        (newProduct: Product) => {
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Erro ao criar produto:', error);
        }
      );
    }
      
  }
  
