import { Component } from '@angular/core';
import { StudentService } from './shared/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StudentService]
})
export class AppComponent {
  title = 'frontend';

  //show or hide side menu
  displayMenu = true;

  constructor(private studentService: StudentService, private router: Router) { }

  toogleMenu() {
    this.displayMenu = !this.displayMenu;
  }

  onLogout() {
    this.studentService.deleteToken();
    this.router.navigate(['/login']);
  }
}
