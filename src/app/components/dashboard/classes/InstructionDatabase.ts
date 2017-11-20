import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Instruction } from '../../../classes/instruction';

export class InstructionDatabase {
  dataChange: BehaviorSubject<Instruction[]> = new BehaviorSubject<Instruction[]>([]);
  get data(): Instruction[] { return this.dataChange.value; }

  constructor() {
  }
}
