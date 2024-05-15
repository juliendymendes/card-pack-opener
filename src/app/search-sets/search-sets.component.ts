import { NgIf, NgFor, DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISet } from '../shared/types/Set';
import { ApiService } from '../shared/services/api.service';
import { RouterLink } from '@angular/router';
import { FiltersComponent } from './components/filters/filters.component';
import { SetsSearchResultsComponent } from './components/sets-search-results/sets-search-results.component';

@Component({
	selector: 'search-sets',
	standalone: true,
	imports: [FiltersComponent, SetsSearchResultsComponent],
	templateUrl: './search-sets.component.html',
})
export class SearchSetsComponent {
	sets: ISet[] = [];
}
