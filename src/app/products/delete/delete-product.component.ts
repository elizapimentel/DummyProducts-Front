import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  @ViewChild('formProduct', { static: true }) formProduct: NgForm;
  @ViewChild('formProductModal', { static: true }) formProductModal: TemplateRef<any>;

  product: Product={
    id: null,
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
  deleteModalRef: BsModalRef;


  constructor(private service: ProductService, private router: Router,
    private route: ActivatedRoute, private modalService: BsModalService,
  ) { }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe((product: Product) => {
      this.product = product;
    });
  }

  deleteProductWholeItem() {
    this.deleteModalRef = this.modalService.show(this.formProductModal, { class: 'modal-sm' });
  }

  confirmDeleteWholeItem() {
    this.service.delete(this.product.id)
      .subscribe(() => {
        this.router.navigate(['/products']);
        this.deleteModalRef.hide();
      });
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
