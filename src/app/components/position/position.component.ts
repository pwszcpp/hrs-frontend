import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';
import { Position } from '../../classes/position';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, DoCheck {
  title = 'Stanowiska';
  items: MenuItem[] = [];
  positions: Position[] = [];
  selectedPosition: Position;

  constructor(
    public dataService: DataService,
    private router: Router,
    private messageService: MessageService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    if (!this.loginService.isLoggedIn() || !this.dataService.isAdmin()) {
      this.router.navigate(['/login']);
    }// if

    this.items = [
      {label: 'Edytuj', icon: 'fa-pencil', command: (event) => this.dataService.setPositionEditDialogVisible(true)},
      {label: 'Usuń', icon: 'fa-trash', command: (event) => this.onDelete()}
    ];

    this.getPositions();
  }// ngOnInit()

  ngDoCheck() {
    if (this.dataService.getReload()) {
      this.getPositions();
      this.dataService.setReload(false);
    }// if
  }// ngDoCheck()

  getPositions(): void {
    this.dataService.getPositionsArray().subscribe(
      res => this.positions = res,
      err => console.log(err)
    );
  }// getPositions()

  onDelete(): void {
    this.dataService.deletePosition(this.selectedPosition.id).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Usuwanie stanowiska', detail: 'Nie udało się usunąć stanowiska!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Usuwanie stanowiska', detail: 'Usunięto stanowisko!'});
        this.getPositions();
      }
    );
  }// onDelete()
}
