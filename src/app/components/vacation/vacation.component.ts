import { Component, OnInit, OnChanges } from '@angular/core';
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
  adminMode: boolean;
  dialog: boolean;
  selectedVacation: Vacation;

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

    this.adminMode = false;
    this.dialog = false;
    this.getVacations();
  }// ngOnInit()

  ngOnChanges() {
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
            if (this.vacations[i].disagree_reason === '' && this.vacations[i].agreed === false) {
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
      return true;
    }// for

    return false;
  }// isInArray()

  onCreate(): void {
    this.isInArray();
    if (this.date != null && this.date[0] != null && this.date[1] != null) { // && !this.isInArray()) {
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

  setStatus(data: Vacation, value: boolean): void {
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
      this.dialog = true;
      this.selectedVacation = data;
    }// if
  }// setStatus()

  createWithDisagreeReason(reason: string): void {
    const body = this.selectedVacation;
    body.agreed = false;
    body.disagree_reason = reason;
    body.users_id = body.user.id;

    this.dataService.updateVacation(body.id, body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja urlopu', detail: 'Nie udało się edytować urlopu!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Edycja urlopu', detail: 'Edytowano urlop!'});
        this.dialog = false;
        this.dataService.setReload(true);
      }
    );
  }// createWithDisagreeReason()
}
