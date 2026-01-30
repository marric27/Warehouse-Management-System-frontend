import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../product/product.model';
import { ProductService } from '../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../common/category.enum';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  productForm!: FormGroup;
  product: Product = {} as Product;
  isEdit = false;
  categories = Object.values(Category);

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl(this.product?.name || '', Validators.required),
      category: new FormControl(this.product?.category || '', Validators.required),
    });
    const code = this.route.snapshot.paramMap.get('code');

    if (code) {
      this.isEdit = true;
      this.service.getProductByCode(code).subscribe((p) => {
        this.product = p;
        this.productForm.patchValue({
          name: p.name,
          category: p.category,
        });
      });
    }
  }

  save() {
    const request$ = this.isEdit
      ? this.service.updateProduct(this.product.id, this.productForm.value)
      : this.service.createProduct(this.productForm.value);

    request$.subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
