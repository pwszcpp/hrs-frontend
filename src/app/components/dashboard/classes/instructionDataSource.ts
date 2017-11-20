import { DataSource } from '@angular/cdk/collections';
import { InstructionDatabase } from './InstructionDatabase';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Instruction } from '../../../classes/instruction';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class InstructionDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: InstructionDatabase, private _paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Instruction[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
