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

  product: Product;
  deleteModalRef: BsModalRef;
  stockOptions: number[]; 
  selectedQuantity: number;

  constructor(private service: ProductService, private router: Router,
    private route: ActivatedRoute, private modalService: BsModalService,
  ) { }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe((product: Product) => {
      this.product = product;
      // Limitando o número máximo de itens a serem excluídos para 10 unidades
      const maxDeleteQuantity = Math.min(product.stock, 10);
      this.stockOptions = Array.from({ length: maxDeleteQuantity }, (_, index) => index + 1);
    });
  }

  deleteProduct() {
    // Verificar se a quantidade selecionada é válida
    if (!this.selectedQuantity || this.selectedQuantity < 1) {
      return;
    }
  
    // Chamar o serviço para excluir os itens do estoque
    this.service.delete(this.product.id, false, this.selectedQuantity)
      .subscribe(() => {
        // Navegar de volta para a página de produtos após a exclusão bem-sucedida
        this.router.navigate(['/products']);
        // Esconder o modal de confirmação de exclusão
        this.deleteModalRef.hide();
      });
  }
  

  deleteProductWholeItem() {
    this.deleteModalRef = this.modalService.show(this.formProductModal, { class: 'modal-sm' });
  }

  confirmDeleteWholeItem() {
    this.service.delete(this.product.id, true)
      .subscribe(() => {
        this.router.navigate(['/products']);
        this.deleteModalRef.hide();
      });
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
