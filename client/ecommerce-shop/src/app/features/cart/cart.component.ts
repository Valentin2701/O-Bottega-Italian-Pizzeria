import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Product } from 'src/app/core/types/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  sum: Number = 0;

  constructor(private productService: ApiService, private router: Router, private loadingService: LoadingService) { }

  buyProducts() {
    this.productService.buyProducts(this.products).subscribe(() => this.router.navigate(['/']).then(() => window.location.reload()));
  }

  loadCart() {
    this.loadingService.show();
    this.productService.getFromCart().subscribe((products: Product[]) => {
      this.products = products;
      this.sum = products.reduce((a, c) => a + c.price, 0);
      this.loadingService.hide();
    });
  }

  ngOnInit(): void {
    this.loadCart();

    this.productService.cartUpdated$.subscribe(() => {
      this.loadCart();
    });
  }
}
