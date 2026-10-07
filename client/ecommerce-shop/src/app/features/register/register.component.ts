import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { passwordMatchValidator } from 'src/app/core/validators/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      rePass: ['', [Validators.required]],
    }, {
      validators: [passwordMatchValidator]
    }),
    number: ['', [Validators.required, Validators.pattern(/^\+?\d{6,}/)]],
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required]],
    ZIP: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService){}

  register(){
    this.userService.register(this.form.value).subscribe({
      next: (data) => this.router.navigate(['/']),
      error: (err) => this.router.navigate(['/register'])
    });
  }
}
