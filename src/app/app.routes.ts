import { Routes } from '@angular/router';
import { BoosterCardsComponent } from './booster-cards/booster-cards.component';
import { SearchSetsComponent } from './search-sets/search-sets.component';

export const routes: Routes = [
  {path: "cards/:code", component: BoosterCardsComponent},
  {path: "", component: SearchSetsComponent}
];
