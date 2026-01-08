import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../common/page.model';
import { Slot } from '../slot-list/slot.model';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
    private baseUrl = 'http://localhost:8080/api/v1/slots';
    constructor(private http: HttpClient) {}
    
    getSlots(page: number, size: number): Observable<Page<Slot>> {
        return this.http.get<Page<Slot>>(this.baseUrl, {
            params: {
                page,
                size,
            },
        });
    }
    getAllSlots(): Observable<Slot[]> {
        return this.http.get<Slot[]>(`${this.baseUrl}/all`);
    }
    getSlotById(id: number): Observable<Slot> {
        return this.http.get<Slot>(`${this.baseUrl}/${id}`);
    }
    createSlot(slot: Slot): Observable<Slot> {
        return this.http.post<Slot>(this.baseUrl, slot);
    }
    updateSlot(id: number | undefined, slot: Slot): Observable<Slot> {
        return this.http.put<Slot>(`${this.baseUrl}/${id}`, slot);
    }
    deleteSlot(id: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}