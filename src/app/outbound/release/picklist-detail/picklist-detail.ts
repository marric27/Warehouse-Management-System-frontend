import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PicklistService } from '../../services/picklist.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-picklist-detail',
  imports: [AsyncPipe],
  templateUrl: './picklist-detail.html',
  styleUrl: './picklist-detail.css',
})
export class PicklistDetail {
  private route = inject(ActivatedRoute);
  private service = inject(PicklistService);

  picklist$ = this.route.paramMap.pipe(
    switchMap(params =>
      this.service.getPicklistById(+params.get('id')!)
    )
  );
}
