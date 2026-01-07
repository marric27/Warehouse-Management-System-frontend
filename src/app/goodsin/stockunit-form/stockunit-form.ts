import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stockunit-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './stockunit-form.html',
  styleUrl: './stockunit-form.css',
})
export class StockunitForm {
  suForm!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.suForm = new FormGroup({
      batchNumber: new FormControl(''),
      expirationDate: new FormControl(''),
      productCode: new FormControl(''),
      quantity: new FormControl(0),
      category: new FormControl(''),
    });
  }

  save() {
    this.router.navigate(['/stockunits']);
  }

}
