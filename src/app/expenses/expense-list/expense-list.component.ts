import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';

@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
  providers: [ExpenseService]
})

export class ExpenseListComponent implements OnInit {

  expenses: Expense[]
  selectedExpense: Expense

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService
    .getExpenses()
    .then((expenses: Expense[]) => {
      this.expenses = expenses;
    });
  }

  private getIndexOfExpense = (expenseId: String) => {
    return this.expenses.findIndex((expense) => {
      return expense._id === expenseId;
    });
  }

  selectExpense(expense: Expense) {
    this.selectedExpense = expense;
  }

  createNewExpense() {
    var expense: Expense = {
      date: new Date(),
      amount: 0
    };

    // By default, a newly-created expense will have the selected state.
    this.selectExpense(expense);
  }

  deleteExpense = (expenseId: String) => {
    var idx = this.getIndexOfExpense(expenseId);
    if (idx !== -1) {
      this.expenses.splice(idx, 1);
      this.selectExpense(null);
    }
    return this.expenses;
  }

  addExpense = (expense: Expense) => {
    this.expenses.push(expense);
    this.selectExpense(expense);
    return this.expenses;
  }

  updateExpense = (expense: Expense) => {
    var idx = this.getIndexOfExpense(expense._id);
    if (idx !== -1) {
      this.expenses[idx] = expense;
      this.selectExpense(expense);
    }
    return this.expenses;
  }
}
