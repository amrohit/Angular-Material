import { AuthService } from "./auth.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  //before lazy loading implemented
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuth()) {
      console.log("This is AuthGuard");
      return this.authService.isAuth();
    } else {
      this.router.navigate(["/login"]);
    }
  }

  //canLoad (implemented for lazy loading) to check before loading the module

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuth()) {
      console.log("This is AuthGuard");
      return this.authService.isAuth();
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
