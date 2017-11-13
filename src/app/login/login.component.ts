import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'Logowanie';
  users = [];
  loggedIn: boolean;
  url = 'http://localhost:3000';
  loginForm: FormGroup;

  constructor(private http: Http, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }

    this.createForms();
    this.getUsers();
  }

  createForms(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)])],
      password: ['', Validators.required]
    });
  }

  getValidErrors(value: FormControl): string {
    return value.errors.required ?
    'Wypełnienie pola jest wymagane!' : value.errors.email ? 'Niepoprawna forma e-mail!' : '';
  }

  onReset(): void {
    this.loginForm.reset();
    this.loggedIn = null;
  }// onReset()

  getUsers(): void {
    this.http.get(this.url + '/users').subscribe(
      res => this.users = res.json(),
      err => console.log(err)
    );
  }// getUsers()

  checkUser(): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (this.loginForm.get('email').value === this.users[i].email && this.loginForm.get('password').value === this.users[i].password) {
        return true;
      }
    }// for
    return false;
  }// checkUser()

  onSubmit(): boolean {
    if (this.checkUser()) {
      localStorage.setItem('user', this.loginForm.value);
      this.router.navigate(['/dashboard']);
      return this.loggedIn = true;
    } else {
      return this.loggedIn = false;
    }// if
  }// onSubmit()
}// AppLoginComponent
