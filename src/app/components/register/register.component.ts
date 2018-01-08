import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Position } from '../../classes/position';
import { User } from '../../classes/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  title = 'Rejestracja użytkownika';
  regForm: FormGroup;
  date: Date;
  minDate = new Date();
  pl: any;
  positions: Position[] = [];
  roles =  [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dataService: DataService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.loginService.isLoggedIn() || !this.dataService.isAdmin()) {
      this.router.navigate(['/login']);
    }// if

    this.createForms();
    this.pl = this.dataService.setPolishCalendar();
    this.getPositions();
    this.getRoles();
  }

  createForms() {
    this.regForm = this.fb.group({
      forename: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      position_id: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
      employmentStartDate: ['', Validators.required]
    });
  }

  getValidErrors(value: FormControl) {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.email ? 'Niepoprawna forma e-mail!' :
    value.errors.minlength ? 'Wymagana minimalna ilość znaków: ' + value.errors.minlength.requiredLength :
    value.errors.maxlength ? 'Wymagana maksymalna ilość znaków: ' + value.errors.maxlength.requiredLength :
    '';
  }

  onReset(): void {
    this.regForm.reset();
  }// onReset()

  onSubmit(): void {
    const body = new User(
      this.regForm.get(['forename']).value,
      this.regForm.get(['surname']).value,
      this.regForm.get(['email']).value,
      this.regForm.get(['username']).value,
      this.regForm.get(['password']).value,
      this.regForm.get(['address']).value,
      this.regForm.get(['position_id']).value,
      this.dataService.convertDate(this.regForm.get(['employmentStartDate']).value),
      this.regForm.get(['role']).value
    );

    this.dataService.postUser(body).subscribe(
      () => {},
      err => {
        this.messageService.add({severity: 'warn', summary: 'Rejestracja', detail: 'Wystąpił błąd podczas rejestracji uzytkownika!'});
      },
      () => {
        this.regForm.reset();
        this.messageService.add({severity: 'success', summary: 'Rejestracja', detail: 'Zarejestrowano użytkownika!'});
      }
    );
  }// onSubmit()

  getPositions(): void {
    this.dataService.getPositionsArray().subscribe(
      res => this.positions = res,
      err => console.log(err)
    );
  }// getPositions()

  getRoles(): void {
    this.dataService.getRolesArray().subscribe(
      res => this.roles = res,
      err => console.log(err)
    );
  }// getRoles()
}
