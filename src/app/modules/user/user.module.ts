import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [UserListComponent, UserCardComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [
    UserListComponent,
    UserCardComponent
  ]
})
export class UserModule {}
