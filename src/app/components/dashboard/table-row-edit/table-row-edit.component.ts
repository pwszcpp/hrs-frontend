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
  date: Date;
  date2: Date;
  minDate = new Date();
  pl: any;

  constructor(
    private fb: FormBuilder,
    public dataService: DataService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.createForms();
    this.pl = this.dataService.setPolishCalendar();
  }// ngOnInit()

  createForms(): void {
    this.dialForm = this.fb.group({
      theme: [''],
      company: [''],
      location: [''],
      startDate: [''],
      endDate: [''],
      cost: ['', Validators.min(0)],
      consent: [''],
      cancelled: [''],
      no_of_seats: ['']
    });
  }// createForms()

  getValidErrors(value: FormControl): any {
    return value.errors.min ? 'Liczba musi być większa niż 0!' :
    '';
  }// getValidErrors()

  onSubmit(): void {
    const body = new Instruction(
      (this.dialForm.get('theme').value !== '' ? this.dialForm.get('theme').value : this.inst.theme),
      (this.dialForm.get('company').value !== '' ? this.dialForm.get('company').value : this.inst.company),
      (this.dialForm.get('location').value !== '' ? this.dialForm.get('location').value : this.inst.location),
      (this.dialForm.get('startDate').value ? this.dataService.convertDate(this.date) : this.inst.startDate),
      (this.dialForm.get('endDate').value ? this.dataService.convertDate(this.date2) : this.inst.endDate),
      (this.dialForm.get('cost').value !== '' ? this.dialForm.get('cost').value : this.inst.cost),
      (this.dialForm.get('consent').value !== '' ? this.dialForm.get('consent').value : this.inst.consent),
      (this.dialForm.get('cancelled').value !== '' ? this.dialForm.get('cancelled').value : this.inst.cancelled),
      (this.dialForm.get('no_of_seats').value !== '' ? this.dialForm.get('no_of_seats').value : this.inst.no_of_seats),
    );

    this.dataService.updateInstruction(this.inst.id, body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja szkolenia', detail: 'Nie udało się edytować szkolenia!'}),
      () => {
        this.dialForm.reset();
        this.messageService.add({severity: 'success', summary: 'Edycja szkolenia', detail: 'Pomyslnie edytowano szkolenie!'});
        this.dataService.setDialogVisible(false);
        this.dataService.setReload(true);
      },
    );
  }// onSubmit()
}
