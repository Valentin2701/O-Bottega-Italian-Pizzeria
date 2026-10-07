import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Product } from 'src/app/core/types/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ApiService, private loadingService: LoadingService) { }

  search(search: string) {
    if (search) this.productService.searchProducts(search).subscribe(products => {
      this.products = products;
      this.loadingService.hide();
    });
    else this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.loadingService.hide();
    });
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.productService.getRecentProducts().subscribe(products => {
      this.products = products;
      this.loadingService.hide();
    });
  }
}
