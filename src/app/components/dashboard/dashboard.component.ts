import { Component, OnInit, DoCheck } from '@angular/core';
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

export class DashboardComponent implements OnInit, DoCheck {
  title = 'Szkolenia';
  instructions: Instruction[] = [];
  instructionsAssign = [];
  selectedInctruction: Instruction;
  items: MenuItem[];

  constructor(
    private router: Router,
    public dataService: DataService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
  }// constructor()

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.getInstructions();
    this.getInstructionsAssign();

    this.items = [
      {label: 'Edytuj', icon: 'fa-pencil', command: (event) => this.dataService.setDialogVisible(true)},
      {label: 'Usun', icon: 'fa-trash', command: (event) => this.onDelete()},
      // {label: 'Pobierz PDF', icon: 'fa-file-pdf-o', command: (event) => this.getPdf(this.inst)}
    ];
  }// ngOnInit()

  ngDoCheck() {
    if (this.dataService.getReload()) {
      this.getInstructions();
      this.getInstructionsAssign();
      this.dataService.setReload(false);
    }// if
  }

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

  onRefresh(): void {
    this.getInstructions();
    this.getInstructionsAssign();
  }// onRefresh()

  onDelete(): void {
    this.dataService.deleteInstruction(this.selectedInctruction.id).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Usuwanie szkolenia', detail: 'Nie udało się usunąć szkolenia!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Usuwanie szkolenia', detail: 'Usunięto szkolenie!'});
        this.getInstructions();
        this.getInstructionsAssign();
      }
    );
  }// onDelete()

  changeAssign(id: number, bool: boolean): void {
    if (bool) {
      this.dataService.changeInstructionAssign(id, bool).subscribe(
        () => {},
        err => {
          this.messageService.add({severity: 'error', summary: 'Zapis na szkolenie', detail: 'Nie udało się zapisać na szkolenie!'});
        },
        () => {
          this.messageService.add({severity: 'success', summary: 'Zapis na szkolenie', detail: 'Zapisano na szkolenie!'});
          this.getInstructionsAssign();
        }
      );
    } else {
      this.dataService.changeInstructionAssign(id, bool).subscribe(
        () => {},
        err => {
          this.messageService.add({severity: 'error', summary: 'Zapis na szkolenie', detail: 'Nie udało się wypisać ze szkolenia!'});
        },
        () => {
          this.messageService.add({severity: 'warn', summary: 'Zapis na szkolenie', detail: 'Wypisano ze szkolenia!'});
          this.getInstructionsAssign();
        }
      );
    }
  }// changeAssign()
}
