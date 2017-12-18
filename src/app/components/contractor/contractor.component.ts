import { MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DataService } from '../../services/data.service';
import { MessageService } from 'primeng/components/common/messageservice';

import { Contractor } from '../../classes/contractor';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {
  title = 'Kontrahenci';
  contractors: Contractor[];
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
      {label: 'Dodaj', icon: 'fa-plus', command: (event) => this.dataService.setContractorDialogVisible(true)},
      {label: 'Usun', icon: 'fa-close', command: (event) => this.onDelete(this.selectedContractor.id)},
      {label: 'Odswiez', icon: 'fa-refresh', command: (event) => this.getContractors()}
    ];
  }

  getContractors(): void {
    this.dataService.getContractorArray().subscribe(
      res => this.contractors = res,
      err => console.log(err)
    );
  }// getContractors()

  onDelete(id: number): void {
    this.dataService.deleteContractor(id).subscribe(
      () => {},
      err => this.messageService.add({severity: 'error', summary: 'Usuwanie kontrahenta', detail: 'Nie udało się usunąć kontrahenta!'}),
      () => {
        this.messageService.add({severity: 'success', summary: 'Usuwanie kontrahenta', detail: 'Usunięto kontrahenta!'});
        this.getContractors();
      }
    );
  }// onDelete()
}
