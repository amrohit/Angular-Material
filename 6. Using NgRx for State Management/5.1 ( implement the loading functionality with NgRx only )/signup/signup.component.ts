import { Subscription, Observable } from "rxjs";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store, select } from "@ngrx/store";

import { UIService } from "src/app/shared/ui.service";
import * as fromRoot from "../../app.reducer";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
