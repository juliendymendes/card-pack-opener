import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/services/api.service';
import { ISet } from './shared/types/Set';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, FormsModule, NgIf, NgFor, DatePipe],
	templateUrl: './app.component.html',
})
export class AppComponent {
	name = '';
	block = '';
	blocks = ['Amonkhet', 'Ixalan', 'Zendikar', 'Ravnica', 'Onslaught'];
	sets: ISet[] = [];
	constructor(private apiService: ApiService) {}
	search() {
    if(this.block != ''){
      this.apiService.getSets(this.name, this.block).subscribe((sets) => {
        this.sets = sets.sets;
      });
    }
	}
}
