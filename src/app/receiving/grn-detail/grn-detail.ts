import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Grn } from '../models/grn.model';
import { GrnService } from '../services/grn.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-grn-detail',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './grn-detail.html',
  styleUrl: './grn-detail.css',
})
export class GrnDetail implements OnInit {
  grn$?: Observable<Grn>;
  grnCode!: string;

  constructor(private route: ActivatedRoute, private router: Router, private service: GrnService) {}

  ngOnInit(): void {
    this.grnCode = this.route.snapshot.paramMap.get('code')!;
    this.loadGrn(this.grnCode);
  }

  loadGrn(code: string): void {
    this.grn$ = this.service.getGrnByCode(code);
  }

  edit(id: number): void {
    this.router.navigate(['/grns', id, 'edit']);
  }

  goBack(): void {
    this.router.navigate(['/grns']);
  }

  addItem(): void {
    this.router.navigate(['/add-grn-item', this.grnCode]);
  }

  viewItemDetail(itemCode: string) {
    this.router.navigate(['/grns', this.grnCode, 'items', itemCode]);
  }
}
