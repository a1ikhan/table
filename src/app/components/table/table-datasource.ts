import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {TableItem} from '../../interface/table';

export class TableDataSource extends DataSource<TableItem> {
      data: TableItem[] = [];
      paginator: MatPaginator;
      sort: MatSort;

      constructor() {
            super();
      }

      connect(): Observable<TableItem[]> {
            const dataMutations = [
                  observableOf(this.data),
                  this.paginator.page,
                  this.sort.sortChange
            ];

            return merge(...dataMutations).pipe(map(() => {
                  return this.getPagedData(this.getSortedData([...this.data]));
            }));
      }

      disconnect(): void {
      }

      private getPagedData(data: TableItem[]): any {
            const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            return data.splice(startIndex, this.paginator.pageSize);
      }

      private getSortedData(data: TableItem[]): any {
            if (!this.sort.active || this.sort.direction === '') {
                  return data;
            }

            return data.sort((a, b) => {
                  const isAsc = this.sort.direction === 'asc';
                  switch (this.sort.active) {
                        default:
                              return 0;
                  }
            });
      }
}

function compare(a: string | number, b: string | number, isAsc: boolean): any {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
