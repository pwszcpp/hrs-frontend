export class User {
  constructor(
    public forename: string,
    public surname: string,
    public email: string,
    public username: string,
    public password: string,
    public address: string,
    public position_id: number,
    public employmentStartDate: string,
    public role: number,
    public id?: number,
    public positions?: any
  ) {}
}
