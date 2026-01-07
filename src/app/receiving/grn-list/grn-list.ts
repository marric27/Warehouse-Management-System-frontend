import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/page.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { GrnService } from '../services/grn.service';
import { Grn } from '../models/grn.model';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grn-list',
  imports: [AsyncPipe, MatPaginatorModule],
  templateUrl: './grn-list.html',
  styleUrl: './grn-list.css',
})
export class GrnList {
  grns$?: Observable<Page<Grn>>;
  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(private service: GrnService, private router: Router) {}

  ngOnInit(): void {
    this.loadGrns();
  }

  loadGrns() {
    this.grns$ = this.service.getGrnList(this.pageIndex, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadGrns();
  }

  goToGrnDetail(id: number) {
    this.router.navigate(['/grns', id]);
  }

  goToNewGrn() {
    this.router.navigate(['/grns/new']);
  }
}
