import { Component, OnInit } from '@angular/core';
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
export class SalaryComponent implements OnInit {
  title = 'Pracownicy';
  users: Salary[];
  selectedUsers: Salary[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService
  ) {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.getSalary();
  }// ngOnInit()

  getSalary(): void {
    this.dataService.getSalaryArray().subscribe(
      res => this.users = res,
      err => console.log(err)
    );
  }// getSalary()

  onEdit(event: Salary): void {
    this.dataService.updateSalary(event.id, event).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja wynagrodzenia', detail: 'Nie udało się edytować wynagrodzenia!'}),
      () => this.messageService.add({severity: 'success', summary: 'Edycja wynagrodzenia', detail: 'Edytowano wynagrodzenie!'})
    );
  }// onEdit()

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
