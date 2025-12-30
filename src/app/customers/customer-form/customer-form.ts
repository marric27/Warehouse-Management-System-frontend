import { Component } from '@angular/core';
import { Customer } from '../customer/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  customer: Customer = {} as Customer;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private service: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.service.getCustomer(+id).subscribe(c => this.customer = c);
    }
  }

  save() {
    const request$ = this.isEdit
      ? this.service.updateCustomer(this.customer.id, this.customer)
      : this.service.createCustomer(this.customer);

    request$.subscribe(() => {
      this.router.navigate(['/customers']);
    });
  }
}