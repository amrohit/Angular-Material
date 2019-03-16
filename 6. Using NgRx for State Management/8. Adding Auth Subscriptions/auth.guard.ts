import { Store, select } from "@ngrx/store";
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
import * as fromRoot from "../app.reducer";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}
  //before lazy loading implemented
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(select(fromRoot.getIsAuth));
  }

  //canLoad (implemented for lazy loading) to check before loading the module

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(fromRoot.getIsAuth),
      take(1)
    );
  }
}
