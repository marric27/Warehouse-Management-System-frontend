import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picklist } from '../../outbound/models/picklist.model';
import { ConfirmRequest } from '../models/confirmRequest.model';

@Injectable({
  providedIn: 'root',
})
export class PickingService {
  private baseUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) {}

  getPicklists() {
    return this.http.get<Picklist[]>(`${this.baseUrl}/picklists/release`);
  }

  nextItem(body: { pickListIds: number[] }) {
    return this.http.post(`${this.baseUrl}/picking/next-item`, body);
  }
  
  confirmPicking(request: ConfirmRequest) {
    return this.http.post(`${this.baseUrl}/picking/confirm`, request);
  }
}
