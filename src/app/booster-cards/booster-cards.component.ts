import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { ICard } from '../shared/types/Booster';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../shared/services/alert.service';
import { CardComponent } from './components/card/card.component';
import handleError from '../shared/functions/handleError';
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
        handleError(error, this.alertService)
        this.loadingBooster = false
      },
		});
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
