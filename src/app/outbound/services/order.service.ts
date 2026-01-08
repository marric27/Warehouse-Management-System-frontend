import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

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

}
