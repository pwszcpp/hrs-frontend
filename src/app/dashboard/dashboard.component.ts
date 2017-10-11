import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DataService } from '../data-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('currentUser'));
  posts: Post[];

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
