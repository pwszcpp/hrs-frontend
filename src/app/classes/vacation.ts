export class Vacation {
  constructor (
    public id?: number,
    public userId?: number,
    public name?: string,
    public surname?: string,
    public dateFrom?: string,
    public dateTo?: string,
    public accept?: boolean,
    public createdDate?: string
  ) {}
}
