import { Injectable } from '@angular/core';
import { Instruction } from '../classes/instruction';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Vacation } from '../classes/vacation';
import { User} from '../classes/user';

@Injectable()
export class DataService {
  url = 'http://localhost:3000';
  uUsers = '/users';
  uInst = '/instructions';
  uVacation = '/vacations';

  instruction: Instruction;
  dialog: boolean;
  instDialog: boolean;

  constructor(private http: HttpClient) { }

  setInstruction(value: Instruction) {
    this.instruction = value;
  }// setInstruction()

  getInstruction(): Instruction {
    return this.instruction;
  }// getInstruction()

  getInstructionsArray(): Observable<Instruction[]> {
    return this.http.get<Instruction[]>(this.url + this.uInst);
  }// getInstructionsArray()

  getVacationsArray(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.url + this.uVacation);
  }

  getUsersArray(): Observable<User[]> {
    return this.http.get<User[]>(this.url + this.uUsers);
  }

  putIntoServer(id: number, body: any, type?: string) {
    if (type === 'instruction') {
      return this.http.put(this.url + this.uInst + '/' + id, body);
    } else
    if (type === 'user') {
      return this.http.put(this.url + this.uUsers + '/' + id, body);
    } else
    if (type === 'vacation') {
      return this.http.put(this.url + this.uVacation + '/' + id, body);
    } else {
      return this.http.put(this.url + this.uInst + '/' + id, body);
    }// if
  }// putIntoServer()

  postIntoServer(body: any, type?: string) {
    if (type === 'instruction') {
      return this.http.post(this.url + this.uInst, body);
    } else
    if (type === 'user') {
      return this.http.post(this.url + this.uUsers, body);
    } else
    if (type === 'vacation') {
      return this.http.post(this.url + this.uVacation, body);
    } else {
      return this.http.post(this.url + this.uInst, body);
    }// if
  }

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
}
