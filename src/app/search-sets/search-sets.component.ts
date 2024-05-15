import { NgIf, NgFor, DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISet } from '../shared/types/Set';
import { ApiService } from '../shared/services/api.service';
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
