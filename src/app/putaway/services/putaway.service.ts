import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PutawayService {
  private baseUrl = 'http://localhost:8080/api/v1/putaway';

  constructor(private http: HttpClient) {}

  allocateStockUnit(stockUnitId: string, slotId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${stockUnitId}/assignToSlot/${slotId}`, null);
  }
}
