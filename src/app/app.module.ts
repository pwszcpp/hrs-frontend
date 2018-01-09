import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/components/common/messageservice';
import {
  DataTableModule,
  SharedModule,
  ButtonModule,
  GrowlModule,
  DialogModule,
  TooltipModule,
  CalendarModule,
  ContextMenuModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { InstRegisterComponent } from './components/dashboard/inst-register/inst-register.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { DataService } from './services/data.service';
import { TableRowEditComponent } from './components/dashboard/table-row-edit/table-row-edit.component';
import { VacationComponent } from './components/vacation/vacation.component';
import { LoginRouteGuard } from './login-route-guard';
import { LoginService } from './services/login.service';
import { SalaryComponent } from './components/salary/salary.component';
import { ContractorComponent } from './components/contractor/contractor.component';
import { AddContractorComponent } from './components/contractor/add-contractor/add-contractor.component';
import { EditConctractorComponent } from './components/contractor/edit-conctractor/edit-conctractor.component';
import { AddSalaryComponent } from './components/salary/add-salary/add-salary.component';
import { PositionComponent } from './components/position/position.component';
import { UserComponent } from './components/user/user.component';
import { AddPositionComponent } from './components/position/add-position/add-position.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { EditPositionComponent } from './components/position/edit-position/edit-position.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'inst-register', component: InstRegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'vacations', component: VacationComponent },
  { path: 'salaries', component: SalaryComponent },
  { path: 'contractors', component: ContractorComponent },
  { path: 'users', component: UserComponent },
  { path: 'positions', component: PositionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MenuComponent,
    MainComponent,
    InstRegisterComponent,
    InvoiceComponent,
    TableRowEditComponent,
    VacationComponent,
    SalaryComponent,
    ContractorComponent,
    AddContractorComponent,
    EditConctractorComponent,
    AddSalaryComponent,
    PositionComponent,
    UserComponent,
    AddPositionComponent,
    EditUserComponent,
    EditPositionComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    GrowlModule,
    DialogModule,
    TooltipModule,
    CalendarModule,
    ContextMenuModule
  ],
  providers: [DataService, CookieService, LoginRouteGuard, LoginService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
