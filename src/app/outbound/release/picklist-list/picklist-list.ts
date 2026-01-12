import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Page } from '../../../common/page.model';
import { Picklist } from '../../models/picklist.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PicklistService } from '../../services/picklist.service';

@Component({
  selector: 'app-picklist-list',
  imports: [MatPaginatorModule, AsyncPipe, RouterLink],
  templateUrl: './picklist-list.html',
  styleUrl: './picklist-list.css',
})
export class PicklistList {
  picklists$?: Observable<Page<Picklist>>;
  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(private service: PicklistService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
      this.picklists$ = this.service.getPicklists(this.pageIndex, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.picklists$ = this.service.getPicklists(this.pageIndex, this.pageSize);
  }

  newPicklist() {
    this.router.navigate(['/picklist/new']);
  }
}
