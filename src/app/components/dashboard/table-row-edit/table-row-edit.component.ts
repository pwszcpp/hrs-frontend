import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Instruction } from '../../../classes/instruction';

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
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.createForms();
  }// ngOnInit()

  createForms(): void {
    this.dialForm = this.fb.group({
      topic: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      company: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      location: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      cost: ['', Validators.compose([Validators.required, Validators.min(0)])],
      manager: ['', Validators.required],
    });
  }// createForms()

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż 0!' :
    '';
  }// getValidErrors()

  onSubmit(): void {
    const temp = this.inst.assign;
    const tempId = this.inst.id;

    this.inst = this.dialForm.value;
    this.inst.id = tempId;
    this.inst.assign = temp;
    this.doUpdateInst(tempId, this.inst);
  }// onSubmit()

  doUpdateInst(id: number, body: any): void {
    this.dataService.putIntoServer(id, body).subscribe(
      () => {},
      err => console.log(err),
      () => {
        this.dialForm.reset();
        this.dataService.setDialogVisible(false);
      }
    );
  }// doUpdateInst()
}
