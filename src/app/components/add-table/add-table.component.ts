import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TableComponent} from '../table/table.component';

@Component({
      selector: 'app-add-table',
      templateUrl: './add-table.component.html',
      styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {
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
