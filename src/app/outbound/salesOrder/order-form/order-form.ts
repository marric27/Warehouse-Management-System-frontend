import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { Product } from '../../../products/product/product.model';
import { ProductService } from '../../../products/services/product.service';
import { MatSelectModule } from '@angular/material/select';
import { CustomerService } from '../../../customers/customer/customer.service';
import { Customer } from '../../../customers/customer/customer.model';

@Component({
  selector: 'app-order-form',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOption],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm {
  orderForm!: FormGroup;
  customerId!: number;
  products: Product[] = [];
  customers: Customer[] = [];

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private productService: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
        this.products = products;
    });
    this.customerService.getAll().subscribe((customers) => {
        this.customers = customers;
    })
    this.orderForm = this.fb.group({
      customerCode: new FormControl(null, Validators.required),
      salesOrderLineList: this.fb.array([]),
    });
    this.addLine();
  }

  get salesOrderLineList(): FormArray {
    return this.orderForm.get('salesOrderLineList') as FormArray;
  }

  addLine() {
    this.salesOrderLineList.push(
      this.fb.group({
        productCode: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeLine(index: number) {
    this.salesOrderLineList.removeAt(index);
  }

  submit() {
    this.orderService.createOrder(this.orderForm.value).subscribe({
      next: (response) => {
        console.log('Order created successfully:', response);
        this.orderForm.reset();
        this.salesOrderLineList.clear();
        this.addLine();
      },
      error: (error) => {
        console.error('Error creating order:', error);
      },
    });
  }
}
