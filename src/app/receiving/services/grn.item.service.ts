import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GrnItemService {
  private baseUrl = 'http://localhost:8080/api/v1/receiving/grns';
  constructor(private http: HttpClient) {}

  createItem(grnId: number, itemData: any) {
    return this.http.post(`${this.baseUrl}/${grnId}/items`, itemData);
  }


}
