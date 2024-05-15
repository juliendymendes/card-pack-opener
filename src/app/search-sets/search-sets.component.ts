import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISet } from '../shared/types/Set';
import { ApiService } from '../shared/services/api.service';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'search-sets',
	standalone: true,
	imports: [FormsModule, NgIf, NgFor, DatePipe, RouterLink],
	templateUrl: './search-sets.component.html',
})
export class SearchSetsComponent {
	name = '';
	block = '';
	blocks = ['Amonkhet', 'Ixalan', 'Zendikar', 'Ravnica', 'Onslaught'];
	sets: ISet[] = [];

	private apiService = inject(ApiService);

	search() {
		if (this.block != '') {
			this.apiService.getSets(this.name, this.block).subscribe((sets) => {
				this.sets = sets.sets;
			});
		}
	}
	openBooster(setCode: string) {
		this.apiService.getBooster(setCode).subscribe((cards) => {
			console.log(cards);
		});
	}
}
