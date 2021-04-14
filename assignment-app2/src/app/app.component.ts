import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
  islogged = false;
  searchval = "";
  username =""
  constructor(@Inject(DOCUMENT) private _document: Document, private authService: AuthService, private router: Router, private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    console.log(this.authService.currentUserValue + " APPP CON");
    const iduser = localStorage.getItem('currentUser');
    this.username = localStorage.getItem('username').replace(/['"]+/g, '');

    console.log(this.username);
    const idToken = localStorage.getItem('currentToken');
    if (this.authService.currentUserValue) {
      // logged in so return true
      this.islogged = true;
    }
  }
  onSubmitsearch() {
    console.log(this.searchval + " searchval ");
    //this.router.navigate(["/search?search="+this.searchval]);
    this.router.navigate(['/search'], { queryParams: { search: this.searchval } });

  }
  /* login() {
     if (this.authService.loggedIn) {
       this.authService.logOut();
       this.router.navigate(["/home"]);
     } else {
       this.authService.logIn("admin", "toto");
     }
   }*/
  /* peuplerbase() {
     //this.assignmentsService.peuplerBD();
     this.assignmentsService.peuplerBDavecForkJoin()
       .subscribe(() => {
         console.log("la bd a été peuplée");
         this.router.navigate(["/home"], { replaceUrl: true });
       })
   }*/
  logout() {
    this.islogged = false;
    this.authService.logOut();
  }
}
