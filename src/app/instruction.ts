export class Instruction {
  constructor(
    public id: number = 1,
    public topic: string = '',
    public company: string = '',
    public location: string = '',
    public dateFrom: string = '',
    public dateTo: string = '',
    public cost: number = 0,
    public manager: boolean = false
  ) {}
}
