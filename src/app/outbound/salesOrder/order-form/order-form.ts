import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-order-form',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm {
  orderForm!: FormGroup;
  customerId!: number;

  constructor(private orderService: OrderService, private fb: FormBuilder) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      customerId: new FormControl(1, Validators.required),
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
    this.orderService.createOrder(this.orderForm.value, this.orderForm.value.customerId).subscribe({
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
