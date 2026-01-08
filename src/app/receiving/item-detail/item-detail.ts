import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GrnItem } from '../models/item.model';
import { GrnItemService } from '../services/grn.item.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-detail',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css',
})
export class ItemDetail {
  grnItem$?: Observable<GrnItem>;
  grnItemId!: number;
  grnId!: number;

  constructor(private route: ActivatedRoute, private router: Router, private service: GrnItemService) {}

  ngOnInit(): void {
    this.grnItemId = Number(this.route.snapshot.paramMap.get('itemId'));
    this.grnId = Number(this.route.snapshot.paramMap.get('grnId'));
    this.loadGrnItem(this.grnItemId);
  }

  loadGrnItem(id: number): void {
    this.grnItem$ = this.service.getGrnItemById(id);
  }

  goBack(): void {
    this.router.navigate(['/grns/', this.grnId]);
  }

  createStockUnit(id: number): void {
    this.router.navigate(['/create-stock-unit/', this.grnId, this.grnItemId]);
  }

}
