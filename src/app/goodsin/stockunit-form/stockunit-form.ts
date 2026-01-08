import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlotCategory } from '../../common/slotCategory.enum';
import { StockUnitService } from '../services/stockunit-service';

@Component({
  selector: 'app-stockunit-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './stockunit-form.html',
  styleUrl: './stockunit-form.css',
})
export class StockunitForm {
  suForm!: FormGroup;
  categories = Object.values(SlotCategory);
  grnId!: number;
  itemId!: number;

  constructor(
    private stockUnitService: StockUnitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.suForm = new FormGroup({
      batchNumber: new FormControl(''),
      expirationDate: new FormControl(''),
      quantity: new FormControl(0),
    });
    this.grnId = Number(this.route.snapshot.paramMap.get('grnId'));
    this.itemId = Number(this.route.snapshot.paramMap.get('itemId'));
  }

  save() {
    const request$ = this.stockUnitService.createStockunit(this.itemId, this.suForm.value);
    request$.subscribe(() => {
      this.router.navigate([`/grns/${this.grnId}/items/${this.itemId}`]);
    });
  }
}
