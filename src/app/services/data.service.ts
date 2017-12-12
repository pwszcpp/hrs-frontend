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
  admin: number[] = [1];

  instruction: Instruction;
  dialog: boolean;
  instDialog: boolean;

  constructor(private http: HttpClient) { }

  isAdmin(userID: number): boolean {
    return this.admin.includes(userID);
  }// isAdmin()

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

  generateUser(): void {
    const firstNames = ['Jan', 'Andrzej', 'Piotr', 'Krzysztof', 'Stanisław', 'Tomasz', 'Paweł', 'Józef', 'Marcin', 'Marek', 'Michał',
    'Grzegorz', 'Jerzy', 'Tadeusz', 'Adam', 'Łukasz', 'Zbigniew', 'Ryszard', 'Dariusz', 'Henryk', 'Mariusz', 'Kazimierz', 'Wojciech',
    'Robert', 'Mateusz', 'Marian', 'Rafał', 'Jacek', 'Janusz', 'Mirosław', 'Maciej', 'Sławomir', 'Jarosław', 'Kamil', 'Wiesław',
    'Roman', 'Władysław', 'Jakub', 'Artur', 'Zdzisław', 'Edward', 'Mieczysław', 'Damian', 'Dawid', 'Przemysław', 'Sebastian',
    'Czesław', 'Leszek', 'Daniel', 'Waldemar', 'Anna', 'Maria', 'Katarzyna', 'Małgorzata', 'Agnieszka', 'Krystyna', 'Barbara', 'Ewa',
    'Elżbieta', 'Zofia', 'Janina', 'Teresa', 'Joanna', 'Magdalena', 'Monika', 'Jadwiga', 'Danuta', 'Irena', 'Halina', 'Helena',
    'Beata', 'Aleksandra', 'Marta', 'Dorota', 'Marianna', 'Grażyna', 'Jolanta', 'Stanisława', 'Iwona', 'Karolina', 'Bożena',
    'Urszula', 'Justyna', 'Renata', 'Alicja', 'Paulina', 'Sylwia', 'Natalia', 'Wanda', 'Agata', 'Aneta', 'Izabela', 'Ewelina',
    'Marzena', 'Wiesława', 'Genowefa', 'Patrycja', 'Kazimiera', 'Edyta', 'Stefania'];

    const lastNames = ['Nowak', 'Kowalski', 'Wiśniewski', 'Dąbrowski', 'Lewandowski', 'Wójcik', 'Kamiński', 'Kowalczyk', 'Zieliński',
    'Szymański', 'Woźniak', 'Kozłowski', 'Jankowski', 'Wojciechowski', 'Kwiatkowski', 'Kaczmarek', 'Mazur', 'Krawczyk', 'Piotrowski',
    'Grabowski', 'Nowakowski', 'Pawłowski', 'Michalski', 'Nowicki', 'Adamczyk', 'Dudek', 'Zając', 'Wieczorek', 'Jabłoński', 'Król',
    'Majewski', 'Olszewski', 'Jaworski', 'Wróbel', 'Malinowski', 'Pawlak', 'Witkowski', 'Walczak', 'Stępień', 'Górski', 'Rutkowski',
    'Michalak', 'Sikora', 'Ostrowski', 'Baran', 'Duda', 'Szewczyk', 'Tomaszewski', 'Pietrzak', 'Marciniak', 'Wróblewski', 'Zalewski',
    'Jakubowski', 'Jasiński', 'Zawadzki', 'Sadowski', 'Bąk', 'Chmielewski', 'Włodarczyk', 'Borkowski', 'Czarnecki', 'Sawicki',
    'Sokołowski', 'Urbański', 'Kubiak', 'Maciejewski', 'Szczepański', 'Kucharski', 'Wilk', 'Kalinowski', 'Lis', 'Mazurek',
    'Wysocki', 'Adamski', 'Kaźmierczak', 'Wasilewski', 'Sobczak', 'Czerwiński', 'Andrzejewski', 'Cieślak', 'Głowacki',
    'Zakrzewski', 'Kołodziej', 'Sikorski', 'Krajewski', 'Gajewski', 'Szymczak', 'Szulc', 'Baranowski', 'Laskowski',
    'Brzeziński', 'Makowski', 'Ziółkowski', 'Przybylski'];

    const name = Math.floor(Math.random() * (firstNames.length - 0 + 1) + 1);
    const surname = Math.floor(Math.random() * (lastNames.length - 0 + 1) + 1);
    const salary = Math.floor(Math.random() * (25000 - 1500 + 1) + 1500);
    let userAmount = 0;

    this.getUsersArray().subscribe(
      res => userAmount = res.length + 1,
      err => console.log(err),
      () => {
        const body = new User(userAmount, firstNames[name], lastNames[surname], 'email@email', 'login', 'password', salary);
        this.postIntoServer(body, 'user').subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      }
    );
  }// generateUser()
}
