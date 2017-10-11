import { Component } from '@angular/core';

import { User } from '../user';
import { USERS } from '../mock-users';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html'
})

export class LoginComponent {
  user = new User;
  logedIn = false;

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
}// AppLoginComponent
