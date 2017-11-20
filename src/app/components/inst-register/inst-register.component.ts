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

  ngOnInit(): void {
    this.createForms();
  }// ngOnInit()

  createForms(): void  {
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

  getValidErrors(value: FormControl): string {
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
    this.getInstructions();
  }// onRegister

  doPostInstruction(): void {
    const body = this.instReg.value;

    body['id'] = this.instNumber + 1;
    body['assign'] = [];

    this.http.post(this.url + '/instructions', body).subscribe(
      res => console.log(res.json()),
      err => console.log(err),
      () => this.instReg.reset()
    );
  }// doPostInstruction()

  getInstructions(): any {
    this.http.get(this.url + '/instructions').subscribe(
      res => this.instNumber = res.json().length,
      err => console.log(err),
      () => this.doPostInstruction()
    );
  }// getInstructions()
}
