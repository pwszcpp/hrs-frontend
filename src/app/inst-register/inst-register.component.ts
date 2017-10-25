import { Component, OnInit } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Instruction } from '../instruction';

@Component({
  selector: 'app-inst-register',
  templateUrl: './inst-register.component.html',
  styleUrls: ['./inst-register.component.css']
})

export class InstRegisterComponent implements OnInit {
  numberOfInstructions = [];
  instruction = new Instruction();
  url = 'http://localhost:3000';
  addedInst: boolean;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getInstructions();
  }// ngOnInit()

  onReset(): void {
    this.instruction.topic = '';
    this.instruction.company = '';
    this.instruction.cost = 0;
    this.instruction.dateFrom = '';
    this.instruction.dateTo = '';
    this.instruction.id = 1;
    this.instruction.location = '';
    this.instruction.manager = true;
    this.addedInst = null;
  }// onReset()

  onRegister(): void {
    if (this.checkInstruction()) {
      this.addedInst = true;
      this.doPostInstruction();
    } else {
      this.addedInst = false;
    }// if
  }// onRegister

  doPostInstruction(): void {
    this.getInstructions();
    this.instruction.id = this.numberOfInstructions.length + 1;
    this.http.post(this.url + '/instructions', this.instruction).subscribe(
      res => console.log(res.json()),
      err => console.log(err)
    );
  }// doPostInstruction()

  getInstructions(): any {
    this.http.get(this.url + '/instructions').subscribe(
      res => this.numberOfInstructions = res.json(),
      err => console.log(err)
    );
  }// getInstructions()

  checkInstruction(): boolean {
    if (
      this.instruction.company === '' ||
      this.instruction.cost < 0 ||
      this.instruction.dateFrom === '' ||
      this.instruction.dateTo === '' ||
      this.instruction.location === '' ||
      this.instruction.manager === null ||
      this.instruction.topic === ''
    ) { return false; }
    return true;
  }// checkInstruction()
}
