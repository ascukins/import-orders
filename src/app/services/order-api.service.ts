import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/models';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  apiUrlMainOrders = 'api/mainOrders';
  apiUrlImportableOrders = 'api/importableOrders';

  constructor(private http: HttpClient) { }

  getMainOrders() {
    return this.http.get<Order[]>(this.apiUrlMainOrders)
      .pipe(
        catchError(this.handleError)
      );
  }

  getImportableOrders() {
    return this.http.get<Order[]>(this.apiUrlImportableOrders)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteImportableOrder(order: Order) {
    const url = `${this.apiUrlImportableOrders}/${order.id}`;
    return this.http.delete(url, cudOptions)
      .pipe(
        catchError(this.handleError),
      );
  }

  postToMainOrders(order: Order) {
    return this.http.post<Order>(this.apiUrlMainOrders, order, cudOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // In a real world app, we might send the error to remote logging infrastructure
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
