import { Component, Input } from '@angular/core';
import { ISet } from '../../../shared/types/Set';
import { RouterLink } from '@angular/router';
import { DatePipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-sets-search-results',
  standalone: true,
  imports: [RouterLink, DatePipe, NgIf, NgFor],
  templateUrl: './sets-search-results.component.html',
})
export class SetsSearchResultsComponent {
  @Input() sets: ISet[] = []
}
