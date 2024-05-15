import { Component, Input } from '@angular/core';
import { ISet } from '../../../shared/types/Set';
import { RouterLink } from '@angular/router';
import { DatePipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-search-result-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './search-result-card.component.html',
})
export class SearchResultCardComponent {
  @Input() set: ISet = {
    code: '',
    name: '',
    block: '',
    releaseDate: ''
  }
}
