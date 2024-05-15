import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { switchMap } from 'rxjs';
import { ICard } from '../shared/types/Booster';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { AlertService } from '../shared/services/alert.service';
@Component({
	selector: 'booster-cards',
	standalone: true,
	imports: [NgFor, LoadingComponent, NgIf, RouterLink, NgOptimizedImage,NgClass, AlertComponent],
	templateUrl: './booster-cards.component.html',
})
export class BoosterCardsComponent {
	images = [
		{
			colorIdentity: 'U',
			imageUrl:
				'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/9/9f/U.svg',
		},
		{
			colorIdentity: 'B',
			imageUrl:
				'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/2/2f/B.svg',
		},
		{
			colorIdentity: 'R',
			imageUrl:
				'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/87/R.svg',
		},
		{
			colorIdentity: 'G',
			iamgeUrl:
				'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/88/G.svg',
		},
	];
	cards: ICard[] = [];
	filteredCards: ICard[] = [];
	loadingBooster = false;
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
		this.apiService.getBooster(this.setCode).subscribe({
			next: (response) => {
				this.cards = this.cards.concat(response.cards);
				this.filterCreatureCards();
			},
			error: (error: HttpErrorResponse) => {
        if(error.status === 500){
          this.alertService.showAlert("Houve um erro de conexão com o servidor. Por favor, tente novamente.", "error")
        }
        if(error.status === 400){
          this.alertService.showAlert("Não foi possível recuperar os cards. Tente novamente mais tarde.", "error")
        }

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

	getColorIdentityImage(color: string) {
		return this.images.find((value) => value.colorIdentity === color)?.imageUrl;
	}
}
