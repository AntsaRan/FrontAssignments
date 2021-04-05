import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  admin = false;
  constructor() { }

  logIn(login, passowrd) {
    //typiquement, acceptera en paramètres un login et un passowrd
    //vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    //sinon positionner à false
    if (login === "admin")
      this.admin = true;

    this.loggedIn = true;

  }

  logOut() { 
    this.loggedIn = false;
  }
  
//isAdmin.then(admin=> {console.log("admin:" + admin );})
  isAdmin() {
    return new Promise((resolve,reject)=>{
      resolve(this.admin);
    });
  }

}
