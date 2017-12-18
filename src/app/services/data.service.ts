import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { MessageService } from 'primeng/components/common/messageservice';

import { Instruction } from '../classes/instruction';
import { Vacation } from '../classes/vacation';
import { User} from '../classes/user';
import { Salary } from '../classes/salary';
import { Contractor } from '../classes/contractor';

@Injectable()
export class DataService {
  url = 'http://localhost:8081';
  uUsers = '/users';
  uInst = '/trainings';
  uVacation = '/leave';
  uSalary = '/salary';
  uContractor = '/contractors';
  admin: number[] = [1];

  instruction: Instruction;
  dialog: boolean;
  instDialog: boolean;
  contractorDialog: boolean;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    public messageService: MessageService
  ) {}

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

  getContractorDialogVisible(): boolean {
    return this.contractorDialog;
  }// getDialogVisible()

  setContractorDialogVisible(value: boolean): void {
    this.contractorDialog = value;
  }// setDialogVisible()

  convertDate(date: Date): string {
    return date.toLocaleDateString().slice(6, 10) + '-' +
      date.toLocaleDateString().slice(3, 5) + '-' +  date.toLocaleDateString().slice(0, 2);
  }// convertDate()

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

  updateInstruction(id: number, body: Instruction): any {
    return this.http.put(this.url + this.uInst + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updateInstruction()

  updateSalary(id: number, body: Salary): any {
    return this.http.put(this.url + this.uSalary + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updateSalary()

  updateContractor(id: number, body: Salary): any {
    return this.http.put(this.url + this.uContractor + '/' + id, body, new RequestOptions({withCredentials: true}));
  }// updateSalary()

  deleteUser(id: number): any {
    return this.http.delete(this.url + this.uUsers + '/' + id, new RequestOptions({withCredentials: true}));
  }// deleteContractor()

  deleteVacation(id: number): any {
    return this.http.delete(this.url + this.uVacation + '/' + id, new RequestOptions({withCredentials: true}));
  }// deleteContractor()

  deleteSalary(id: number): any {
    return this.http.delete(this.url + this.uSalary + '/' + id, new RequestOptions({withCredentials: true}));
  }// deleteContractor()

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

  getSalaryArray(): Observable<Salary[]> {
    return this.httpClient.get<Salary[]>(this.url + this.uSalary, {withCredentials: true});
  }// getSalaryArray()

  getContractorArray(): Observable<Contractor[]> {
    return this.httpClient.get<Contractor[]>(this.url + this.uContractor, {withCredentials: true});
  }// getContractorArray()

  getUserID(): Observable<number> {
    return this.httpClient.get<number>(this.url + this.uUsers + '/getID', {withCredentials: true});
  }// getUserID()

  changeInstructionAssign(id: number, type: boolean): any {
    if (type) {
      return this.http.post(this.url + this.uInst + '/' + id + '/enroll', {}, new RequestOptions({withCredentials: true}));
    } else {
      return this.http.delete(this.url + this.uInst + '/' + id + '/enroll', new RequestOptions({withCredentials: true}));
    }// if
  }// postInstructionAssign()

  // -------------------------------------------- DEBUG --------------------------------------------

  consoleLog(value: any): void {
    console.log(value);
  }// consoleLog()
}
