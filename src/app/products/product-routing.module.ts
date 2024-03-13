import { Routes } from "@angular/router";

import { GetAllProductsComponent } from "./get-all-products/get-all-products.component";

export const ProductRoutes: Routes = [

  {
    path: 'products',
    component: GetAllProductsComponent
  },
];
