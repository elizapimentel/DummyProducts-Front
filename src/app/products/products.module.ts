import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { ProductService } from './service/product.service';
import { CreateNewProductComponent } from './create/create-new-product.component';
import {FormsModule} from "@angular/forms";
import {GetAllProductsComponent} from "./getAll/get-all-products.component";
import { CoreModule } from '../core/core.module';
import { GetByIdComponent } from './getById/get-by-id.component';
import { GetByCategoryComponent } from './getByCategory/get-by-category.component';



@NgModule({
  declarations: [
    GetAllProductsComponent,
    CreateNewProductComponent,
    GetByIdComponent,
    GetByCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CoreModule
  ],
  providers: [ProductService]
})
export class ProductsModule { }
