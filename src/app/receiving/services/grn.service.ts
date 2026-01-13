import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../common/page.model';
import { Grn } from '../models/grn.model';

@Injectable({
    providedIn: 'root'
})
export class GrnService {
    private baseUrl = 'http://localhost:8080/api/v1/receiving/grns';

    constructor(private http: HttpClient) { }

    getGrnList(page: number, size: number): Observable<Page<Grn>> {
        return this.http.get<Page<Grn>>(this.baseUrl, {
            params: {
                page,
                size,
            },
        });
    }

    getGrnById(id: number): Observable<Grn> {
        return this.http.get<Grn>(`${this.baseUrl}/${id}`);
    }
    
    getGrnByCode(code: string): Observable<Grn> {
      return this.http.get<Grn>(`${this.baseUrl}/code/${code}`);
    }

    createGrn(data: Grn): Observable<Grn> {
        return this.http.post<Grn>(this.baseUrl, data);
    }

    updateGrn(id: number, data: Grn): Observable<Grn> {
        return this.http.put<Grn>(`${this.baseUrl}/${id}`, data);
    }

}