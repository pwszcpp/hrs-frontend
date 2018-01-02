import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataService } from '../../../services/data.service';
import { Instruction } from '../../../classes/instruction';

@Component({
  selector: 'app-inst-register',
  templateUrl: './inst-register.component.html',
  styleUrls: ['./inst-register.component.css'],
})

export class InstRegisterComponent implements OnInit {
  instReg: FormGroup;
  date: Date;
  date2: Date;
  minDate = new Date();
  pl: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.createForms();
    this.pl = this.dataService.setPolishCalendar();
  }// ngOnInit()

  createForms(): void  {
    this.instReg = this.fb.group({
      theme: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      company: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      location: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      cost: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(100000)])],
      consent: ['', Validators.required],
      no_of_seats: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(1000)])]
    });
  }

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilość znaków: ' + value.errors.minlength.requiredLength :
    value.errors.maxlength ? 'Wymagana maksymalna ilość znaków: ' + value.errors.maxlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż ' + value.errors.min.min + '!' :
    value.errors.max ? 'Liczba musi być mniejsza niż ' + value.errors.max.max + '!' :
    '';
  }

  onReset(): void {
    this.instReg.reset();
  }// onReset()

  onRegister(): void {
    const body = new Instruction(
      this.instReg.get('theme').value,
      this.instReg.get('company').value,
      this.instReg.get('location').value,
      this.dataService.convertDate(this.date),
      this.dataService.convertDate(this.date2),
      this.instReg.get('cost').value,
      this.instReg.get('consent').value,
      1,
      this.instReg.get('no_of_seats').value
    );

    this.dataService.postInstruction(body).subscribe(
      () => {},
      err => {
        this.messageService.add({severity: 'error', summary: 'Rejestracja szkolenia', detail: 'Nie udało się zarejestrować szkolenia!'});
      },
      () => {
        this.messageService.add({severity: 'success', summary: 'Rejestracja szkolenia', detail: 'Zarejestrowano szkolenie!'});
        this.onReset();
        this.dataService.setInstDialogVisible(false);
        this.dataService.setReload(true);
      }
    );
  }// onRegister
}
