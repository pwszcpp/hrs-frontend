import { MenuItem } from 'primeng/primeng';
import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DataService } from '../../services/data.service';
import { MessageService } from 'primeng/components/common/messageservice';

import { Contractor } from '../../classes/contractor';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit, DoCheck {
  title = 'Kontrahenci';
  contractors: Contractor[] = [];
  items: MenuItem[];
  selectedContractor: Contractor;

  constructor(
    private loginService: LoginService,
    public dataService: DataService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.getContractors();

    this.items = [
      {label: 'Edytuj', icon: 'fa-pencil', command: (event) => this.dataService.setContractorEditDialogVisible(true)},
      {label: 'Usun', icon: 'fa-close', command: (event) => this.onDelete()}
    ];
  }

  ngDoCheck() {
    if (this.dataService.getReload()) {
      this.getContractors();
      this.dataService.setReload(false);
    }// if
  }// ()

  getContractors(): void {
    this.dataService.getContractorArray().subscribe(
      res => this.contractors = res,
      err => console.log(err)
    );
  }// getContractors()

  onDelete(): void {
    this.dataService.deleteContractor(this.selectedContractor.id).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Usuwanie kontrahenta', detail: 'Nie udało się usunąć kontrahenta!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Usuwanie kontrahenta', detail: 'Usunięto kontrahenta!'});
        this.getContractors();
      }
    );
  }// onDelete()
}
