import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Slot } from '../slot-list/slot.model';
import { SlotService } from '../services/slot.service';

@Component({
  selector: 'app-slot-detail',
  imports: [CommonModule],
  templateUrl: './slot-detail.html',
  styleUrl: './slot-detail.css',
})
export class SlotDetail implements OnInit {
slot$?: Observable<Slot>;

  constructor(private route: ActivatedRoute, private router: Router, private service: SlotService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSlot(id);
  }

  loadSlot(id: number): void {
    this.slot$ = this.service.getSlotById(id);
  }

  edit(id: number): void {
    this.router.navigate(['/slots', id, 'edit']);
  }

  delete(id: number): void {
    if (confirm('Vuoi eliminare questo slot?')) {
      this.service.deleteSlot(id).subscribe(() => this.router.navigate(['/slots']));
    }
  }

  goBack(): void {
    this.router.navigate(['/slots']);
  }
}
