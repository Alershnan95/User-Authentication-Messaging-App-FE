import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { LocalDateFormatPipe } from '../pipes/local-date-format.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    LocalDateFormatPipe
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    HeaderComponent,
    LocalDateFormatPipe
  ]
})
export class SharedModule { }
