import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

/** NgRx */
import { StoreModule } from '@ngrx/store';

import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductReducer } from './state/product.reducer';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', ProductReducer),
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
