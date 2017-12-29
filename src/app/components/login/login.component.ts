import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  title = 'Logowanie';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    this.createForms();
  }

  createForms(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)])],
      password: ['', Validators.required]
    });
  }

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.email ? 'Niepoprawna forma e-mail!' :
    '';
  }

  onReset(): void {
    this.loginForm.reset();
  }// onReset()

  onSubmit(): void {
    this.loginService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }// onSubmit()
}// AppLoginComponent
