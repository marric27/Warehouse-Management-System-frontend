import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';
import { Page } from './page.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient) {}

  getPaged(page: number, size: number) {
    return this.http.get<Page<Customer>>(this.baseUrl, {
      params: {
        page,
        size,
      },
    });
  }

  createCustomer(customer: Customer) {
    return this.http.post<Customer>(this.baseUrl, customer);
  }
  updateCustomer(id: number | undefined, customer: Customer) {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, customer);
  }
  getCustomer(id: number) {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }
  deleteCustomer(id: number | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
