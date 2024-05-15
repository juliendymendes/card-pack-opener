import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgIf, NgFor, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AlertService } from '../../../shared/services/alert.service';
import { ApiService } from '../../../shared/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import handleError from '../../../shared/functions/handleError';
@Component({
	selector: 'app-filters',
	standalone: true,
	imports: [FormsModule, NgIf, NgFor, DatePipe, RouterLink, NgClass],
	templateUrl: './filters.component.html',
})
export class FiltersComponent {
	name = '';
	block = '';
	blocks = ['Amonkhet', 'Ixalan', 'Zendikar', 'Ravnica', 'Onslaught'];
	@Output() searchResults = new EventEmitter();
	private alertService = inject(AlertService);
	private apiService = inject(ApiService);

	search() {
		if (this.block === '') {
			this.alertService.showAlert('Selecione um bloco', 'warn');
			return;
		}

		if (this.block != '') {
			this.apiService.getSets(this.name, this.block).subscribe({
				next: (sets) => {
					this.searchResults.emit(sets.sets);
				},
				error: (error: HttpErrorResponse) => {
					handleError(error, this.alertService);
				},
			});
		}
	}

}
