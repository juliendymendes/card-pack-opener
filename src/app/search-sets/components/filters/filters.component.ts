import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgIf, NgFor, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AlertService } from '../../../shared/services/alert.service';
import { ApiService } from '../../../shared/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
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
					this.handleError(error);
				},
			});
		}
	}

	handleError(error: HttpErrorResponse) {
		switch (error.status) {
			case 500:
				this.alertService.showAlert(
					'Houve um erro de conexão com o servidor. Recarregue a página e tente novamente.',
					'error',
				);
				break;
			case 400:
				this.alertService.showAlert(
					'Não foi possível recuperar os dados. Tente novamente mais tarde.',
					'error',
				);
				break;
			case 404:
				this.alertService.showAlert(
					'O recurso solicitado não foi encontrado.',
					'error',
				);
				break;
			default:
				this.alertService.showAlert(
					'Não foi possível recuperar os dados. Tente novamente mais tarde.',
					'error',
				);
		}
		return throwError(
			() =>
				new Error(
					'Não foi possível recuperar os dados. Tente novamente mais tarde.',
				),
		);
	}
}
