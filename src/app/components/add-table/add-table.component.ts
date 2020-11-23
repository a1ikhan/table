import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TableComponent} from '../table/table.component';
import {TableService} from '../../services/table.service';

@Component({
      selector: 'app-add-table',
      templateUrl: './add-table.component.html',
      styleUrls: ['./add-table.component.scss'],
      providers: []
})
export class AddTableComponent implements OnInit {
      quantity = 1;
      form = this.fb.group({
            orderNumber: [''],
            name: ['', Validators.required],
            bin: ['', Validators.required],
            company: [''],
            contractNumber: ['', Validators.required],
            analysis: [''],
            dateRegistration: [''],
            dateFinish: ['', Validators.required],
            laboratory: [''],
            status: [''],
            probeItem: this.fb.group({
                  fields: [''],
                  wellNumber: [''],
                  typeOfSampler: [''],
                  perforationInterval: [''],
                  secondPerforationInterval: [''],
                  depthOfSelection: [''],
                  temperature: [''],
                  pressure: [''],
                  dateOfSelection: [''],
                  dateOfReceipt: [''],
                  id: ['']
            })
      });
      selected = new FormControl(0);
      selectAfterAdding = true;
      menus = [{item: 'item 1'}, {item: 'item 2'}, {item: 'item 3'}];
      secondMenu = [{item: 'item 1'}, {item: 'item 2'}, {item: 'item 3'}];
      tabs = [{form: this.form}];
      tabsPerforationInterval = [
            {interval: this.form.get('probeItem').get('perforationInterval').get('secondPerforationInterval')}
      ];

      constructor(private fb: FormBuilder,
                  public dialogRef: MatDialogRef<TableComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: any,
                  private tableService: TableService) {
            if (data) {
                  // tslint:disable-next-line:forin
                  for (const key in data) {
                        this.form.get(key).patchValue(data[key]);
                  }
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
            this.tableService.addProbe(this.form.get('probeItem'));
      }

      addTab(selectAfterAdding): void {
            this.tabs.push({form: this.form});
            if (selectAfterAdding) {
                  this.selected.setValue(this.tabs.length - 1);
            }
      }

      removeTab(index: number): void {
            this.tabs.splice(index, 1);
            this.selected.setValue(this.tabs.length - 1);
      }

      addInterval(): void {
            this.tabsPerforationInterval.push(
                  {interval: this.form.get('probeItem').get('perforationInterval').get('secondPerforationInterval')}
            );
      }

      removeInterval(index: number): void {
            this.tabsPerforationInterval.splice(index, 1);
      }

      nameError(): string {
            if (this.form.get('name').hasError('required')) {
                  return 'Введите наименование заказчика';
            }
            return '';
      }

      binError(): string {
            if (this.form.get('bin').hasError('required')) {
                  return 'Заполните поле БИН';
            }
            return '';
      }

      contractNumberError(): string {
            if (this.form.get('contractNumber').hasError('required')) {
                  return 'Введите номер договора';
            }
            return '';
      }

      dateFinishError(): string {
            if (this.form.get('dateFinish').hasError('required')) {
                  return 'Выберите дату завершения';
            }
            return '';
      }

      plusPositionAfter(): object {
            const styles = {
                  'right.px': -30
            };
            return styles;
      }

      plusPositionBefore(): object {
            let styles = {};
            if (this.tabs.length > 3) {
                  styles = {
                        'right.px': -30
                  };
            } else {
                  styles = {
                        'left.px': 270 * this.tabs.length
                  };
            }
            return styles;
      }
}
