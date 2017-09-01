import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseDetailsComponent,
    ExpenseListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
