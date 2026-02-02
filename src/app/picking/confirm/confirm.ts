import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { PickingService } from '../service/picking.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmRequest } from '../models/confirmRequest.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Picklist } from '../../outbound/models/picklist.model';
import { PickListItem } from '../../outbound/models/pickListItem.model';
import { StockUnitService } from '../../goodsin/services/stockunit-service';
import { StockUnit } from '../../goodsin/models/stockunit.model';

@Component({
  selector: 'app-confirm',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css',
})
export class Confirm {
  form!: FormGroup;
  request: ConfirmRequest = {} as ConfirmRequest;
  picklists: Picklist[] = [];
  picklistItems: PickListItem[] = [];
  stockUnits: StockUnit[] = [];

  constructor(
    private service: PickingService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private stockUnitService: StockUnitService
  ) {}

  ngOnInit() {
    this.service.getPicklists().subscribe((picklists) => {
      this.picklists = picklists;
    });
    this.stockUnitService.getAllStockunits().subscribe((stockUnits) => {
      this.stockUnits = stockUnits;
    });
    this.form = this.fb.group({
      pickListCode: new FormControl(this.request.pickListCode),
      pickListItemCode: new FormControl(this.request.pickListItemCode),
      stockUnitQuantities: this.fb.array([]),
      errorReason: new FormControl(this.request.errorReason),
      user: new FormControl(this.request.user),
    });
    this.addLine();

    this.form.get('pickListCode')!.valueChanges.subscribe((code) => {
      this.onPickListSelected(code);
    });
  }

  get stockUnitQuantities(): FormArray {
    return this.form.get('stockUnitQuantities') as FormArray;
  }

  onPickListSelected(code: string) {
    const selectedPickList = this.picklists.find((p) => p.code === code);

    this.picklistItems = (selectedPickList?.pickListItemList ?? []).filter(
      (item) => item.state === 'OPEN'
    );

    const itemControl = this.form.get('pickListItemCode');

    if (this.picklistItems.length > 0) {
      itemControl?.enable();
      itemControl?.reset();
    } else {
      itemControl?.disable();
    }
  }

  addLine() {
    this.stockUnitQuantities.push(
      this.fb.group({
        suId: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeLine(i: number) {
    this.stockUnitQuantities.removeAt(i);
  }

  submit() {
    const request: ConfirmRequest = this.form.value;

    this.service.confirmPicking(request).subscribe({
      next: () => {
        this.snackBar.open('Picking confermata con successo', 'OK', { duration: 3000 });
        this.form.reset();
      },
      error: (err) => console.error(err),
    });
  }
}
