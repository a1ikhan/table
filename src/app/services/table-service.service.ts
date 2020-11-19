import {Injectable} from '@angular/core';
import {EXAMPLE_DATA} from '../data/someData';
import {TableItem} from '../interface/table';

@Injectable({
      providedIn: 'root'
})
export class TableServiceService {
      date = EXAMPLE_DATA;

      constructor() {
      }

      get(): TableItem[] {
            return this.date;
      }

      add(v): any {
            this.date.push(v);
      }
}
