import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grn } from '../models/grn.model';
import { GrnItemService } from '../services/grn.item.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../products/product/product.model';
import { ProductService } from '../../products/services/product.service';

@Component({
  selector: 'app-item-form',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
})
export class ItemForm {
  itemForm!: FormGroup;
  item: any = {};
  grn: Grn = {} as Grn;
  isEdit = false;
  grnCode!: string;
  products: Product[] = [];

  constructor(
    private service: GrnItemService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
        this.products = products;
    });
    this.itemForm = new FormGroup({
      name: new FormControl(this.item?.name || ''),
      productCode: new FormControl(this.item?.productCode || ''),
      expectedQty: new FormControl(this.item?.expectedQty || 0),
      receivedQty: new FormControl(this.item?.receivedQty || 0),
      compliantQty: new FormControl(this.item?.compliantQty || 0),
      notCompliantQty: new FormControl(this.item?.notCompliantQty || 0),
    });
    this.grnCode = this.route.snapshot.paramMap.get('grnCode')!;
  }

  save() {
    const request$ = this.service.createItem(this.grnCode, this.itemForm.value);
    request$.subscribe(() => {
      this.router.navigate(['/grns', this.grnCode]);
    });
  }
}
