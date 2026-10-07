import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { ProductComponent } from './components/product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: "", component: CartComponent }];

@NgModule({
  declarations: [
    CartComponent,
    ProductComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule
  ]
})
export class CartModule { }
