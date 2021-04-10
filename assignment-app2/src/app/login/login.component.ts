import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = null;
  user: User;
  error = "";
  constructor(private authservice: AuthService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    if (!this.username || !this.password)
      return;

    this.authservice.logIn(this.username, this.password)
      .pipe(first())
      .subscribe(m => {
        if (!m) 
        {
          this.error=" Username or password error";
        }
        this.router.navigate(["/home"],{replaceUrl:true});
      });
  }
}