import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { DataService } from '../../services/data.service';
import { User } from '../../classes/user';
import { Salary } from '../../classes/salary';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit, DoCheck {
  title = 'Pensje';
  salaries: Salary[] = [];
  selectedSalaries: Salary[] = [];
  usersUsernames: string[] = [];

  constructor(
    public dataService: DataService,
    private router: Router,
    private messageService: MessageService
  ) {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.getSalary();
  }// ngOnInit()

  ngDoCheck() {
    if (this.dataService.getReload()) {
      this.getSalary();
      this.dataService.setReload(false);
    }// if
  }

  getSalary(): void {
    this.dataService.getSalaryArray().subscribe(
      res => this.salaries = res,
      err => console.log(err)
    );
  }// getSalary()

  onEdit(event: Salary): void {
    const body = new Salary(
      event.user.id,
      event.employment_arrangement,
      event.base_salary,
      event.seniority,
      event.salary_supplement,
      event.employment_status
    );

    this.dataService.updateSalary(event.id, body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja wynagrodzenia', detail: 'Nie udało się edytować wynagrodzenia!'}),
      () => this.messageService.add({severity: 'success', summary: 'Edycja wynagrodzenia', detail: 'Edytowano wynagrodzenie!'})
    );
  }// onEdit()

  onDelete(): void {
    if (this.selectedSalaries.length <= 0) {
      this.messageService.add({severity: 'warn', summary: 'Usuwanie pensji', detail: 'Brak zaznaczonych pensji!'});
    }else if (this.selectedSalaries.length > 1) {
      for (let i = 0; i < this.selectedSalaries.length; i++) {
        this.dataService.deleteSalary(this.selectedSalaries[i].id).subscribe(
          () => {},
          err => this.messageService.add({severity: 'error', summary: 'Usuwanie pensji', detail: 'Nie udało się usunąć pensji!'}),
          () => {
            this.messageService.add({severity: 'success', summary: 'Usuwanie pensji', detail: 'Usunięto pensję!'});

            if (i === this.selectedSalaries.length - 1) {
              this.getSalary();
              this.selectedSalaries = [];
            }// if
          }
        );
      }// for
    } else {
      this.dataService.deleteSalary(this.selectedSalaries[0].id).subscribe(
        () => {},
        err => this.messageService.add({severity: 'error', summary: 'Usuwanie pensji', detail: 'Nie udało się usunąć pensji!'}),
        () => {
          this.messageService.add({severity: 'success', summary: 'Usuwanie pensji', detail: 'Usunięto pensję!'});
          this.getSalary();
          this.selectedSalaries = [];
        }
      );
    }// if
  }// onDelete()

  /* getPdf(): boolean {
    if (this.selectedUsers.length === 0) {
      this.messageService.add({severity: 'warn', summary: 'Pobieranie PDF', detail: 'Brak zaznaczonych pracowników!'});
      return false;
    }// if

    const userNames = [];
    const userSurnames = [];
    const userSalarys = [];

    for (let i = 0; i < this.selectedUsers.length; i++) {
      userNames.push(this.selectedUsers[i].name);
      userSurnames.push(this.selectedUsers[i].surname);
      userSalarys.push(this.selectedUsers[i].salary + ' zł');
    }// for

    const dd = {
      content: [
        {text: 'Lista pensji pracowników', style: 'header'},
        'Podane pensje zawierają premię oraz są uzależnione od stanowiska pracownika.',
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: [
              [{text: 'Imię', style: 'tableHeader'}, {text: 'Nazwisko', style: 'tableHeader'}, {text: 'Pensja', style: 'tableHeader'}],
              [userNames, userSurnames, userSalarys]
            ]
          },
          layout: 'lightHorizontalLines'
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
    };
    pdfMake.createPdf(dd).open({}, window);
    return true;
  }// getPdf() */
}
