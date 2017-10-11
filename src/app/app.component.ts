import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Strona testowa';
  user = JSON.parse(localStorage.getItem('currentUser'));

  ngOnInit(): void {
    console.log('User:' + this.user);
    localStorage.clear();
  }
}
