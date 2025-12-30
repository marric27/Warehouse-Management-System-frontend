import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Page } from '../../common/page.model';
import { Product } from './product.model';


@Component({
  selector: 'app-product',
  imports: [AsyncPipe, MatPaginatorModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductListComponent implements OnInit {
  products$?: Observable<Page<Product>>;

  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(private service: ProductService, private router: Router) {}

  loadProducts() {
    this.products$ = this.service.getProducts(this.pageIndex, this.pageSize);
  }

  ngOnInit() {
    this.loadProducts();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  goToProductDetail(id: number) {
    this.router.navigate(['/products', id]);
  }

  goToNewProduct() {
    this.router.navigate(['/products/new']);
  }
}
