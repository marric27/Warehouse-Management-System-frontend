import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Page } from '../../common/page.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/v1/sales-order';

  constructor(private http: HttpClient) {}

  createOrder(order: Order, customerId: number) {
    return this.http.post<Order>(`${this.baseUrl}/create-order/${customerId}`, order);
  }

  getOrders() {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  getOrdersPaged(page: number, size: number) {
    return this.http.get<Page<Order>>(`${this.baseUrl}/orders-paged`, {
      params: {
        page,
        size,
      },
    });
  }

  getOrderById(id: number) {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
