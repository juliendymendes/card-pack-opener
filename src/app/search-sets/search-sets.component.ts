import { NgIf, NgFor, DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ISet } from '../shared/types/Set';
import { ApiService } from '../shared/services/api.service';
import { RouterLink } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'search-sets',
	standalone: true,
	imports: [FormsModule, NgIf, NgFor, DatePipe, RouterLink, NgClass],
	templateUrl: './search-sets.component.html',
})
export class SearchSetsComponent {
	name = '';
	block = '';
	blocks = ['Amonkhet', 'Ixalan', 'Zendikar', 'Ravnica', 'Onslaught'];
	sets: ISet[] = [];
	alertService = inject(AlertService);
  blockError = false
	private apiService = inject(ApiService);

	search() {
    if(this.block === ''){
      this.alertService.showAlert("Selecione um bloco", 'warn')
      return
    }

		if (this.block != '') {
			this.apiService.getSets(this.name, this.block).subscribe({
				next: (sets) => {
					this.sets = sets.sets;
				},
				error: (error: HttpErrorResponse) => {
					switch (error.status) {
						case 500:
							this.alertService.showAlert(
								'Houve um erro de conexão com o servidor. Por favor, tente novamente.',
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
				},
			});
		}
	}
	openBooster(setCode: string) {
		this.apiService.getBooster(setCode).subscribe((cards) => {
			console.log(cards);
		});
	}
}
