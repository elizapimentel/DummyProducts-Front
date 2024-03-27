import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllProductsComponent } from './products/getAll/get-all-products.component';
import { CreateNewProductComponent } from './products/create/create-new-product.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GetByIdComponent } from './products/getById/get-by-id.component';
import { GetByCategoryComponent } from './products/getByCategory/get-by-category.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  { path: 'products', component: GetAllProductsComponent },
  { path: 'newProd', component: CreateNewProductComponent },
  { path: 'product/:id', component: GetByIdComponent },
  { path: 'category/:category', component: GetByCategoryComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
