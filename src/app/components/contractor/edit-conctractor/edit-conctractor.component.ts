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
      name: [''],
      address: [''],
      nip_number: [''],
      regon_number: [''],
      bank_account_number: [''],
      payment_form: [''],
      active_taxpayer_VAT_tax: ['']
    });
  }// createForms()

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength :
    value.errors.max ? 'Liczba musi być mniejsza niż 10000000000!' :
    value.errors.min ? 'Liczba musi być większa niż 0!' :
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
