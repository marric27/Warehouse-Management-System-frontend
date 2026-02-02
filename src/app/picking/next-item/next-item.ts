import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { PickingService } from '../service/picking.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Picklist } from '../../outbound/models/picklist.model';
import { MatOption } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-next-item',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatOption, MatSelectModule],
  templateUrl: './next-item.html',
  styleUrl: './next-item.css',
})
export class NextItem {
  nextForm!: FormGroup;
  picklists: Picklist[] = [];
  receivedItem: any = null;

  constructor(private service: PickingService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.service.getPicklists().subscribe((picklists) => {
      this.picklists = picklists;
    });
    this.nextForm = new FormGroup({
      pickListIds: new FormControl<number[]>([], Validators.required),
    });
  }

  submit() {
    this.service.nextItem(this.nextForm.value).subscribe({
      next: (res) => {
        this.receivedItem = res;
        console.log(this.receivedItem);
        this.cd.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }
}
