import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { TableDialogEditComponent } from './table-dialog-edit/table-dialog-edit.component';
import { Instruction } from '../../classes/instruction';
import { InstructionDataSource } from './classes/instructionDataSource';
import { InstructionDatabase } from './classes/InstructionDatabase';

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
