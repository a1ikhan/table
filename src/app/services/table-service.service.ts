import {Injectable} from '@angular/core';
import {EXAMPLE_DATA, PROBE_DATA} from '../data/someData';
import {TableItem} from '../interface/table';
import {Observable, of} from 'rxjs';

@Injectable({
      providedIn: 'root'
})
export class TableServiceService {
      data = EXAMPLE_DATA;
      dateProbe = PROBE_DATA;

      constructor() {
      }

      get(): Observable<TableItem[]> {
            return of(this.data);
      }

      add(v): void {
            this.data.push(v);
      }

      addProbe(v): void {
            this.dateProbe.push(v);
      }
}
