import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/page.model';
import { Picklist } from '../models/picklist.model';

@Injectable({
  providedIn: 'root',
})
export class PicklistService {
  private baseUrl = 'http://localhost:8080/api/v1/picklists';

  constructor(private http: HttpClient) {}

  getPicklists(page: number, size: number): Observable<Page<Picklist>> {
    return this.http.get<Page<Picklist>>(`${this.baseUrl}/release-paged`, {
      params: {
        page,
        size,
      },
    });
  }

  getPicklistById(id: number): Observable<Picklist> {
    return this.http.get<Picklist>(`${this.baseUrl}/${id}`);
  }

  getPicklistByCode(code: string): Observable<Picklist> {
    return this.http.get<Picklist>(`${this.baseUrl}/code/${code}`);
  }

  createPicklists(ids: number[]): Observable<Picklist[]> {
    return this.http.post<Picklist[]>(`${this.baseUrl}/release`, ids);

  }
  
}
