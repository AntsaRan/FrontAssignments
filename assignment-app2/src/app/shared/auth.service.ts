import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  uri = "http://localhost:8010/api/auth/";
  //user: User;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logIn(username: string, passowrd: string) {
    let user = new User();
    user.username = username;
    user.password = passowrd;
    return this.http.post<any>(this.uri + "login", user)
      .pipe(
        map(user => {
          if (user) {
            console.log(user.token + "user token");
            this.setSession(user);
            return user;
          }
        }),
        catchError(this.handleError<any>('### catchError: login'))
      );
  }

  private setSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user.id));
    localStorage.setItem('username', user.username);
    localStorage.setItem('currentToken', user.token);
    localStorage.setItem('isadmin', user.isadmin);
    this.currentUserSubject.next(user);
  }
  private handleError<T>(operation: any, result?: T) {
    console.log("HANDLE ERROR");
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué' + error.message);
      return of(result as T);
    }
  }
  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    localStorage.removeItem('isadmin');
    this.currentUserSubject.next(null);
    console.log(this.currentUserSubject.value + " CUREERZER ZERZEAR");
    this.router.navigate(['/login']);
  }

  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }

}
