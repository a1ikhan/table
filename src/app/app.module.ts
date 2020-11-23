import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MaterialModule} from './material/material.module';

import {AppComponent} from './app.component';
import {TableComponent} from './components/table/table.component';
import {AddTableComponent} from './components/add-table/add-table.component';

import {DatePipe} from './pipes/date.pipe';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@NgModule({
      declarations: [
            AppComponent,
            TableComponent,
            AddTableComponent,
            DatePipe
      ],
      imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            MaterialModule
      ],
      providers: [{provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}],
      bootstrap: [AppComponent]
})
export class AppModule {
}
