import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product/product.model';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product$?: Observable<Product>;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    this.loadProduct(code!);
  }

  loadProduct(code: string) {
    this.product$ = this.service.getProductByCode(code);
  }

  edit(id: number) {
    this.router.navigate(['/products', id, 'edit']);
  }

  delete(id: number) {
    if (confirm('Vuoi eliminare questo prodotto?')) {
      this.service.deleteProduct(id).subscribe(() => this.router.navigate(['/products']));
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
