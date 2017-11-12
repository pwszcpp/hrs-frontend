import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inst-register',
  templateUrl: './inst-register.component.html',
  styleUrls: ['./inst-register.component.css']
})

export class InstRegisterComponent implements OnInit {
  instNumber: number;
  url = 'http://localhost:3000';
  addedInst: boolean;
  instReg: FormGroup;

  constructor(private http: Http, private fb: FormBuilder) { }

  ngOnInit() {
    this.getInstructions();
    this.createForms();
  }// ngOnInit()

  createForms() {
    this.instReg = this.fb.group({
      topic: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      company: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      location: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      dateFrom: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      dateTo: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cost: ['', Validators.compose([Validators.required, Validators.min(0)])],
      manager: ['', Validators.required],
    });
  }

  getValidErrors(value: FormControl) {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż 0!' :
    '';
  }

  onReset(): void {
    this.instReg.reset();
    this.addedInst = null;
  }// onReset()

  onRegister(): void {
    this.addedInst = true;
    this.doPostInstruction();
  }// onRegister

  doPostInstruction(): void {
    this.instReg['id'] = this.instNumber + 1;
    this.http.post(this.url + '/instructions', this.instReg.value).subscribe(
      res => console.log(res.json()),
      err => console.log(err)
    );
  }// doPostInstruction()

  getInstructions(): any {
    this.http.get(this.url + '/instructions').subscribe(
      res => this.instNumber = res.json().length,
      err => console.log(err)
    );
  }// getInstructions()
}
