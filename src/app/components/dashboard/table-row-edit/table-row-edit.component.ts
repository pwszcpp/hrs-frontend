import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Instruction } from '../../../classes/instruction';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-table-row-edit',
  templateUrl: './table-row-edit.component.html',
  styleUrls: ['./table-row-edit.component.css']
})
export class TableRowEditComponent implements OnInit {
  dialForm: FormGroup;
  @Input() inst: Instruction;

  constructor(
    private fb: FormBuilder,
    public dataService: DataService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.createForms();
  }// ngOnInit()

  createForms(): void {
    this.dialForm = this.fb.group({
      theme: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      company: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      location: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      cost: ['', Validators.compose([Validators.required, Validators.min(0)])],
      consent: ['', Validators.required],
    });
  }// createForms()

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż 0!' :
    '';
  }// getValidErrors()

  onSubmit(): void {
    const body = new Instruction(
      this.dialForm.get('theme').value,
      this.dialForm.get('company').value,
      this.dialForm.get('location').value,
      this.dialForm.get('startDate').value,
      this.dialForm.get('endDate').value,
      this.dialForm.get('cost').value,
      this.dialForm.get('consent').value,
      this.inst.cancelled,
      this.inst.no_of_seats,
      this.inst.id,
    );

    this.dataService.updateInstruction(this.inst.id, body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja szkolenia', detail: 'Nie udało się edytować szkolenia!'}),
      () => {
        this.dialForm.reset();
        this.messageService.add({severity: 'success', summary: 'Edycja szkolenia', detail: 'Pomyslnie edytowano szkolenie!'});
        this.dataService.setDialogVisible(false);
      },
    );
  }// onSubmit()
}
