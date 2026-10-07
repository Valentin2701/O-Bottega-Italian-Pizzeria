import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UserService } from 'src/app/core/services/user.service';
import { Product } from 'src/app/core/types/Product';
import { User } from 'src/app/core/types/User';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  isLoggedIn: boolean = false;
  isOwner: boolean = false;
  isInCart: boolean | undefined = false;
  isBought: boolean | undefined = false;

  constructor(private router: Router, private routerActivate: ActivatedRoute, private productService: ApiService, private userService: UserService, private loadingService: LoadingService) { }
  addToCart() {
    this.productService.addProductToCart(this.product?._id).subscribe(() => {
      this.router.navigate([`/products/${this.product?._id}`], { queryParamsHandling: 'merge', skipLocationChange: true }).then(() => {
        window.location.reload();
      });
    });
  }

  remove() {
    this.productService.deleteProduct(this.product?._id).subscribe(() => {
      this.router.navigate(["/"]);
    })
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.routerActivate.paramMap.subscribe(params => {
      const id: string = params.get('id') as string;
      this.productService.getSingleProduct(id).subscribe(product => {
        this.product = product;
        const user: User | null = this.userService.getUser();
        this.isLoggedIn = !!user;
        this.isOwner = this.product?.owner == user?._id;
        this.isInCart = user?.cart.some(productId => productId == this.product?._id);
        this.isBought = product.boughtBy?.some(userId => userId == user?._id);
      });
      this.loadingService.hide();
    });
  }
}
