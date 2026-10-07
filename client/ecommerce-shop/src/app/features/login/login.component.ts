import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService){}

  login(){
    this.userService.login({email: this.form.value.email, password: this.form.value.password}).subscribe({
      next: (data) => this.router.navigate(['/']),
      error: (err) => this.router.navigate(['/login'])
    });
  }
}
