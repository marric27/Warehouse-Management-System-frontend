import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Page } from '../../common/page.model';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-list',
  imports: [MatPaginatorModule, AsyncPipe],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  orders$?: Observable<Page<Order>>;

  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(private service: OrderService, private router: Router) {}

  loadOrders() {
    this.orders$ = this.service.getOrdersPaged(this.pageIndex, this.pageSize);
  }

  ngOnInit() {
    this.loadOrders();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }

  goToOrderDetail(id: number) {
    this.router.navigate(['/orders', id]);
  }

  newOrder() {
    this.router.navigate(['/orders/new']);
  }
}
