import { USERS } from './mock-users';

export class User {
  constructor(
    public name: string = '',
    public surname: string = '',
    public email: string = '',
    public password: string = ''
  ) {}

  onReset(): void {
    this.name = '';
    this.surname = '';
    this.email = '';
    this.password = '';
  }

  onAddUser(user: User): void {
    USERS.push(user);

    console.log(JSON.parse(localStorage.getItem('currentUser')));
    for (let i = 0; i < USERS.length; i++) {
      console.log('USERS:' + USERS[i]);
    }
  }
}
