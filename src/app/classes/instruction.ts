export class Instruction {
  constructor(
    public theme: string,
    public company: string,
    public location: string,
    public startDate: string,
    public endDate: string,
    public cost: number,
    public consent: boolean,
    public cancelled: number,
    public no_of_seats: number,
    public id?: number,
  ) {}
}
