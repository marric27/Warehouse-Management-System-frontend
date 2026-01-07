import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-customer-detail',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './customer-detail.html',
  styleUrls: ['./customer-detail.css'],
})
export class CustomerDetail {
  customer$?: Observable<Customer>;

  constructor(
    private route: ActivatedRoute,
    private service: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCustomer(id);
  }

  loadCustomer(id: number) {
    this.customer$ = this.service.getCustomer(id);
  }

  edit(id: number) {
    this.router.navigate(['/customers', id, 'edit']);
  }

  delete(id: number) {
    if (confirm('Vuoi eliminare questo cliente?')) {
      this.service.deleteCustomer(id).subscribe(() => this.router.navigate(['/customers']));
    }
  }

  goBack() {
    this.router.navigate(['/customers']);
  }
}
