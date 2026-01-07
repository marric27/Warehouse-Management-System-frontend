import { Component } from '@angular/core';
import { Grn } from '../models/grn.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrnService } from '../services/grn.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-grn-form',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './grn-form.html',
  styleUrl: './grn-form.css',
})
export class GrnForm {
  grnForm!: FormGroup;
  grn: Grn = {} as Grn;
  isEdit = false;

  constructor(private service: GrnService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.grnForm = new FormGroup({
      receivingDate: new FormControl(this.grn?.receivingDate || Date.now()),
      supplier: new FormControl(this.grn?.supplier || ''),
    });
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.service.getGrnById(+id).subscribe((g) => {
        this.grn = g;
        this.grnForm.patchValue({
          receivingDate: g.receivingDate,
          supplier: g.supplier,
        });
      });
    }
  }

  save() {
    const request$ = this.isEdit
      ? this.service.updateGrn(this.grn.id, this.grnForm.value)
      : this.service.createGrn(this.grnForm.value);

    request$.subscribe(() => {
      this.router.navigate(['/grns']);
    });
  }
}
