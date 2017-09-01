import { Injectable } from '@angular/core';
import { Expense } from './expense';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExpenseService {
    private expensesUrl = '/api/expenses';

    constructor (private http: Http) {}

    // get("/api/expenses")
    getExpenses(): Promise<void | Expense[]> {
      return this.http.get(this.expensesUrl)
                 .toPromise()
                 .then(response => response.json() as Expense[])
                 .catch(this.handleError);
    }

    // post("/api/expenses")
    createExpense(newExpense: Expense): Promise<void | Expense> {
      return this.http.post(this.expensesUrl, newExpense)
                 .toPromise()
                 .then(response => response.json() as Expense)
                 .catch(this.handleError);
    }

    // get("/api/expense/:id") endpoint not used by Angular app

    // delete("/api/expense/:id")
    deleteExpense(delExpenseId: String): Promise<void | String> {
      return this.http.delete(this.expensesUrl + '/' + delExpenseId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/epenses/:id")
    updateExpense(putExpense: Expense): Promise<void | Expense> {
      var putUrl = this.expensesUrl + '/' + putExpense._id;
      return this.http.put(putUrl, putExpense)
                 .toPromise()
                 .then(response => response.json() as Expense)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
