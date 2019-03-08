import { AuthData } from "./aut-data.model";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor() {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }
  logout() {
    this.user = null; //set to undefined
    this.authChange.next(false);
  }

  getUser() {
    // return this.user; ref type
    return { ...this.user }; //better prac
  }

  isAuth() {
    return this.user !== null;
  }
}
