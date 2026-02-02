import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PutawayService } from '../services/putaway.service';
import { SlotService } from '../../warehouse/services/slot.service';
import { StockUnit } from '../../goodsin/models/stockunit.model';
import { Slot } from '../../warehouse/models/slot.model';
import { StockUnitService } from '../../goodsin/services/stockunit-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-putaway-form',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './putaway-form.html',
  styleUrl: './putaway-form.css',
})
export class PutawayForm {
  putawayForm!: FormGroup;
  stockUnits: StockUnit[] = [];
  slots: Slot[] = [];

  constructor(
    private putawayService: PutawayService,
    private snackBar: MatSnackBar,
    private stockUnitService: StockUnitService,
    private slotService: SlotService  ) {}

  ngOnInit() {
    this.stockUnitService.getAllStockunits().subscribe((stockUnits) => {
      this.stockUnits = stockUnits.filter((su) => !su.slotId); // prendo su non ancora allocati
    });
    this.slotService.getAllSlots().subscribe((slots) => {
      this.slots = slots;
    });
    this.putawayForm = new FormGroup({
      stockUnit: new FormControl(''),
      slot: new FormControl(''),
    });
  }

  save() {
    this.putawayService
      .allocateStockUnit(this.putawayForm.value.stockUnit.code, this.putawayForm.value.slot.code)
      .subscribe({
        next: () => {
          this.stockUnits = this.stockUnits.filter(su => su.id !== this.putawayForm.value.stockUnit.id);
          this.snackBar.open('Putaway avvenuta con successo', 'OK', { duration: 3000 });
          this.putawayForm.reset();
        },
        error: (err) => console.error(err),
      });
  }
}
