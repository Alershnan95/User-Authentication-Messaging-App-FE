import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthFormRoutingModule } from './auth-form-routing.module';

import { AuthFormComponent } from './Components/auth-form/auth-form.component';
import { IndexComponent } from './Pages/index/index.component';

import {MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AuthFormComponent, IndexComponent],
  imports: [
    CommonModule,
    AuthFormRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AuthFormModule { }
