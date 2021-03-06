import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CurrencyMaskModule } from "ng2-currency-mask";

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
    BrowserModule,
    FormsModule,
    HttpModule,
    CurrencyMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
