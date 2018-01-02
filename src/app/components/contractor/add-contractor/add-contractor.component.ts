import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-add-contractor',
  templateUrl: './add-contractor.component.html',
  styleUrls: ['./add-contractor.component.css']
})
export class AddContractorComponent implements OnInit {
  conReg: FormGroup;

  constructor(
    public dataService: DataService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForms();
  }// ngOnInit()

  createForms(): void  {
    this.conReg = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      nip_number: ['', Validators.compose([Validators.required, Validators.min(999999999), Validators.max(10000000000)])],
      regon_number: ['', Validators.compose([Validators.required, Validators.min(99999999), Validators.max(1000000000)])],
      bank_account_number: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(10000000000)])],
        // Validators.min(9999999999999999999999999), Validators.max(100000000000000000000000000)])],
      payment_form: ['', Validators.required, , Validators.maxLength(20)],
      active_taxpayer_VAT_tax: ['', Validators.required]
    });
  }// createForms()

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilość znaków: ' + value.errors.minlength.requiredLength :
    value.errors.maxlength ? 'Wymagana maksymalna ilość znaków: ' + value.errors.maxlength.requiredLength :
    value.errors.max ? 'Podany numer jest niewłaściwy!' :
    value.errors.min ? 'Podany numer jest niewłaściwy!' :
    '';
  }// getValidErrors()

  onRegister(): void {
    this.dataService.postContractor(this.conReg.value).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Dodawanie kontrahenta', detail: 'Nie udało się dodać kontrahenta!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Dodawanie kontrahenta', detail: 'Dodano kontrahenta!'});
        this.conReg.reset();
        this.dataService.setContractorAddDialogVisible(false);
        this.dataService.setReload(true);
      }
    );
  }// onRegister()

  onReset(): void {
    this.conReg.reset();
  }// onReset()
}
