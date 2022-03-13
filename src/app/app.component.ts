import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  //show or hide side menu
  displayMenu = true;

  toogleMenu() {
    this.displayMenu = !this.displayMenu;
  }
}
