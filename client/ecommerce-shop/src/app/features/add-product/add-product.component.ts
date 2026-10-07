import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    code: ['', [Validators.required]],
    brand: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(0)]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private productService: ApiService){}

  create(){
    this.productService.createProduct(this.form.value).subscribe(() => this.router.navigate(['/']));
  }
}
