import { Component, Input } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})

export class ExpenseDetailsComponent {
  @Input()
  expense: Expense;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private expenseService: ExpenseService) { }

  createExpense(expense: Expense) {
    this.expenseService.createExpense(expense).then((newExpense: Expense) => {
      this.createHandler(newExpense);
    });
  }

  updateExpense(expense: Expense): void {
    this.expenseService.updateExpense(expense).then((updatedExpense: Expense) => {
      this.updateHandler(updatedExpense);
    });
  }

  deleteExpense(contactId: String): void {
    this.expenseService.deleteExpense(contactId).then((deletedExpenseId: String) => {
      this.deleteHandler(deletedExpenseId);
    });
  }

}
