import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PicklistList } from '../picklist-list/picklist-list';

@Component({
  selector: 'app-picklist-page',
  standalone: true,
  imports: [RouterOutlet, PicklistList],
  templateUrl: './picklistpage.html',
})
export class PicklistPage {}
