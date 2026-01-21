import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../common/category.enum';
import { StockUnitService } from '../services/stockunit-service';
import { DateUtils } from '../../common/date.util';

@Component({
  selector: 'app-stockunit-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './stockunit-form.html',
  styleUrl: './stockunit-form.css',
})
export class StockunitForm {
  suForm!: FormGroup;
  categories = Object.values(Category);
  grnCode!: string;
  itemCode!: string;

  constructor(
    private stockUnitService: StockUnitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.suForm = new FormGroup({
      batchNumber: new FormControl(''),
      expirationDate: new FormControl(DateUtils.today()),
      quantity: new FormControl()
    });
    this.grnCode = this.route.snapshot.paramMap.get('grnCode')!;
    this.itemCode = this.route.snapshot.paramMap.get('itemCode')!;
  }

  save() {
    const request$ = this.stockUnitService.createStockunit(this.itemCode, this.suForm.value);
    request$.subscribe(() => {
      this.router.navigate([`/grns/${this.grnCode}/items/${this.itemCode}`]);
    });
  }
}
