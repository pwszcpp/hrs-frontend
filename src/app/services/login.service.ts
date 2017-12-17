import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, RequestOptions, Headers} from '@angular/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private _cookieService: CookieService,
    private router: Router,
    public messageService: MessageService
  ) { }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('Session')) {
      return true;
    }
    return false;
  }

  public login(username, password): void {
    const body = new FormData();

    body.append('username', username);
    body.append('password', password);
    this.http.post('http://localhost:8081/login', body, new RequestOptions({withCredentials: true})).subscribe(
      () => {},
      err => {
        this.messageService.add({severity: 'warn', summary: 'Logowanie', detail: 'Niepoprawny e-mail lub hasło!'});
      },
      () => {
        localStorage.setItem('Session', this.getCookie('Session'));
        this.router.navigate(['/dashboard']);
        this.messageService.add({severity: 'success', summary: 'Logowanie', detail: 'Zalogowano!'});
      }
    );
  }

  public logout() {
    localStorage.removeItem('Session');
    this._cookieService.delete('Session');
    this.http.get('http://localhost:8081/logout', new RequestOptions({withCredentials: true})).subscribe(
      () => {},
      err => this.messageService.add({severity: 'warn', summary: 'Wylogowanie', detail: 'Nie udało się poprawnie wylogować!'}),
      () => {
        this.router.navigate(['/login']);
        this.messageService.add({severity: 'success', summary: 'Wylogowanie', detail: 'Wylogowano!'});
      }
    );
  }
}
