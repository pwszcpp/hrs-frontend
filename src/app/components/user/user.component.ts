import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../classes/user';
import { Position } from '../../classes/position';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck {
  title = 'Pracownicy';
  users: User[] = [];
  roles = [];
  positions: Position[] = [];
  selectedUser: User;
  items: MenuItem[];

  constructor(
    public dataService: DataService,
    private router: Router,
    private messageService: MessageService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    if (!this.loginService.isLoggedIn() || !this.dataService.isAdmin()) {
      this.router.navigate(['/login']);
    }// if

    this.items = [
      {label: 'Edytuj', icon: 'fa-pencil', command: (event) => this.dataService.setUserEditDialogVisible(true)},
      {label: 'Usuń', icon: 'fa-trash', command: (event) => this.onDelete()}
    ];

    this.getUsers();
    this.getRoles();
    this.getPositions();
  }// ngOnInit()

  ngDoCheck() {
    if (this.dataService.getReload()) {
      this.getUsers();
      this.dataService.setReload(false);
    }// if
  }// ngDoCheck()

  getUsers(): void {
    this.dataService.getUsersArray().subscribe(
      res => this.users = res,
      err => console.log(err)
    );
  }// getUsers()

  getRoles(): void {
    this.dataService.getRolesArray().subscribe(
      res => this.roles = res,
      err => console.log(err)
    );
  }// getRoles()

  getPositions(): void {
    this.dataService.getPositionsArray().subscribe(
      res => this.positions = res,
      err => console.log(err)
    );
  }// getPositions()

  checkRole(bit: number): string {
    for (let i = 0; i < this.roles.length; i++) {
      if (bit === 65) {
        bit = 64;
      }// if

      if (this.roles[i].bit === bit) {
        return this.roles[i].role;
      }// if
    }// for

    return '';
  }// checkRole()

  getPosition(positions: any): string {
    let temp = '';

    for (let i = 0; i < positions.length; i++) {
      if (i === positions.length - 1) {
        temp += positions[i].name;
      }else {
        temp += positions[i].name + ', ';
      }// if
    }// for

    return temp;
  }// getPosition()

  onDelete(): void {
    this.dataService.deleteUser(this.selectedUser.id).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Usuwanie użytkownika', detail: 'Nie udało się usunąć użytkownika!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Usuwanie użytkownika', detail: 'Usunięto użytkownika!'});
        this.getUsers();
        this.getRoles();
      }
    );
  }// onDelete()

  /* addPositions(positions: any): number {
    let temp = 0;

    for (let i = 0; i < positions.length; i++) {
      temp += positions[i].id;
    }// for

    return temp;
  }// addPositions()

  onEdit(event: User): void {
    const body = new User(
      event.forename,
      event.surname,
      event.email,
      event.username,
      '1234',
      event.address,
      this.addPositions(event.positions),
      event.employmentStartDate,
      event.role
    );

    this.dataService.updateUser(event.id, body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja użytkownika', detail: 'Nie udało się edytować użytkownika!'}),
      () => this.messageService.add({severity: 'success', summary: 'Edycja użytkownika', detail: 'Edytowano użytkownika!'})
    );
  }// onEdit() */
}
