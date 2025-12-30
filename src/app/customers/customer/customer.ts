import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { Router } from '@angular/router';

import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Page } from '../../common/page.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [MatPaginatorModule, AsyncPipe],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class CustomerListComponent implements OnInit {
  customers$!: Observable<Page<Customer>>;

  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(private customerService: CustomerService, private router: Router) {}

  loadCustomers() {
    this.customers$ = this.customerService.getPaged(this.pageIndex, this.pageSize);
  }

  ngOnInit() {
    this.loadCustomers();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCustomers();
  }

  goToCustomerDetail(id: number) {
    this.router.navigate(['/customers', id]);
  }

  goToNewCustomer() {
    this.router.navigate(['/customers/new']);
  }
}
