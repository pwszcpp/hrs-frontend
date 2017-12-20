import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  title = 'Rejestracja użytkownika';
  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private dataService: DataService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }// if

    this.createForms();
  }

  createForms() {
    this.regForm = this.fb.group({
      // name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      // surname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])],
      taxOffice: ['', Validators.compose([Validators.required])],
      employmentStartDate: ['', Validators.compose([Validators.required])]
    });
  }

  getValidErrors(value: FormControl) {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' : value.errors.email ?
    'Niepoprawna forma e-mail!' : value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength : '';
  }

  onReset(): void {
    this.regForm.reset();
  }// onReset()

  onSubmit(): void {
    this.dataService.postUser(this.regForm.value).subscribe(
      () => {},
      err => {
        this.messageService.add({severity: 'danger', summary: 'Rejestracja', detail: 'Wystąpił błąd podczas rejestracji uzytkownika!'});
      },
      () => {
        this.regForm.reset();
        this.messageService.add({severity: 'success', summary: 'Rejestracja', detail: 'Zarejestrowano użytkownika!'});
      }
    );
    // this.messageService.add({severity: 'success', summary: 'Rejestracja', detail: 'Zarejestrowano użytkownika!'});
  }// onSubmit()
}
