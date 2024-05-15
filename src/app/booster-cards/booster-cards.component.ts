import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { throwError } from 'rxjs';
import { ICard } from '../shared/types/Booster';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../shared/services/alert.service';
import { CardComponent } from './components/card/card.component';
@Component({
	selector: 'booster-cards',
	standalone: true,
	imports: [NgFor, LoadingComponent, NgIf, RouterLink, CardComponent],
	templateUrl: './booster-cards.component.html',
})
export class BoosterCardsComponent {
	cards: ICard[] = [];
	filteredCards: ICard[] = [];
	loadingBooster = true;
	private count = 0;
	setCode = '';
	private apiService = inject(ApiService);
  alertService = inject(AlertService)

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => (this.setCode = params['code']));
		this.loadBooster();
	}
	loadBooster() {
    this.loadingBooster = true
		this.apiService.getBooster(this.setCode).subscribe({
			next: (response) => {
        console.log(response);

				this.cards = this.cards.concat(response.cards);
				this.filterCreatureCards();
        this.loadingBooster = false
			},
			error: (error: HttpErrorResponse) => {
        this.handleError(error)
        this.loadingBooster = false
      },
		});
	}

  handleError(error: HttpErrorResponse){
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
    return throwError(() => new Error('Não foi possível recuperar os dados. Tente novamente mais tarde.'));
  }
	filterCreatureCards() {
		this.filteredCards = this.filteredCards.concat(
			this.cards.filter((card) => {
				if (card.types.includes('Creature')) {
					if (this.count < 30) {
						this.count++;
						return true;
					}
				}
				return false;
			}),
		);
		if (this.count < 30) {
			this.loadBooster();
		}
		if (this.count === 30) {
			this.loadingBooster = false;
		}
	}

}
