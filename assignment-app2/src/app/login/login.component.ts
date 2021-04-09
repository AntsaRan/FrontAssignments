import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private authservice : AuthService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    if (!this.username || !this.password)
      return;
      
      this.authservice.logIn(this.username,this.password)
        .subscribe(m => {
          console.log(m + " TOKEN");
          this.router.navigate(["/home"]);
        })
  }
}