import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../login/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  admin = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  uri = "http://localhost:8010/api/auth/";
  //user: User;
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
  logIn(username: string, passowrd: string) {
    //typiquement, acceptera en paramètres un login et un passowrd
    //vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    //sinon positionner à false

    /*if (login === "admin")
      this.admin = true;

    this.loggedIn = true;
*/
    let user = new User();
    user.username = username;
    user.password = passowrd;
    return this.http.post<any>(this.uri + "login", user)
      .pipe(
        map(user => {
        console.log(user + "user ");                  // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(this.handleError<any>('### catchError: login'))
      );
  }
  private handleError<T>(operation: any, result?: T){
  
    return (error:any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué' + error.message);
      return of(result as T); 
    }
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loggedIn = false;
  }

  //isAdmin.then(admin=> {console.log("admin:" + admin );})
  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }

}
