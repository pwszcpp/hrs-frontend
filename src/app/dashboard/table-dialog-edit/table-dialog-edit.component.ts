import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { InstructionDatabase } from '../dashboard.component';

@Component({
  selector: 'app-table-dialog-edit',
  templateUrl: './table-dialog-edit.component.html',
  styleUrls: ['./table-dialog-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableDialogEditComponent implements OnInit {
  dialForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TableDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForms();
  }

  createForms(): void {
    this.dialForm = this.fb.group({
      topic: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      company: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      location: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      dateFrom: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      dateTo: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cost: ['', Validators.compose([Validators.required, Validators.min(0)])],
      manager: ['', Validators.required],
    });
  }

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż 0!' :
    '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(id, database: InstructionDatabase): void {
    // console.log(this.data);
    // console.log(this.dialForm.value);
    database.dataChange.value[id - 1] = this.dialForm.value;
    database.dataChange.value[id - 1].id = id;
  }
}
