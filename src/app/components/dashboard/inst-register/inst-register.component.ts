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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.createForms();
  }// ngOnInit()

  createForms(): void  {
    this.instReg = this.fb.group({
      theme: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      company: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      location: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      startDate: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      endDate: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cost: ['', Validators.compose([Validators.required, Validators.min(0)])],
      consent: ['', Validators.required],
      no_of_seats: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });
  }

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż 0!' :
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
      this.instReg.get('startDate').value,
      this.instReg.get('endDate').value,
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
