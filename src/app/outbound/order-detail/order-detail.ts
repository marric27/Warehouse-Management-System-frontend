import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {
  order$?: Observable<Order>;
  orderId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLine(this.orderId);
  }

  loadLine(id: number): void {
    this.order$ = this.service.getOrderById(id);
  }

  viewLineDetail(id: number) {
    this.router.navigate(['/orders', this.orderId]);
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }

    delete(id: number): void {
    if (confirm('Vuoi eliminare questo ordine?')) {
      this.service.deleteOrder(id).subscribe(() => this.router.navigate(['/orders']));
    }
  }
}
