import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, RequestOptions, Headers} from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private http: Http, private _cookieService: CookieService, private router: Router) { }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('Session')) {
      return true;
    }
    return false;
  }

  public login(username, password): boolean {
    const body = new FormData();
    let loginSuccess = false;

    body.append('username', username);
    body.append('password', password);
    this.http.post('http://localhost:8081/login', body, new RequestOptions({withCredentials: true})).subscribe(
      res => {
        localStorage.setItem('Session', this.getCookie('Session'));
        this.router.navigate(['/dashboard']);
        loginSuccess = true;
        console.log(res);
      },
      err => {
        loginSuccess = false;
      }
    );
    return loginSuccess;
  }

  public logout() {
    localStorage.removeItem('Session');
    this._cookieService.delete('Session');
    this.http.get('http://localhost:8081/logout').subscribe(
      res => console.log(res)
    );
    this.router.navigate(['/login']);
  }
}
