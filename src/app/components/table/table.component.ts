import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {AddTableComponent} from '../add-table/add-table.component';
import {TableItem} from '../../interface/table';
import {TableDataSource} from './table-datasource';
import {EXAMPLE_DATA} from '../../data/someData';

@Component({
      selector: 'app-table',
      templateUrl: './table.component.html',
      styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;
      @ViewChild(MatTable) table: MatTable<TableItem>;
      dataSource: TableDataSource;
      buttons = [{btn: 'Отчет'}, {btn: 'Протокол'}, {btn: 'Исследования'}];
      displayedColumns = [
            'orderNumber', 'name', 'company', 'analysis', 'dateRegistration',
            'dateFinish', 'laboratory', 'status', 'count'
      ];
      selectedRow;

      constructor(public dialog: MatDialog) {
      }

      ngOnInit(): void {
            this.dataSource = new TableDataSource();
      }

      ngAfterViewInit(): void {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.table.dataSource = this.dataSource;
      }

      openDialog(): any {
            const dialogRef = this.dialog.open(AddTableComponent);
            dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                        const someData = {
                              orderNumber: result.controls.orderNumber.value,
                              name: result.controls.name.value,
                              company: result.controls.company.value,
                              contractNumber: result.controls.contractNumber.value,
                              analysis: result.controls.analysis.value,
                              dateRegistration: result.controls.dateRegistration.value,
                              dateFinish: result.controls.dateFinish.value,
                              laboratory: result.controls.laboratory.value,
                              status: result.controls.status.value
                        };
                        EXAMPLE_DATA.push(someData);
                  }
            });
      }

      openUserDialog(row): any {
            this.selectedRow = row;
            const dialogRef = this.dialog.open(AddTableComponent, {
                  data: {
                        orderNumber: this.selectedRow.orderNumber,
                        name: this.selectedRow.name,
                        company: this.selectedRow.company,
                        contractNumber: this.selectedRow.contractNumber,
                        analysis: this.selectedRow.analysis,
                        dateRegistration: this.selectedRow.dateRegistration,
                        dateFinish: this.selectedRow.dateFinish,
                        laboratory: this.selectedRow.laboratory,
                        status: this.selectedRow.status
                  }
            });
            dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                        this.selectedRow.orderNumber = result.controls.orderNumber.value;
                        this.selectedRow.name = result.controls.name.value;
                        this.selectedRow.company = result.controls.company.value;
                        this.selectedRow.contractNumber = result.controls.contractNumber.value;
                        this.selectedRow.analysis = result.controls.analysis.value;
                        this.selectedRow.dateRegistration = result.controls.dateRegistration.value;
                        this.selectedRow.dateFinish = result.controls.dateFinish.value;
                        this.selectedRow.laboratory = result.controls.laboratory.value;
                        this.selectedRow.status = result.controls.status.value;
                  }
            });
      }
}
