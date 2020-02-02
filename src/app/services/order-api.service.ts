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

  buildQueryParameterString(filter: string, orderBy: string, startAt: number, limit: number) {
    const parameters: string[] = [];
    if (filter) {
      parameters.push('$q=' + filter);
    }
    if (orderBy) {
      parameters.push('$orderBy=' + orderBy);
    }
    if (startAt) {
      parameters.push('$startAt=' + startAt);
    }
    if (limit) {
      parameters.push('$limit=' + limit);
    }
    if (parameters.length) {
      return '?' + parameters.join('&');
    } else {
      return '';
    }
  }

  getMainOrders(filter: string, orderBy: string, startAt: number, limit: number) {
    const url = this.apiUrlMainOrders + this.buildQueryParameterString(filter, orderBy, startAt, limit);
    return this.http.get<Order[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getImportableOrders(filter: string, orderBy: string, startAt: number, limit: number) {
    const url = this.apiUrlImportableOrders + this.buildQueryParameterString(filter, orderBy, startAt, limit);
    return this.http.get<Order[]>(url)
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
