import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TableComponent} from '../table/table.component';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';

const moment = _moment;
export const MY_FORMATS = {
      parse: {
            dateInput: 'LL',
      },
      display: {
            dateInput: 'LL',
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'MMMM YYYY',
      },
};

@Component({
      selector: 'app-add-table',
      templateUrl: './add-table.component.html',
      styleUrls: ['./add-table.component.scss'],
      providers: [
            {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
            {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ]
})
export class AddTableComponent implements OnInit {
      plus = 1;
      date = new FormControl(moment());
      quantity = 1;
      form = this.fb.group({
            orderNumber: [''],
            name: [''],
            company: [''],
            contractNumber: [''],
            analysis: [''],
            dateRegistration: [''],
            dateFinish: [''],
            laboratory: [''],
            status: ['']
      });
      selected = new FormControl(1);
      selectAfterAdding = true;
      menus = [{item: 'item 1'}, {item: 'item 2'}, {item: 'item 3'}];
      tabs = [{form: this.form}];

      constructor(private fb: FormBuilder,
                  public dialogRef: MatDialogRef<TableComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: any) {
            if (data) {
                  this.form.setValue({
                        orderNumber: this.data.orderNumber,
                        name: this.data.name,
                        company: this.data.company,
                        contractNumber: this.data.contractNumber,
                        analysis: this.data.analysis,
                        dateRegistration: this.data.dateRegistration,
                        dateFinish: this.data.dateFinish,
                        laboratory: this.data.laboratory,
                        status: this.data.status
                  });
            }
      }

      ngOnInit(): void {
      }

      add(): void {
            this.quantity++;
      }

      remove(): void {
            this.quantity--;
            if (this.quantity <= 1) {
                  this.quantity = 1;
            }
      }

      onSubmit(): void {
            this.dialogRef.close(this.form);
      }

      addTab(selectAfterAdding): void {
            this.tabs.push({form: this.form});
            if (selectAfterAdding) {
                  this.selected.setValue(this.tabs.length);
            }
      }

      removeTab(index: number): void {
            this.tabs.splice(index, 1);
      }
}
