import { State } from "./../../app.reducer";
import { Store } from "@ngrx/store";
import { UIService } from "./../../shared/ui.service";
import { Subscription, Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";
import * as fromApp from "../../app.reducer";
import { map } from "rxjs/operators";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.store.subscribe(data => {
    //   console.log(data);
    // });
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl("", { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
  // ngOnDestroy(): void {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
