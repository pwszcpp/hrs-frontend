import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  constructor(public http: Http) {}

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?userId=1')
      .map(res => res.json());
  }
}
