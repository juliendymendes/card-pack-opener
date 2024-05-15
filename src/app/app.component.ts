import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/services/api.service';
import { ISet } from './shared/types/Set';
import { AlertComponent } from './shared/components/alert/alert.component';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, AlertComponent],
	templateUrl: './app.component.html',
})
export class AppComponent {

}
