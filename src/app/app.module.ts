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
  CalendarModule
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
import { VacationComponent } from './components/dashboard/vacation/vacation.component';
import { LoginRouteGuard } from './login-route-guard';
import { LoginService } from './services/login.service';
import { SalaryComponent } from './components/salary/salary.component';
import { ContractorComponent } from './components/contractor/contractor.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'inst-register', component: InstRegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'vacation', component: VacationComponent },
  { path: 'users', component: SalaryComponent }
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
    ContractorComponent
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
    CalendarModule
  ],
  providers: [DataService, CookieService, LoginRouteGuard, LoginService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
