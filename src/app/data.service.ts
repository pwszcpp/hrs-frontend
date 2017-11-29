import { Injectable } from '@angular/core';
import { Instruction } from './classes/instruction';

@Injectable()
export class DataService {
  instruction: Instruction;

  constructor() { }

  setInstruction(value: Instruction) {
    this.instruction = value;
  }

  getInstruction(): Instruction {
    return this.instruction;
  }
}
