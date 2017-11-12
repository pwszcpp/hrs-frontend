import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Rejestracja użytkownika';
  addedUser: boolean;
  usersNumber: number;
  url = 'http://localhost:3000';
  regForm: FormGroup;

  constructor(private http: Http, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForms();
    this.getUsers();
  }

  createForms() {
    this.regForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      login: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  getValidErrors(value: FormControl) {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' : value.errors.email ?
    'Niepoprawna forma e-mail!' : value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength : '';
  }

  onReset(): void {
    this.regForm.reset();
    this.addedUser = null;
  }// onReset()

  onSubmit(): void {
    this.addedUser = true;
    this.doPostUser();
  }// onSubmit()

  getUsers(): any {
    this.http.get(this.url + '/users').subscribe(
      res => this.usersNumber = res.json().length,
      err => console.log(err)
    );
  }// getUsers()

  doPostUser(): void {
    this.regForm['id'] = this.usersNumber + 1;
    this.http.post(this.url + '/users', this.regForm.value).subscribe(
      res => console.log(res.json()),
      err => console.log(err)
    );
  }
}
