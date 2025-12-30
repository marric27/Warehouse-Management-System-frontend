import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Page } from '../../common/page.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SlotService } from '../services/slot.service';
import { Slot } from './slot.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slot-list',
  imports: [AsyncPipe, MatPaginatorModule],
  templateUrl: './slot-list.html',
  styleUrl: './slot-list.css',
})
export class SlotList implements OnInit {
  slots$?: Observable<Page<Slot>>;

  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(private service: SlotService, private router: Router) {}

  ngOnInit(): void {
    this.slots$ = this.service.getSlots(this.pageIndex, this.pageSize);
  }

  loadSlots() {
    this.slots$ = this.service.getSlots(this.pageIndex, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadSlots();
  }

  goToSlotDetail(id: number) {
    this.router.navigate(['/slots', id]);
  }

  goToNewSlot() {
    this.router.navigate(['/slots/new']);
  }
}
