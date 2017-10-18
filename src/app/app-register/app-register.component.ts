import { Component, OnInit } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css']
})
export class RegisterComponent implements OnInit {
  added = false;
  user = new User();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(name: string, surname: string, email: string, password: string): void {
    this.added = true;
    this.user.onAddUser(new User(1, name, surname, email, password));
    this.user.onReset();
  }
}
