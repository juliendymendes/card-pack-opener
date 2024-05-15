import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ISet } from '../shared/types/Set';
import { RouterLink } from '@angular/router';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchResultCardComponent } from './components/search-result-card/search-result-card.component';


@Component({
	selector: 'search-sets',
	standalone: true,
	imports: [FiltersComponent, SearchResultCardComponent, NgFor,NgIf, RouterLink, DatePipe],
	templateUrl: './search-sets.component.html',
})
export class SearchSetsComponent {
	sets: ISet[] = [];
}
