import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenuItem } from 'primeng/primeng';

import { Instruction } from '../../classes/instruction';
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  title = 'Szkolenia';
  instructions: Instruction[] = [];
  instructionsAssign = [];
  inst: Instruction;
  items: MenuItem[];

  constructor(
    private router: Router,
    public dataService: DataService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
    this.getInstructions();
    this.getInstructionsAssign();
  }// constructor()

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.items = [
      {label: 'Dodaj', icon: 'fa-plus', command: (event) => this.dataService.setInstDialogVisible(true)},
      {label: 'Edytuj', icon: 'fa-pencil', command: (event) => this.dataService.setDialogVisible(true)},
      {label: 'Odswież', icon: 'fa-refresh', command: (event) => { this.getInstructions(); this.getInstructionsAssign(); }},
      // {label: 'Pobierz PDF', icon: 'fa-file-pdf-o', command: (event) => this.getPdf(this.inst)}
    ];
  }// ngOnInit()

  getInstructions(): void {
    this.dataService.getInstructionsArray().subscribe(
      res => this.instructions = res,
      err => console.log(err)
    );
  }// getInstruction()

  getInstructionsAssign(): void {
    this.dataService.getInstructionAssignArray().subscribe(
      res => this.instructionsAssign = res,
      err => console.log(err)
    );
  }// getInstructionsAssign()

  getPdf(value: Instruction) {
    this.dataService.setInstruction(value);
    this.router.navigate(['/invoice']);
  }// getPdf()

  isAssigned(id: number): boolean {
    return this.instructionsAssign.includes(+id);
  }// isTrue()

  refresh(): void {
    this.getInstructions();
    this.getInstructionsAssign();
  }// refresh()

  changeAssign(id: number, bool: boolean): void {
    if (bool) {
      this.dataService.changeInstructionAssign(id, bool).subscribe(
        () => {},
        err => {
          this.messageService.add({severity: 'error', summary: 'Szkolenie', detail: 'Nie udało się zapisać na szkolenie!'});
        },
        () => {
          this.messageService.add({severity: 'success', summary: 'Szkolenie', detail: 'Zapisano na szkolenie!'});
          this.getInstructionsAssign();
        }
      );
    } else {
      this.dataService.changeInstructionAssign(id, bool).subscribe(
        () => {},
        err => {
          this.messageService.add({severity: 'error', summary: 'Szkolenie', detail: 'Nie udało się wypisać ze szkolenia!'});
        },
        () => {
          this.messageService.add({severity: 'warn', summary: 'Szkolenie', detail: 'Wypisano ze szkolenia!'});
          this.getInstructionsAssign();
        }
      );
    }
  }// changeAssign()
}
