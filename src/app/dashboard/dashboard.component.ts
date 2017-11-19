import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { TableDialogEditComponent } from './table-dialog-edit/table-dialog-edit.component';
import { Instruction } from '../instruction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  instructions: Instruction[];
  url = 'http://localhost:3000';

  displayedColumns = ['id', 'topic', 'company', 'location', 'dateFrom', 'dateTo', 'cost', 'manager', 'assign'];
  dataSource: InstructionDataSource | null;
  instDatabase = new InstructionDatabase();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: Http, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }

    this.dataSource = new InstructionDataSource(this.instDatabase, this.paginator);
    this.getInstructions();
  }// ngOnInit()

  onLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }// onLogout()

  getInstructions() {
    return this.http.get(this.url + '/instructions').subscribe(
      res => this.instructions = res.json(),
      err => console.log(err),
      () => this.addInstructions()
    );
  }// getInstructions()

  addInstructions(): void {
    for (let i = 0; i < this.instructions.length; i++) {
      const addedData = this.instDatabase.data.slice();
      addedData.push(this.instructions[i]);
      this.instDatabase.dataChange.next(addedData);
    }// for
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(TableDialogEditComponent, {
      width: '300px',
      data: { value: this.instDatabase.dataChange.value[id - 1], database: this.instDatabase }
    });
  }// openDialog()

  checkAssignInstruction(assigns: any[]): string {
    const userId = +localStorage.getItem('user'); // + - zamiana na liczbę

    return assigns.includes(userId) ? 'Tak' : 'Nie';
  }// checkAssignInstruction()

  changeAssign(id: number, assigns: any[]): void {
    const userId = +localStorage.getItem('user');
    const inst = new Instruction(
      this.instDatabase.dataChange.value[id - 1].id,
      this.instDatabase.dataChange.value[id - 1].topic,
      this.instDatabase.dataChange.value[id - 1].company,
      this.instDatabase.dataChange.value[id - 1].location,
      this.instDatabase.dataChange.value[id - 1].dateFrom,
      this.instDatabase.dataChange.value[id - 1].dateTo,
      this.instDatabase.dataChange.value[id - 1].cost,
      this.instDatabase.dataChange.value[id - 1].manager,
      this.instDatabase.dataChange.value[id - 1].assign,
    );

    if (!assigns.includes(userId)) {
      assigns.push(userId);
    } else {
      assigns.splice(assigns.indexOf(userId), 1);
    }// if

    inst.assign = assigns;
    this.http.put(this.url + '/instructions/' + id, inst).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }// changeAssign
}

export class InstructionDatabase {
  dataChange: BehaviorSubject<Instruction[]> = new BehaviorSubject<Instruction[]>([]);
  get data(): Instruction[] { return this.dataChange.value; }

  constructor() {
  }
}

export class InstructionDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: InstructionDatabase, private _paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Instruction[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
