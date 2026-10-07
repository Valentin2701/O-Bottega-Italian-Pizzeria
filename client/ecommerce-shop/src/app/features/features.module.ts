import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { EditModule } from './edit/edit.module';
import { AddProductModule } from './add-product/add-product.module';
import { ProductPageModule } from './product-page/product-page.module';
import { CartModule } from './cart/cart.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [HomeModule, RegisterModule, LoginModule, EditModule, AddProductModule, ProductPageModule, CartModule]
})
export class FeaturesModule { }
