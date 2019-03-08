import { AuthData } from "./aut-data.model";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }
  logout() {
    this.user = null; //set to undefined
    this.authChange.next(false);
    this.router.navigate(["/login"]);
  }

  getUser() {
    // return this.user; ref type
    return { ...this.user }; //better prac
  }

  isAuth() {
    return this.user !== null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
}