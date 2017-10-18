import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../user';
import { USERS } from '../mock-users';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html'
})

export class LoginComponent implements OnInit {
  user = new User;
  logedIn = false;
  error: string;
  url = 'localhost:3000';


  constructor(private http: Http) {}

  ngOnInit(): void {
    this.logedIn = false;
  }

  onSubmit(): void {
    for (let i = 0; i < USERS.length; i++) {
      if (this.user.email === USERS[i].email && this.user.password === USERS[i].password) {
        this.logedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        console.log('(localStorage) User:' + JSON.parse(localStorage.getItem('currentUser')));
      }// if
    }// for
    for (let i = 0; i < USERS.length; i++) {
      console.log('(login) USERS:' + USERS[i]);
    }
  }// onSubmit()

  jsonGet(): void {
    this.http.get(this.url + '/posts').subscribe(
      res => console.log(res.json()),
      err => console.log(err)
    );
  }

  sendPost(): void {
    this.http.post(this.url + 'post', {id: this.user.id, email: this.user.email}).subscribe(
      resp => console.log(resp.json())
    );
  }
}// AppLoginComponent
