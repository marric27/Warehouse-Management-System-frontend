import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../common/page.model';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number, size: number) {
    return this.http.get<Page<Product>>(this.baseUrl, {
      params: {
        page,
        size,
      },
    });
  }

  getProductByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/code/${code}`);
  }
  createProduct(product: Product) {
    return this.http.post<Product>(this.baseUrl, product);
  }
  updateProduct(id: number | undefined, product: Product) {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }
  deleteProduct(id: number | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
