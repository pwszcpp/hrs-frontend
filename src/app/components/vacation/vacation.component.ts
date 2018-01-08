import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { Vacation } from '../../classes/vacation';
import { DataService } from '../../services/data.service';
import { User } from '../../classes/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css'],
})

export class VacationComponent implements OnInit, DoCheck {
  title = 'Urlopy';
  vacations: Vacation[] = [];
  date: Date[];
  minDate = new Date();
  maxDate = new Date();
  pl: any;
  adminMode: boolean;
  dialog: boolean;
  selectedVacation: Vacation;
  user: User;

  constructor(
    private router: Router,
    public dataService: DataService,
    private messageService: MessageService,
    private loginService: LoginService
  ) {
    this.pl = this.dataService.setPolishCalendar();
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  ngOnInit() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }// if

    this.adminMode = false;
    this.dialog = false;
    this.getVacations();
    this.dataService.getUser().subscribe(
      res => this.user = res,
      err => console.log(err)
    );
  }// ngOnInit()

  ngDoCheck() {
    if (this.dataService.getReload()) {
      this.getVacations();
      this.dataService.setReload(false);
    }// if
  }

  getVacations(): void {
    if (this.adminMode) {
      this.dataService.getVacationsArray().subscribe(
        res => this.vacations = res,
        err => console.log(err),
        () => {
          const temp = [];

          for (let i = 0; i < this.vacations.length; i++) {
            if (this.vacations[i].disagree_reason === '' && this.vacations[i].agreed === false &&
            this.vacations[i].user.username !== this.user.username) {
              temp.push(this.vacations[i]);
            }// if
          }// for
          this.vacations = temp;
        }
      );
    }else {
      this.dataService.getLoggedUserVacationsArray().subscribe(
        res => this.vacations = res,
        err => console.log(err)
      );
    }// if
  }// getVacations()

  isInArray(): boolean {
    for (let i = 0; i < this.vacations.length; i++) {
      if (this.vacations[i].start_date === this.dataService.convertDate(this.date[0]) &&
      this.vacations[i].end_date === this.dataService.convertDate(this.date[1])) {
        return true;
      }// if
    }// for

    return false;
  }// isInArray()

  onCreate(): void {
    this.isInArray();
    if (this.date != null && this.date[0] != null && this.date[1] != null && !this.isInArray()) {
      const today = new Date();
      const body = new Vacation(
        26,
        13,
        7,
        this.dataService.convertDate(today),
        this.dataService.convertDate(this.date[0]),
        this.dataService.convertDate(this.date[1]),
        false,
        ''
      );

      this.dataService.postVacation(body).subscribe(
        () => {},
        err => this.messageService.add({severity: 'error', summary: 'Dodawanie urlopu', detail: 'Nie udało się dodać urlopu!'}),
        () => {
          this.messageService.add({severity: 'success', summary: 'Dodawanie urlopu', detail: 'Dodano urlop!'});
          this.getVacations();
        }
      );
    } else
    if (this.date != null && this.isInArray()) {
      this.messageService.add({severity: 'error', summary: 'Dodawanie urlopu', detail: 'Podane daty sa już w bazie!'});
    } else {
      this.messageService.add({severity: 'warn', summary: 'Dodawanie urlopu', detail: 'Brak zaznaczonego przedziału dat!'});
    }
  }// onCreate()

  getAccept(val: boolean): string {
    return val ? 'Zaakceptowano' : val == null ? 'Czeka na rozpatrzenie' : 'Nie zaakceptowano';
  }// getAccept()

  setAdminMode(value: boolean): void {
    this.adminMode = value;
    this.getVacations();
  }// setAdminMode()

  setStatus(data: Vacation, value: boolean, reason?: string): void {
    const body = data;
    body.agreed = value;
    body.users_id = body.user.id;

    if (value) {
      this.dataService.updateVacation(body.id, body).subscribe(
        () => {},
        err => this.messageService.add({severity: 'error', summary: 'Edycja urlopu', detail: 'Nie udało się edytować urlopu!'}),
        () => {
          this.messageService.add({severity: 'success', summary: 'Edycja urlopu', detail: 'Edytowano urlop!'});
          this.dataService.setReload(true);
        }
      );
    } else {
      body.disagree_reason = reason;

      this.dataService.updateVacation(body.id, body).subscribe(
        () => {},
        err => this.messageService.add({severity: 'error', summary: 'Edycja urlopu', detail: 'Nie udało się edytować urlopu!'}),
        () => {
          this.messageService.add({severity: 'success', summary: 'Edycja urlopu', detail: 'Edytowano urlop!'});
          this.dialog = false;
          this.dataService.setReload(true);
          this.selectedVacation = null;
        }
      );
    }// if
  }// setStatus()
}
