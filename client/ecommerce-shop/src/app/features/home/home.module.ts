import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';
import { CoreModule } from "../../core/core.module";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    ProductsListComponent,
    ProductComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CoreModule,
    AppRoutingModule,
    FormsModule
],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
