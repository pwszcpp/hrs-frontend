export class Vacation {
  constructor (
    public id?: number,
    public users_id?: number,
    public leave_dimension?: number,
    public overdue_leave?: number,
    public days_used?: number,
    public create_date?: string,
    public start_date?: string,
    public end_date?: string,
    public agreed?: boolean,
    public disagree_reason?: string
  ) {}
}
