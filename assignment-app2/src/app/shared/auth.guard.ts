import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

    /*return this.authService.isAdmin()
      .then(admin => {
        if (admin) {
          console.log("autorisé");
          return true;
          
        } else {
          console.log("non autorisé");
          this.router.navigate(["/home"]);
          return false;
        }

      })
  }*/
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    console.log("NOT LOGGED IN");
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;

  }
}
