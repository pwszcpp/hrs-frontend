import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Contractor } from '../../../classes/contractor';

@Component({
  selector: 'app-edit-conctractor',
  templateUrl: './edit-conctractor.component.html',
  styleUrls: ['./edit-conctractor.component.css']
})
export class EditConctractorComponent implements OnInit {
  editForm: FormGroup;
  @Input() contractor: Contractor;

  constructor(
    public dataService: DataService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForms();
  }

  createForms(): void  {
    this.editForm = this.fb.group({
      name: ['', Validators.maxLength(20)],
      address: ['', Validators.maxLength(20)],
      nip_number: ['', Validators.compose([Validators.min(999999999), Validators.max(10000000000)])],
      regon_number: ['', Validators.compose([Validators.min(99999999), Validators.max(1000000000)])],
      bank_account_number: ['', Validators.compose([Validators.min(0), Validators.max(10000000000)])],
        // Validators.min(9999999999999999999999999), Validators.max(100000000000000000000000000)])],
      payment_form: ['', Validators.maxLength(20)],
      active_taxpayer_VAT_tax: ['']
    });
  }// createForms()

  getValidErrors(value: FormControl): string {
    return value.errors.minlength ? 'Wymagana minimalna ilość znaków: ' + value.errors.minlength.requiredLength :
    value.errors.maxlength ? 'Wymagana maksymalna ilość znaków: ' + value.errors.maxlength.requiredLength :
    value.errors.max ? 'Podany numer jest niewłaściwy!' :
    value.errors.min ? 'Podany numer jest niewłaściwy!' :
    '';
  }// getValidErrors()

  onSubmit(): void {
    const body = new Contractor(
      (this.editForm.get('name').value !== '' ? this.editForm.get('name').value : this.contractor.name),
      (this.editForm.get('address').value !== '' ? this.editForm.get('address').value : this.contractor.address),
      (this.editForm.get('nip_number').value !== '' ? this.editForm.get('nip_number').value : this.contractor.nip_number),
      (this.editForm.get('regon_number').value !== '' ? this.editForm.get('regon_number').value : this.contractor.regon_number),
      (this.editForm.get('bank_account_number').value !== '' ? this.editForm.get('bank_account_number').value :
      this.contractor.bank_account_number),
      (this.editForm.get('payment_form').value !== '' ? this.editForm.get('payment_form').value : this.contractor.payment_form),
      (this.editForm.get('active_taxpayer_VAT_tax').value !== '' ? this.editForm.get('active_taxpayer_VAT_tax').value :
      this.contractor.active_taxpayer_VAT_tax),
    );

    this.dataService.updateContractor(this.contractor.id, body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja kontrahenta', detail: 'Nie udało się edytować kontrahenta!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Edycja kontrahenta', detail: 'Edytowano kontrahenta!'});
        this.dataService.setContractorEditDialogVisible(false);
        this.editForm.reset();
        this.dataService.setReload(true);
      }
    );
  }// onSubmit()

}
