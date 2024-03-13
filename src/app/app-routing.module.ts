import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductRoutes} from "./products/product-routing.module";

const routes: Routes = [
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full' },

  ...ProductRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
