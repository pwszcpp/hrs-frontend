export class Instruction {
  constructor(
    public id: number,
    public topic: string,
    public company: string,
    public location: string,
    public dateFrom: string,
    public dateTo: string,
    public cost: number,
    public manager: boolean,
    public assign: any[]
  ) {}
}
