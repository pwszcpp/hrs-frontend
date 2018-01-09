import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataService } from '../../../services/data.service';
import { Position } from '../../../classes/position';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.createForms();
  }

  createForms(): void  {
    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      min_salary: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(10000)])],
      max_salary: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(20000)])],
      max_percent_salary_supplement: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(9.9)])],
    });
  }

  onAdd(): void {
    const body = new Position(
      this.addForm.get('name').value,
      this.addForm.get('min_salary').value,
      this.addForm.get('max_salary').value,
      this.addForm.get('max_percent_salary_supplement').value,
    );

    this.dataService.postPosition(body).subscribe(
      () => {},
      err => {
        this.messageService.add({severity: 'error', summary: 'Dodawanie stanowiska', detail: 'Nie udało się dodać stanowiska!'});
      },
      () => {
        this.messageService.add({severity: 'success', summary: 'Dodawanie stanowiska', detail: 'Dodano stanowisko!'});
        this.dataService.setPositionAddDialogVisible(false);
        this.dataService.setReload(true);
      }
    );
  }// onAdd()
}
