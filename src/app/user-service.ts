import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  http: Http;

  getUsers(url: string): Promise<User[]> {
    return this.http.get(url)
    .toPromise()
    .then(res => res.json())
    .catch(err => console.log(err));
  }
}
