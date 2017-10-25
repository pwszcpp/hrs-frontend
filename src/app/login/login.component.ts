import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'Logowanie';
  user = new User;
  users = [];
  loggedIn: boolean;
  url = 'http://localhost:3000';

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onReset(): void {
    this.user.email = '';
    this.user.password = '';
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
      if (this.user.email === this.users[i].email && this.user.password === this.users[i].password) {
        return true;
      }
    }// for
    return false;
  }// checkUser()

  onSubmit(): boolean {
    if (this.user.email === '' || this.user.password === '') {
      return this.loggedIn = false;
    }

    if (this.checkUser()) {
      console.log('Zalogowano!');
      return this.loggedIn = true;
    } else {
      console.log('Nie udało się zalogować!');
      return this.loggedIn = false;
    }// if
  }// onSubmit()
}// AppLoginComponent
