import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { switchMap } from 'rxjs';
import { ICard } from '../shared/types/Booster';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { NgOptimizedImage } from '@angular/common'
@Component({
  selector: 'booster-cards',
	standalone: true,
	imports: [NgFor, LoadingComponent, NgIf, RouterLink, NgOptimizedImage],
	templateUrl: './booster-cards.component.html',
})
export class BoosterCardsComponent {
  images = [
    {colorIdentity: "U", imageUrl: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/9/9f/U.svg"},
    {colorIdentity: "B", imageUrl: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/2/2f/B.svg"},
    {colorIdentity: "R", imageUrl: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/87/R.svg"},
    {colorIdentity: "G", iamgeUrl: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/88/G.svg"}
  ]
  cards: ICard[] = [];
	filteredCards: ICard[] = [];
  loadingBooster = false
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

  getColorIdentityImage(color: string){
    return this.images.find((value) => value.colorIdentity === color)?.imageUrl
  }
}
