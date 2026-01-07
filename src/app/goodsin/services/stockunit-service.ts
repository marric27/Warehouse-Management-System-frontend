import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockUnit } from '../models/stockunit.model';

@Injectable({
  providedIn: 'root',
})
export class StockunitService {
  private baseUrl = 'http://localhost:8080/api/v1/check-goods-in';

  constructor(private http: HttpClient) { }

  createStockunit(itemId: number, data: StockUnit): Observable<StockUnit> {
    return this.http.post<StockUnit>(`${this.baseUrl}/${itemId}/checking-info`, data);
  }





}
