import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataService } from '../../../services/data.service';
import { Salary } from '../../../classes/salary';
import { User } from '../../../classes/user';

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.css']
})
export class AddSalaryComponent implements OnInit {
  salForm: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.createForms();
    this.getUsers();
  }// ngOnInit()

  createForms(): void  {
    this.salForm = this.fb.group({
      users_id: ['', Validators.compose([Validators.required])],
      employment_arrangement: ['', Validators.compose([Validators.required, Validators.minLength(0)])],
      base_salary: ['', Validators.compose([Validators.required, Validators.min(0)])],
      seniority: ['', Validators.compose([Validators.required, Validators.min(0)])],
      salary_supplement: ['', Validators.compose([Validators.required, Validators.min(0)])],
      employment_status: ['', Validators.compose([Validators.required, Validators.minLength(0)])],
    });
  }// createForms()

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Pole jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilosc znaków: ' + value.errors.minlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż 0!' :
    '';
  }// getValidErrors()

  getUsers(): void {
    this.dataService.getUsersArray().subscribe(
      res => this.users = res,
      err => console.log(err),
      () => {}
    );
  }// getUsers()

  onAdd(): void {
    const body = this.salForm.value;

    this.dataService.postSalary(body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Dodawanie pensji', detail: 'Nie udało się dodać pensji!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Dodawanie pensji', detail: 'Dodano pensję!'});
        this.salForm.reset();
        this.dataService.setSalaryAddDialogVisible(false);
        this.dataService.setReload(true);
      }
    );
  }// onAdd()
}
