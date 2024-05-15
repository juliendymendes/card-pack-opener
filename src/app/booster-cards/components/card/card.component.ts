import { Component, Input } from '@angular/core';
import { ICard } from '../../../shared/types/Booster';
import { NgOptimizedImage, NgClass, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgOptimizedImage, NgClass, NgIf, NgFor],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() card: ICard = {
    name: '',
    manaCost: '',
    colorIdentity: [],
    text: '',
    imageUrl: '',
    types: []
  }
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

  getColorIdentityImage(color: string) {
		return this.images.find((value) => value.colorIdentity === color)?.imageUrl;
	}
}
