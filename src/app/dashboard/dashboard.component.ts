import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  // instructions = [];
  // url = 'http://localhost:3000';

  displayedColumns = ['id', 'topic', 'company', 'location', 'dateFrom', 'dateTo', 'cost', 'manager'];
  dataSource: InstructionDataSource | null;
  instDatabase = new InstructionDatabase();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: Http, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }

    this.dataSource = new InstructionDataSource(this.instDatabase, this.paginator);
    // this.getInstructions();
  }

  onLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  /* getInstructions(): any {
    this.http.get(this.url + '/instructions').subscribe(
      res => this.instructions = res.json(),
      err => console.log(err)
    );
  }// getInstructions() */

}

export interface Instruction {
  id: number;
  topic: string;
  company: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  cost: number;
  manager: string;
}

/* const data: Instruction[] = [
  { id: 1, topic: 'Test', company: 'Test', location: 'Test', dateFrom: '2017-11-08', dateTo: '2017-11-10', cost: 200, manager: 'Tak' },
]; */

export class InstructionDatabase {
  dataChange: BehaviorSubject<Instruction[]> = new BehaviorSubject<Instruction[]>([]);
  get data(): Instruction[] { return this.dataChange.value; }

  constructor() {
    for (let i = 0; i < 100; i++) {
      const addedData = this.data.slice();
      addedData.push({ id: i + 1, topic: 'Test', company: 'Test', location: 'Test',
      dateFrom: '2017-11-08', dateTo: '2017-11-10', cost: 200 + i, manager: 'Tak' });
      this.dataChange.next(addedData);
     }
  }
}

export class InstructionDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: InstructionDatabase, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Instruction[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
