import { Component } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { PicklistService } from '../../services/picklist.service';

@Component({
  selector: 'app-picklist-form',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './picklist-form.html',
  styleUrl: './picklist-form.css',
})
export class PicklistForm {
  picklistForm!: FormGroup;
  orders: Order[] = [];

  constructor(private orderService: OrderService, private picklistService: PicklistService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {this.orders = orders.filter(o => o.state==="OPEN")});
    this.picklistForm = new FormGroup({
      orders: new FormControl('', Validators.required),
    });
  }

  submit() {
    this.picklistService.createPicklists(this.picklistForm.value.orders).subscribe({
      next: (picklists) => {
        console.log('Picklists create:', picklists);
      },
      error: (err) => console.error('Errore nella creazione:', err),
    });
  }
}
