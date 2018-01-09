import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Position } from '../../../classes/position';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {
  posForm: FormGroup;
  @Input() position: Position;

  constructor(
    private fb: FormBuilder,
    public dataService: DataService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.createForms();
  }

  createForms(): void {
    this.posForm = this.fb.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20)])],
      min_salary: ['', Validators.compose([Validators.min(0), Validators.max(10000)])],
      max_salary: ['', Validators.compose([Validators.min(0), Validators.max(30000)])],
      max_percent_salary_supplement: ['', Validators.compose([Validators.min(0), Validators.max(9.9)])],
    });
  }// createForms()

  onSubmit(): void {
    const body = new Position(
      (this.posForm.get('name').value !== '' ? this.posForm.get('name').value : this.position.name),
      (this.posForm.get('min_salary').value !== '' ? this.posForm.get('min_salary').value : this.position.min_salary),
      (this.posForm.get('max_salary').value !== '' ? this.posForm.get('max_salary').value : this.position.max_salary),
      (this.posForm.get('max_percent_salary_supplement').value !== '' ? this.posForm.get('max_percent_salary_supplement').value :
      this.position.max_percent_salary_supplement)
    );

    this.dataService.updatePosition(this.position.id, body).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Edycja stanowiska', detail: 'Nie udało się edytować stanowiska!'}),
      () => {
        this.posForm.reset();
        this.messageService.add({severity: 'success', summary: 'Edycja stanowiska', detail: 'Edytowano stanowisko!'});
        this.dataService.setPositionEditDialogVisible(false);
        this.dataService.setReload(true);
      },
    );
  }// onSubmit()
}
