import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { User } from '../../../classes/user';
import { Position } from '../../../classes/position';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  @Input() user: User;
  @Input() roles = [];
  @Input() positions: Position[] = [];
  date: Date;
  placeholderDate = new Date();
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
    this.userForm = this.fb.group({
      forename: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20)])],
      surname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20)])],
      username: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20)])],
      email: [''],
      password: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(20)])],
      address: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20)])],
      position_id: [''],
      role: [''],
      employmentStartDate: ['']
    });
  }// createForms()

  getValidErrors(value: FormControl): string {
    return value.errors.minlength ? 'Wymagana minimalna ilość znaków: ' + value.errors.minlength.requiredLength :
    value.errors.maxlength ? 'Wymagana maksymalna ilość znaków: ' + value.errors.maxlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż ' + value.errors.min.min + '!' :
    value.errors.max ? 'Liczba musi być mniejsza niż ' + value.errors.max.max + '!' :
    '';
  }// getValidErrors()

  onSubmit(): void {
    const body = new User(
      (this.userForm.get('forename').value !== '' ? this.userForm.get('forename').value : this.user.forename),
      (this.userForm.get('surname').value !== '' ? this.userForm.get('surname').value : this.user.surname),
      (this.userForm.get('email').value !== '' ? this.userForm.get('email').value : this.user.email),
      (this.userForm.get('username').value !== '' ? this.userForm.get('username').value : this.user.username),
      '1234',
      (this.userForm.get('address').value !== '' ? this.userForm.get('address').value : this.user.address),
      (this.userForm.get('position_id').value !== '' ? this.userForm.get('position_id').value : this.addPositions(this.user.positions)),
      (this.userForm.get('employmentStartDate').value ? this.dataService.convertDate(this.date) : this.user.employmentStartDate),
      (this.userForm.get('role').value !== '' ? this.userForm.get('role').value : this.user.role)
    );

    this.dataService.updateUser(this.user.id, body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja użytkownika', detail: 'Nie udało się edytować użytkownika!'}),
      () => {
        this.userForm.reset();
        this.messageService.add({severity: 'success', summary: 'Edycja użytkownika', detail: 'Pomyslnie edytowano użytkownika!'});
        this.dataService.setUserEditDialogVisible(false);
        this.dataService.setReload(true);
      },
    );
  }// onSubmit()

  addPositions(positions: any): number {
    let temp = 0;

    for (let i = 0; i < positions.length; i++) {
      temp += positions[i].id;
    }// for

    return temp;
  }// addPositions()
}
