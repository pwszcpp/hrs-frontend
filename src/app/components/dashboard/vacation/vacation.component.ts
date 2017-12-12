import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { Vacation } from '../../../classes/vacation';
import { DataService } from '../../../services/data.service';
import { User } from '../../../classes/user';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css'],
  providers: [MessageService]
})

export class VacationComponent implements OnInit {
  admin: number[] = [1];
  adminMode: boolean;

  title = 'Urlopy';
  vacations: Vacation[] = [];
  adminModeVacations: Vacation[] = [];
  date: Date[];
  minDate = new Date();
  maxDate = new Date();
  pl: any;
  user = +localStorage.getItem('user');

  constructor(
    private router: Router,
    public dataService: DataService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }// if

    this.getVacations();
    this.setPolishCalendar();

    this.adminMode = false;
    this.minDate.setDate(this.minDate.getDate() + 1);
  }// ngOnInit()

  getVacations(): void {
    this.dataService.getVacationsArray().subscribe(
      res => this.adminModeVacations = res, // res.forEach(data => data.userId === this.user ? this.vacations.push(data) : {}),
      err => console.log(err),
      () => {
        this.vacations = this.getAdminModeArray(false);
      }
    );
  }// getVacations()

  getAdminModeArray(val: boolean): Vacation[] {
    const array = [];

    if (!val) {
      for (let i = 0; i < this.adminModeVacations.length; i++) {
        if (this.adminModeVacations[i].userId === this.user) {
          array.push(this.adminModeVacations[i]);
        }// if
      }// for

      return array;
    } else {
      for (let i = 0; i < this.adminModeVacations.length; i++) {
        if (this.adminModeVacations[i].accept === null) {
          array.push(this.adminModeVacations[i]);
        }// if
      }// for

      return array;
    }
  }// testArray()

  setPolishCalendar(): void {
    this.pl = {
      firstDayOfWeek: 1,
      dayNames: [ 'Niedziela', 'Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek', 'Sobota' ],
      dayNamesShort: [ 'Nd', 'Pon', 'Wt', 'Sr', 'Czw', 'Pt', 'Sb' ],
      dayNamesMin: [ 'N', 'P', 'W', 'S', 'C', 'P', 'S' ],
      monthNames: [ 'Styczen', 'Luty', 'Marzec', 'Kwiecien', 'Maj', 'Czerwiec',
        'Lipiec', 'Sierpien', 'Wrzesien', 'Pazdziernik', 'Listopad', 'Grudzien' ],
      monthNamesShort: [ 'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Czer', 'Lip', 'Sier', 'Wrz', 'Paz', 'Lis', 'Gru' ],
      today: 'Dzisiaj',
      clear: 'Wyczysc'
    };
  }

  isInArray(): boolean {
    for (let i = 0; i < this.vacations.length; i++) {
      if (this.vacations[i].dateFrom === this.date[0].toLocaleDateString() &&
      this.vacations[i].dateTo === this.date[1].toLocaleDateString()) {
        return true;
      }// if
    }// for

    return false;
  }// isInArray()

  onCreate(): void {
    if (this.date != null && this.date[0] != null && this.date[1] != null && !this.isInArray()) {
      let users: User[] = [];
      const today = new Date();

      this.dataService.getUsersArray().subscribe(
        res => users = res,
        err => console.log(err),
        () => {
          const user = users.find(x => x.id === +localStorage.getItem('user'));
          const temp = new Vacation(
            this.adminModeVacations.length + 1,
            +localStorage.getItem('user'),
            user.name,
            user.surname,
            this.date[0].toLocaleDateString(),
            this.date[1].toLocaleDateString(),
            null,
            today.getDate().toString() + '.' + today.getMonth().toString() + '.' + today.getFullYear().toString()
          );

          this.dataService.postIntoServer(temp, 'vacation').subscribe(
            () => {},
            err => console.log(err),
            () => {
              this.getVacations();
            }
          );
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
    this.vacations = this.getAdminModeArray(value);
  }// setAdminMode()

  setStatus(id: number, vacation: Vacation, value: boolean): void {
    if (vacation.userId !== this.user) {
      const body: Vacation = vacation;
      body.accept = value;

      this.dataService.putIntoServer(id, body, 'vacation').subscribe(
        () => {},
        err => console.log(err),
        () => {
          this.getVacations();
        }
      );
    } else {
      this.messageService.add({severity: 'warn', summary: 'Zmiana statusu urlopu', detail: 'Nie możesz zatwierdzać własnych urlopów!'});
    }
  }// setStatus()
}
