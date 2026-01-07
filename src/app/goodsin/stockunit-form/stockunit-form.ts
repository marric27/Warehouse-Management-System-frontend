import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlotCategory } from '../../common/slotCategory.enum';
import { StockunitService } from '../services/stockunit-service';

@Component({
  selector: 'app-stockunit-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './stockunit-form.html',
  styleUrl: './stockunit-form.css',
})
export class StockunitForm {
  suForm!: FormGroup;
  categories = Object.values(SlotCategory);
  //itemId!: number;

  constructor(
    private service: StockunitService,
    private router: Router
  ) {}

  ngOnInit() {
    this.suForm = new FormGroup({
      itemId: new FormControl(0),
      batchNumber: new FormControl(''),
      expirationDate: new FormControl(''),
      productCode: new FormControl(''),
      quantity: new FormControl(0),
      category: new FormControl(''),
    });
    //this.itemId = Number(this.route.snapshot.paramMap.get('itemId'));

  }

  save() {
    const request$ = this.service.createStockunit(this.suForm.value.itemId, this.suForm.value);
    request$.subscribe(() => {
      this.router.navigate(['/stockunit']);
    });
  }
}
