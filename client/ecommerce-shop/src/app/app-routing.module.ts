import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { IsGuestGuard } from './core/guards/guest.guard';
import { LoggedInGuard } from './core/guards/routing.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/register/register.module').then((m) => m.RegisterModule),
    canActivate: [IsGuestGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    canActivate: [IsGuestGuard],
  },
  {
    path: 'products/create',
    loadChildren: () =>
      import('./features/add-product/add-product.module').then((m) => m.AddProductModule),
    canActivate: [LoggedInGuard, adminGuard],
  },
  {
    path: 'products/edit/:id',
    loadChildren: () =>
      import('./features/edit/edit.module').then((m) => m.EditModule),
    canActivate: [LoggedInGuard, adminGuard],
  },
  {
    path: 'products/cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then((m) => m.CartModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'products/:id',
    loadChildren: () =>
      import('./features/product-page/product-page.module').then((m) => m.ProductPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }