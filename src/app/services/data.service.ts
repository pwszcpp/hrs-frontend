import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { MessageService } from 'primeng/components/common/messageservice';
import { LoginService } from './login.service';
import { FormControl } from '@angular/forms';

import { Instruction } from '../classes/instruction';
import { Vacation } from '../classes/vacation';
import { User} from '../classes/user';
import { Salary } from '../classes/salary';
import { Contractor } from '../classes/contractor';
import { Position } from '../classes/position';

@Injectable()
export class DataService {
  url = 'http://localhost:8081';
  uUsers = '/users';
  uInst = '/trainings';
  uVacation = '/leave';
  uSalary = '/salary';
  uContractor = '/contractors';
  uPositions = '/positions';
  reload: boolean;

  instruction: Instruction;
  dialog: boolean;
  instDialog: boolean;
  contractorAddDialog: boolean;
  contractorEditDialog: boolean;
  salaryAddDialog: boolean;
  userEditDialog: boolean;
  positionAddDialog: boolean;
  positionEditDialog: boolean;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    public messageService: MessageService,
    private loginService: LoginService
  ) {}

  setReload(value: boolean): void {
    this.reload = value;
  }// setReload()

  getReload(): boolean {
    return this.reload;
  }// setReload()

  setInstruction(value: Instruction) {
    this.instruction = value;
  }// setInstruction()

  getInstruction(): Instruction {
    return this.instruction;
  }// getInstruction()

  getDialogVisible(): boolean {
    return this.dialog;
  }// getDialogVisible()

  setDialogVisible(value: boolean): void {
    this.dialog = value;
  }// setDialogVisible()

  getInstDialogVisible(): boolean {
    return this.instDialog;
  }// getDialogVisible()

  setInstDialogVisible(value: boolean): void {
    this.instDialog = value;
  }// setDialogVisible()

  getContractorAddDialogVisible(): boolean {
    return this.contractorAddDialog;
  }// getContractorAddDialogVisible()

  setContractorAddDialogVisible(value: boolean): void {
    this.contractorAddDialog = value;
  }// setContractorAddDialogVisible()

  getContractorEditDialogVisible(): boolean {
    return this.contractorEditDialog;
  }// getContractorEditDialogVisible()

  setContractorEditDialogVisible(value: boolean): void {
    this.contractorEditDialog = value;
  }// setContractorEditDialogVisible()

  getSalaryAddDialogVisible(value: boolean): boolean {
    return this.salaryAddDialog;
  }// getSalaryAddDialogVisible()

  setSalaryAddDialogVisible(value: boolean): void {
    this.salaryAddDialog = value;
  }// setSalaryAddDialogVisible()

  getUserEditDialogVisible(value: boolean): boolean {
    return this.userEditDialog;
  }// getUserEditDialogVisible()

  setUserEditDialogVisible(value: boolean): void {
    this.userEditDialog = value;
  }// setUserEditDialogVisible()

  getPositionAddDialogVisible(value: boolean): boolean {
    return this.positionAddDialog;
  }// getPositionAddDialogVisible()

  setPositionAddDialogVisible(value: boolean): void {
    this.positionAddDialog = value;
  }// setPositionAddDialogVisible()

  getPositionEditDialogVisible(value: boolean): boolean {
    return this.positionEditDialog;
  }// getPositionEditDialogVisible()

  setPositionEditDialogVisible(value: boolean): void {
    this.positionEditDialog = value;
  }// setPositionEditDialogVisible()

  convertDate(date: Date): string {
    if (date.toLocaleDateString()[1] !== '.') {
      return date.toLocaleDateString().slice(6, 10) + '-' +
      date.toLocaleDateString().slice(3, 5) + '-' +  date.toLocaleDateString().slice(0, 2);
    } else {
      return date.toLocaleDateString().slice(5, 9) + '-' +
      date.toLocaleDateString().slice(2, 4) + '-' + '0' + date.toLocaleDateString().slice(0, 1);
    }
  }// convertDate()

  setPolishCalendar(): any {
    return {
      firstDayOfWeek: 1,
      dayNames: [ 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota' ],
      dayNamesShort: [ 'Nd', 'Pon', 'Wt', 'Sr', 'Czw', 'Pt', 'Sb' ],
      dayNamesMin: [ 'N', 'P', 'W', 'S', 'C', 'P', 'S' ],
      monthNames: [ 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
        'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień' ],
      monthNamesShort: [ 'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Czer', 'Lip', 'Sier', 'Wrz', 'Paz', 'Lis', 'Gru' ],
      today: 'Dzisiaj',
      clear: 'Wyczyść'
    };
  }// setPolishCalendar()

  getValidErrors(value: FormControl): string {
    return value.errors.required ? 'Wypełnienie pola jest wymagane!' :
    value.errors.minlength ? 'Wymagana minimalna ilość znaków: ' + value.errors.minlength.requiredLength :
    value.errors.maxlength ? 'Wymagana maksymalna ilość znaków: ' + value.errors.maxlength.requiredLength :
    value.errors.min ? 'Liczba musi być większa niż ' + value.errors.min.min + '!' :
    value.errors.max ? 'Liczba musi być mniejsza niż ' + value.errors.max.max + '!' :
    value.errors.email ? 'Niepoprawna forma e-mail!' :
    '';
  }

  // -------------------------------------------- INTEGRACJA Z BACKENDEM --------------------------------------------
  postUser(body: User): any {
    return this.http.post(this.url + this.uUsers, body, new RequestOptions({withCredentials: true}));
  }// postUser()

  postInstruction(body: Instruction): any {
    body['cancelled'] = 0;
    return this.http.post(this.url + this.uInst, body, new RequestOptions({withCredentials: true}));
  }// postInstruction()

  postVacation(body: Vacation): any {
    return this.http.post(this.url + this.uVacation, body, new RequestOptions({withCredentials: true}));
  }// postVacation

  postSalary(body: Salary): any {
    return this.http.post(this.url + this.uSalary, body, new RequestOptions({withCredentials: true}));
  }// postSalary()

  postContractor(body: Contractor): any {
    return this.http.post(this.url + this.uContractor, body, new RequestOptions({withCredentials: true}));
  }// postContractor()

  postPosition(body: Position): any {
    return this.http.post(this.url + this.uPositions, body, new RequestOptions({withCredentials: true}));
  }// postContractor()

  updateInstruction(id: number, body: Instruction): any {
    return this.http.put(this.url + this.uInst + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updateInstruction()

  updateSalary(id: number, body: Salary): any {
    return this.http.put(this.url + this.uSalary + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updateSalary()

  updateContractor(id: number, body: Contractor): any {
    return this.http.put(this.url + this.uContractor + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updateContractor()

  updateVacation(id: number, body: Vacation): any {
    return this.http.put(this.url + this.uVacation + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updateVacation()

  updateUser(id: number, body: User): any {
    return this.http.put(this.url + this.uUsers + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updateUser()

  updatePosition(id: number, body: Position): any {
    return this.http.put(this.url + this.uPositions + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updatePosition()

  deleteUser(id: number): any {
    return this.http.delete(this.url + this.uUsers + '/' + id, new RequestOptions({withCredentials: true}));
  }// deleteContractor()

  deletePosition(id: number): any {
    return this.http.delete(this.url + this.uPositions + '/' + id, new RequestOptions({withCredentials: true}));
  }// deletePosition()

  deleteVacation(id: number): any {
    return this.http.delete(this.url + this.uVacation + '/' + id, new RequestOptions({withCredentials: true}));
  }// deleteContractor()

  deleteSalary(id: number): any {
    return this.http.delete(this.url + this.uSalary + '/' + id, new RequestOptions({withCredentials: true}));
  }// deleteContractor()

  deleteInstruction(id: number): any {
    return this.http.delete(this.url + this.uInst + '/' + id, new RequestOptions({withCredentials: true}));
  }// deleteInstruction()

  deleteContractor(id: number): any {
    return this.http.delete(this.url + this.uContractor + '/' + id, new RequestOptions({withCredentials: true}));
  }// deleteContractor()

  getInstructionsArray(): Observable<Instruction[]> {
    return this.httpClient.get<Instruction[]>(this.url + this.uInst, {withCredentials: true});
  }// getInstructionsArray()

  getInstructionAssignArray(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.url + this.uUsers + '/getTrainings', {withCredentials: true});
  }

  getVacationsArray(): Observable<Vacation[]> {
    return this.httpClient.get<Vacation[]>(this.url + this.uVacation, {withCredentials: true});
  }// getVacationsArray()

  getLoggedUserVacationsArray(): Observable<Vacation[]> {
    return this.httpClient.get<Vacation[]>(this.url + this.uVacation + '/my', {withCredentials: true});
  }// getLoggedUserVacationsArray()

  getSalaryArray(): Observable<Salary[]> {
    return this.httpClient.get<Salary[]>(this.url + this.uSalary, {withCredentials: true});
  }// getSalaryArray()

  getContractorArray(): Observable<Contractor[]> {
    return this.httpClient.get<Contractor[]>(this.url + this.uContractor, {withCredentials: true});
  }// getContractorArray()

  changeInstructionAssign(id: number, type: boolean): any {
    if (type) {
      return this.http.post(this.url + this.uInst + '/' + id + '/enroll', {}, new RequestOptions({withCredentials: true}));
    } else {
      return this.http.delete(this.url + this.uInst + '/' + id + '/enroll', new RequestOptions({withCredentials: true}));
    }// if
  }// postInstructionAssign()

  getUsersArray(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + this.uUsers, {withCredentials: true});
  }// getUsersArray()

  getPositionsArray(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(this.url + this.uPositions, {withCredentials: true});
  }// getPositionsArray()

  getRolesArray(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url + this.uUsers + '/getRoles', {withCredentials: true});
  }// getRolesArray()

  getUser(): Observable<User> {
    return this.httpClient.get<User>(this.url + this.uUsers + '/getUser', {withCredentials: true});
  }// getUser()

  // -------------------------------------------- Admin Mode --------------------------------------------

  isAdmin(): boolean {
    return this.loginService.getRole() === '' ? false :
    this.loginService.getRole().length > 1 ? true :
    false;
  }// isAdmin()

  // -------------------------------------------- DEBUG --------------------------------------------

  consoleLog(value: any): void {
    console.log(value);
  }// consoleLog()
}
