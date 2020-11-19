import {Pipe, PipeTransform} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@Pipe({
      name: 'date'
})
export class DatePipe implements PipeTransform {
      transform(value: any): any {
            return new Intl.DateTimeFormat('ru', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
            }).format(value).replace(/[а-я]+\./, mo => mo.slice(0, -1).toUpperCase());
      }
}
