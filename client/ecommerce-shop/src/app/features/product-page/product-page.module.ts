import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: "", component: ProductPageComponent }];

@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule
  ],
  exports: [ProductPageComponent]
})
export class ProductPageModule { }
