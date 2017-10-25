import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Rejestracja użytkownika';
  addedUser: boolean;
  user = new User();
  users = [];
  url = 'http://localhost:3000';

  constructor(private http: Http) { }

  ngOnInit() {
    this.getUsers();
  }

  onReset(): void {
    this.user.email = '';
    this.user.name = '';
    this.user.password = '';
    this.user.surname = '';
    this.user.login = '';
    this.addedUser = null;
  }// onReset()

  onSubmit(): void {
    if (this.checkUser) {
      this.addedUser = true;
      this.doPostUser();
    } else {
      this.addedUser = false;
    }// if
  }// onSubmit()

  getUsers(): any {
    this.http.get(this.url + '/users').subscribe(
      res => this.users = res.json(),
      err => console.log(err)
    );
  }// getUsers()

  checkUser(): boolean {
    if (
      this.user.email === '' ||
      this.user.name === '' ||
      this.user.password === '' ||
      this.user.surname === ''
    ) { return false; }
    return true;
  }// checkUser()

  doPostUser(): void {
    this.user.id = this.users.length + 1;
    this.http.post(this.url + '/users', this.user).subscribe(
      res => console.log(res.json()),
      err => console.log(err)
    );
  }
}
