import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: number = +localStorage.getItem('user');

  constructor(
    private router: Router,
    public dataService: DataService
  ) {
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.user = +localStorage.getItem('user');
  }

  onLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }// onLogout()

  getUser(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

}
