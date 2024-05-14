import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, NgFor],
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = '';
  block = "";
  list = [1,2,3,4,5,6,7,8,9,10]
  buscar(){
    console.log(this.name);
    console.log(this.block);

  }
}
