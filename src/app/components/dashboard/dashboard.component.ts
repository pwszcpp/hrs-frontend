import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { Instruction } from '../../classes/instruction';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})

export class DashboardComponent implements OnInit {
  title = 'Szkolenia';
  instructions: Instruction[] = [];
  url = 'http://localhost:3000';
  inst: Instruction;

  constructor(
    private http: Http,
    private router: Router,
    private messageService: MessageService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }

    this.getInstructions();
  }// ngOnInit()

  onLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }// onLogout()

  getInstructions(): void {
    this.dataService.getInstructionsArray().subscribe(
      res => this.instructions = res,
      err => console.log(err)
    );
  }// getInstructions()

  checkAssignInstruction(assigns: any[]): boolean {
    const userId = +localStorage.getItem('user'); // + - zamiana na liczbę

    return assigns.includes(userId) ? true : false;
  }// checkAssignInstruction()

  changeAssign(id: number, assigns: any[]): void {
    const userId = +localStorage.getItem('user');
    const tempInst = this.instructions[id - 1];

    if (!assigns.includes(userId)) {
      assigns.push(userId);
      this.messageService.add({severity: 'success', summary: 'Uczestnictwo', detail: 'Zapisano na szkolenie.'});
    } else {
      assigns.splice(assigns.indexOf(userId), 1);
      this.messageService.add({severity: 'warn', summary: 'Uczestnictwo', detail: 'Wypisano ze szkolenia'});
    }// if

    tempInst.assign = assigns;
    this.dataService.putIntoServer(id, tempInst).subscribe();
  }// changeAssign

  getPdf(value: Instruction) {
    this.dataService.setInstruction(value);
    this.router.navigate(['/invoice']);
  }// getPdf()
}
