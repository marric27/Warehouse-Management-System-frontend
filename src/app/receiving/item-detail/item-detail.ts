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
  grnItemCode!: string;
  grnCode!: string;

  constructor(private route: ActivatedRoute, private router: Router, private service: GrnItemService) {}

  ngOnInit(): void {
    this.grnItemCode = this.route.snapshot.paramMap.get('itemCode')!;
    this.grnCode = this.route.snapshot.paramMap.get('grnCode')!;
    this.loadGrnItem(this.grnItemCode);
  }

  loadGrnItem(code: string): void {
    this.grnItem$ = this.service.getGrnItemByCode(code);
  }

  goBack(): void {
    this.router.navigate(['/grns/', this.grnCode]);
  }

  createStockUnit(grnItemCode: string): void {
    this.router.navigate(['/create-stock-unit/', this.grnCode, this.grnItemCode]);
  }

}
