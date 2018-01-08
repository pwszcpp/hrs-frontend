import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(
    private router: Router,
    public dataService: DataService,
    public loginService: LoginService
  ) {
  }// constructor()

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.getRoleFromServer();
    }// if
  }// ngOnInit()
}
