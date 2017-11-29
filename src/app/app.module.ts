import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatTableModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { DataTableModule, SharedModule, ButtonModule, GrowlModule, DialogModule, TooltipModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { InstRegisterComponent } from './components/inst-register/inst-register.component';
import { TableDialogEditComponent } from './components/dashboard/table-dialog-edit/table-dialog-edit.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { DataService } from './data.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inst-register', component: InstRegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'invoice', component: InvoiceComponent }
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
    TableDialogEditComponent,
    InvoiceComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    GrowlModule,
    DialogModule,
    TooltipModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [TableDialogEditComponent]
})
export class AppModule { }
