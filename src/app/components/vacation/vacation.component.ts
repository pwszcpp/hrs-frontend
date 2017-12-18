import { Component, OnInit } from '@angular/core';
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

export class VacationComponent implements OnInit {
  title = 'Urlopy';
  vacations: Vacation[] = [];
  date: Date[];
  minDate = new Date();
  maxDate = new Date();
  pl: any;
  userID: number;

  constructor(
    private router: Router,
    public dataService: DataService,
    private messageService: MessageService,
    private loginService: LoginService
  ) {
    this.setPolishCalendar();
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  ngOnInit() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }// if

    this.getVacations();
    this.dataService.getUserID().subscribe(
      res => this.userID = res,
      err => console.log(err)
    );
  }// ngOnInit()

  getVacations(): void {
    this.dataService.getVacationsArray().subscribe(
      res => this.vacations = res,
      err => console.log(err)
    );
  }// getVacations()

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
      if (this.vacations[i].start_date === this.dataService.convertDate(this.date[0]) &&
      this.vacations[i].end_date === this.dataService.convertDate(this.date[1])) {
        return true;
      }// if
    }// for

    return false;
  }// isInArray()

  onCreate(): void {
    if (this.date != null && this.date[0] != null && this.date[1] != null && !this.isInArray()) {
      const today = new Date();
      const body = new Vacation(
        this.userID,
        26,
        13,
        7,
        this.dataService.convertDate(today),
        this.dataService.convertDate(this.date[0]),
        this.dataService.convertDate(this.date[1]),
        false,
        null,
        null,
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

  /* setAdminMode(value: boolean): void {
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
  }// setStatus() */
}
