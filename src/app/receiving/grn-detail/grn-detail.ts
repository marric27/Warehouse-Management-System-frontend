import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Grn } from '../grn-list/grn.model';
import { GrnService } from '../services/grn.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grn-detail',
  imports: [CommonModule],
  templateUrl: './grn-detail.html',
  styleUrl: './grn-detail.css',
})
export class GrnDetail implements OnInit {
  grn$?: Observable<Grn>;

  constructor(private route: ActivatedRoute, private router: Router, private service: GrnService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGrn(id);
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

}
