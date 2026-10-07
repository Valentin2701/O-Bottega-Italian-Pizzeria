import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from 'src/app/core/types/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnChanges{
  @Input() products: Product[] = [];
  public rows: Product[][] = [];

  constructor() {}

  private getRows(products: Product[]): Product[][] {
    const rows: Product[][] = [];
    for (let i = 0; i < products.length; i++) {
      if (i % 2 == 0) rows.push([products[i]]);
      else rows[(i - 1) / 2].push(products[i]);
    }
    return rows
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rows = this.getRows(this.products);
  }
}
