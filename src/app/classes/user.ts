export class User {
  constructor(
    // public name: string,
    // public surname: string,
    public email: string,
    public username: string,
    public password: string,
    public address: string,
    public position: string,
    public taxOffice: string,
    public employmentStartDate: string,
    public id?: number
  ) {}
}
