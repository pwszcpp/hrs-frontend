export class Position {
  constructor(
    public name: string,
    public min_salary: number,
    public max_salary: number,
    public max_percent_salary_supplement: number,
    public id?: number
  ) {}
}
