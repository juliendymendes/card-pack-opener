import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { switchMap } from 'rxjs';
import { ICard } from '../shared/types/Booster';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
	selector: 'booster-cards',
	standalone: true,
	imports: [NgFor, LoadingComponent, NgIf],
	templateUrl: './booster-cards.component.html',
})
export class BoosterCardsComponent {
	cards: ICard[] = [];
	filteredCards: ICard[] = [];
  loadingBooster = true
  count = 0
  setCode = ""
	apiService = inject(ApiService);
	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => (this.setCode = params['code']));
    this.loadBooster()
	}
  loadBooster() {
    this.apiService.getBooster(this.setCode)
      .subscribe(response => {
        this.cards = this.cards.concat(response.cards);
        this.filterCreatureCards();
      });
  }

  filterCreatureCards() {
    this.filteredCards = this.filteredCards.concat(this.cards.filter(card => {
      if(card.types.includes('Creature')){
        if(this.count < 30){
          this.count++
          return true
        }
      }
      return false
    }))
    if (this.count < 30) {
      this.loadBooster();
    }
    if(this.count === 30){
      this.loadingBooster = false
    }
  }
}
