import { Component } from '@angular/core';
import { Slot } from '../slot-list/slot.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SlotService } from '../services/slot.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SlotCategory } from '../../common/slotCategory.enum';

@Component({
  selector: 'app-slot-form',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './slot-form.html',
  styleUrl: './slot-form.css',
})
export class SlotForm {
  slotForm!: FormGroup;
  slot: Slot = {} as Slot;
  isEdit = false;
  categories = Object.values(SlotCategory);

  constructor(
    private route: ActivatedRoute,
    private service: SlotService,
    private router: Router
  ) {}

  ngOnInit() {
    this.slotForm = new FormGroup({
      pickingSequence: new FormControl(this.slot?.pickingSequence || '', [Validators.required, Validators.min(1)]),
      allowedCategory: new FormControl<SlotCategory | null>(null, Validators.required),
      capacity: new FormControl(this.slot?.capacity || '', [Validators.required, Validators.min(1)]),
    });
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.service.getSlotById(+id).subscribe((s) => {
        this.slot = s;
        this.slotForm.patchValue({
          pickingSequence: s.pickingSequence,
          allowedCategory: s.allowedCategory,
          capacity: s.capacity
        });
      });
    }
  }

  save() {
    const request$ = this.isEdit
      ? this.service.updateSlot(this.slot.id, this.slotForm.value)
      : this.service.createSlot(this.slotForm.value);

    request$.subscribe(() => {
      this.router.navigate(['/slots']);
    });
  }
}
