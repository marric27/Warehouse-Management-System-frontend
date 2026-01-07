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
  grnId!: number;

  constructor(private route: ActivatedRoute, private router: Router, private service: GrnService) {}

  ngOnInit(): void {
    this.grnId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGrn(this.grnId);
  }

  loadGrn(id: number): void {
    this.grn$ = this.service.getGrnById(id);
  }

  edit(id: number): void {
    this.router.navigate(['/grns', id, 'edit']);
  }

  delete(id: number): void {
    if (confirm('Vuoi eliminare questo GRN?')) {
      this.service.deleteGrn(id).subscribe(() => this.router.navigate(['/grns']));
    }
  }

  goBack(): void {
    this.router.navigate(['/grns']);
  }

  addItem(): void {
    this.router.navigate(['/add-grn-item', this.grnId]);
  }

  viewItemDetail(itemId: number) {
    this.router.navigate(['/grns', this.grnId, 'items', itemId]);
  }
}
