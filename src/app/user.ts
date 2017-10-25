export class User {
  constructor(
    public id: number = 1,
    public name: string = '',
    public surname: string = '',
    public email: string = '',
    public password: string = '',
    public login: string = ''
  ) {}
}
