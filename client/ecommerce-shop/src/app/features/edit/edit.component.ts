import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from 'src/app/core/types/Product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: Product = {} as Product;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    code: ['', [Validators.required]],
    brand: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(0)]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private productService: ApiService, private routerActivate: ActivatedRoute) { }

  edit() {
    this.productService.editProduct(this.form.value, this.product._id).subscribe(() => this.router.navigate([`/products/${this.product._id}`]));
  }

  ngOnInit(): void {
    this.routerActivate.paramMap.subscribe(params => {
      const id: string = params.get('id') as string;
      this.productService.getSingleProduct(id).subscribe(product => {
        this.product = product;
        console.log(product);
        this.form.patchValue({
          name: product.name,
          code: product.code,
          brand: product.brand,
          price: product.price,
          image: product.image,
          description: product.description
        });
      })
    });
  }
}
