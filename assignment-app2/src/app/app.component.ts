import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion d\'assignments';

  constructor(private authService: AuthService, private router: Router, private assignmentsService: AssignmentsService) { }

  login() {
    if (this.authService.loggedIn) {
      this.authService.logOut();
      this.router.navigate(["/home"]);
    } else {
      this.authService.logIn("admin", "toto");
    }
  }
  peuplerbase() {
    //this.assignmentsService.peuplerBD(); 
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("la bd a été peuplée");
        this.router.navigate(["/home"],{replaceUrl:true});
      })
  }
}
