import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrnItem } from '../models/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrnItemService {
  private baseUrl = 'http://localhost:8080/api/v1/receiving';
  constructor(private http: HttpClient) {}

  createItem(grnCode: string, itemData: any) {
    return this.http.post(`${this.baseUrl}/grns/${grnCode}/items`, itemData);
  }

  getGrnItemById(id: number): Observable<GrnItem> {
    return this.http.get<GrnItem>(`${this.baseUrl}/items/${id}`);
  }

  getGrnItemByCode(code: string): Observable<GrnItem> {
    return this.http.get<GrnItem>(`${this.baseUrl}/items/code/${code}`);
  }
}
